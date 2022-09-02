# django
from ast import Delete
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action

# Models
from api.models import Detalle

# Serializer
from api.serializers import DetalleBaseSerializer, DetalleReadSerializer, DetalleSaveSerializer

from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Sum
from django.db.models.functions import Coalesce


class CajaViewSet(viewsets.ModelViewSet):
    serializer_class = DetalleReadSerializer
    queryset = Detalle.objects.filter(active=True).order_by('-created')

    permission_classes = [AllowAny]

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ('proyecto',)
    search_fields = ("descripcion",)
    ordering_fields = ('id','created')

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
        data['tipo_detalle'] = Detalle.CAJA # default value
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

    @action(methods=["get"], detail=False)
    def total_actual(self, request, *args, **kwargs):
        monto_ingresado = Detalle.objects.filter(active=True, tipo_movimiento=Detalle.INGRESO).aggregate(monto_ingresado=Coalesce(Sum('monto'),0.0))['monto_ingresado']
        monto_egresado = Detalle.objects.filter(active=True, tipo_movimiento=Detalle.EGRESO).aggregate(monto_egresado=Coalesce(Sum('monto'),0.0))['monto_egresado']
        monto_neutro = Detalle.objects.filter(active=True, tipo_movimiento=Detalle.NEUTRO).aggregate(monto_neutro=Coalesce(Sum('monto'),0.0))['monto_neutro']
        monto_disponible = monto_ingresado - monto_egresado

        return Response({'monto_ingresado': monto_ingresado,
        'monto_egresado': monto_egresado,
        'monto_neutro': monto_neutro,
        'monto_disponible':monto_disponible},status=status.HTTP_200_OK)