
# Rest framework
from rest_framework import status, filters, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

# Django
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.contrib.auth.models import Permission

# Model
from api.models import Rol

# Serializer
from api.serializers import RolReadSerializer, RolSerializer

# Permissions
from api.permissions import RolPermissions

# copy
import copy


def rolExists(name, id=None):
    """verified if rol exists"""
    if name.isspace():
        raise ValidationError('El nombre del rol está en blanco')
    message = {'detail': 'El nombre del rol ya existe.'}
    if id is None and Rol.objects.filter(name=name.strip(), active=True).exists():
        raise ValidationError(message)
    if Rol.objects.filter(name=name.strip(), active=True).exclude(pk=id).exists():
        raise ValidationError(message)


class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name")
    search_fields = ("name", "group_ptr__name")
    ordering_fields = ("name")

    permission_classes = [RolPermissions]

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)

        if async_options:
            return RolSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return RolReadSerializer
        else:
            return RolSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        # Validate the rol name
        rolExists(data.get('name', ''))
        permissions = data.pop('permissions', [])
        permissions_list = Permission.objects.filter(codename__in=permissions)

        with transaction.atomic():
            data['createdBy'] = request.user.id
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            rol = serializer.save()
            if permissions_list.exists():
                rol.permissions.set(permissions_list)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        data = request.data
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Validate the rol name
        rolExists(data.get('name', ''), instance.id)
        permissions = data.pop('permissions', [])
        permissions_list = Permission.objects.filter(codename__in=permissions)

        with transaction.atomic():
            data['updatedBy'] = request.user.id
            serializer = self.get_serializer(
                instance, data=data, partial=partial)
            serializer.is_valid(raise_exception=True)
            rol = serializer.save()
            rol.permissions.clear()
            if permissions_list.exists():
                rol.permissions.set(permissions_list)
            return Response(serializer.data)
