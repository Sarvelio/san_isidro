# django
from ast import Delete
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# Models
from api.models import Detalle

# Serializer
from api.serializers import DetalleBaseSerializer, DetalleReadSerializer, DetalleSaveSerializer


from api.permissions.user import UserCajeroAdminPermissions
from rest_framework.permissions import IsAuthenticated
class DetalleViewSet(viewsets.ModelViewSet):
    serializer_class = DetalleReadSerializer
    queryset = Detalle.objects.filter(active=True, tipo_detalle=Detalle.PROYECTO).order_by('-created')
    permission_classes = [IsAuthenticated, UserCajeroAdminPermissions]

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ('proyecto',)
    search_fields = ("descripcion","anio","mes","monto")
    ordering_fields = ("id", "descripcion")

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)
        if async_options:
            return DetalleBaseSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return DetalleReadSerializer
        else:
            return DetalleSaveSerializer

    def create(self, request, *args, **kwargs):
        user = request.user.id
        data = request.data
        data['createdBy'] = user # user who created the record 
        data['tipo_detalle'] = Detalle.PROYECTO # default value
        with transaction.atomic():
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        usuario = request.user.id
        data = request.data
        instance = self.get_object()
        data['updatedBy'] = usuario # user who updated the record

        with transaction.atomic():
            serializer = self.get_serializer(instance, data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
