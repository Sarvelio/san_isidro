
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
from api.models import Project

# Serializer
from api.serializers import ProjectSerializer, ProjectReadSerializer

# Permissions
from api.permissions import ProjectPermissions

# copy
import copy


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name")
    search_fields = ("name",)
    ordering_fields = ("name")

    # permission_classes = [ProjectPermissions]

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)

        if async_options:
            return ProjectReadSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return ProjectReadSerializer
        else:
            return ProjectReadSerializer

    def create(self, request, *args, **kwargs):
        request.data['createdBy'] = request.user.id
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data['updatedBy'] = request.user.id
        return super().update(request, *args, **kwargs)
