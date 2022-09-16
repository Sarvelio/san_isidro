# django
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from django.utils import timezone

# Models
from api.models import Servicio, Detalle,Proyecto

# Serializer
from api.serializers import ServicioBaseSerializer, ServicioReadSerializer, ServicioSaveSerializer
from api.permissions.user import UserCajeroAdminPermissions
from rest_framework.permissions import IsAuthenticated

class ServicioViewSet(viewsets.ModelViewSet):
    serializer_class = ServicioReadSerializer
    queryset = Servicio.objects.filter(active=True).order_by('-created')
    permission_classes = [IsAuthenticated, UserCajeroAdminPermissions]

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("id", "nombre")

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)
        if async_options:
            return ServicioBaseSerializer
        if self.action == 'list' or self.action == 'retrieve' or self.action == 'morosos':
            return ServicioReadSerializer
        else:
            return ServicioSaveSerializer

    def create(self, request, *args, **kwargs):
        user = request.user.id
        data = request.data
        data['createdBy'] = user # user who created the record 

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
    def morosos(self, request, *args, **kwargs):
        anio = timezone.now().year
        mes = timezone.now().month

        queryset = self.filter_queryset(self.get_queryset().filter(anio__lte=anio, mes__lte=mes))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=["get"], detail=False)
    def infomacion(self, request, *args, **kwargs):
        anio = timezone.now().year
        mes = timezone.now().month

        servicios_insolventes = self.filter_queryset(self.get_queryset().filter(anio__lte=anio, mes__lte=mes)).count()
        servicios_totales = self.filter_queryset(self.get_queryset()).count()
        servicios_solventes = servicios_totales - servicios_insolventes

        instancias_proyectos = Proyecto.objects.filter(active=True)
        total_proyectos = instancias_proyectos.count()

        proyecto_monto_ingreso = instancias_proyectos.filter(detalles__active=True, detalles__tipo_movimiento=Detalle.INGRESO).aggregate(monto_ingreso=Sum('detalles__monto'))['monto_ingreso'] or 0
        proyecto_monto_egreso = instancias_proyectos.filter(detalles__active=True, detalles__tipo_movimiento=Detalle.EGRESO).aggregate(monto_egreso=Sum('detalles__monto'))['monto_egreso'] or 0
        proyecto_monto_neutro = instancias_proyectos.filter(detalles__active=True, detalles__tipo_movimiento=Detalle.NEUTRO).aggregate(monto_neutro=Sum('detalles__monto'))['monto_neutro'] or 0

        data={
            'servicios_insolventes': servicios_insolventes,
            'servicios_solventes': servicios_solventes,
            'servicios_totales': servicios_totales,

            'total_proyectos': total_proyectos,
            'proyecto_monto_ingreso': proyecto_monto_ingreso,
            'proyecto_monto_egreso': proyecto_monto_egreso,
            'proyecto_monto_neutro': proyecto_monto_neutro,
        }
        return Response(data, status=status.HTTP_200_OK)


