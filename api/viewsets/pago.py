# django
from tokenize import Number
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from api import serializers

# Models
from api.models import Detalle, Servicio, Configuracion

# Serializer
from api.serializers import DetalleBaseSerializer, DetalleReadSerializer, DetalleSaveSerializer

from api.permissions.user import UserCajeroAdminPermissions
from rest_framework.permissions import IsAuthenticated

class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = DetalleReadSerializer
    queryset = Detalle.objects.filter(active=True, tipo_detalle=Detalle.PAGO).order_by('-created')
    permission_classes = [IsAuthenticated, UserCajeroAdminPermissions]
    
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ('servicio',)
    search_fields = ("descripcion","anio","mes")
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
        data['tipo_detalle'] = Detalle.PAGO # default value
        data['tipo_movimiento'] = Detalle.INGRESO # default value

        with transaction.atomic():
            instancia_servicio = Servicio.objects.get(id=data['servicio'])
            pago_anio = instancia_servicio.anio
            pago_mes = instancia_servicio.mes
            mesesPagar = int( data.get('meses_a_pagar', 0) )
            pago_anio_actual = pago_anio
            pago_mes_actual = pago_mes

            if (pago_mes + mesesPagar) > 12:
                pago_anio += 1
                pago_mes = (pago_mes + mesesPagar) - 12
            else:
                pago_mes += mesesPagar

            instancia_servicio.anio = pago_anio
            instancia_servicio.mes = pago_mes
            instancia_servicio.save()

            costo_mensual_agua = 0
            try:
                configuraciones = Configuracion.objects.all().last()
                costo_mensual_agua =  configuraciones.cuota_agua
            except Exception as e:
                return Response({"message": "No se pudo obtener la configuracion"}, status=status.HTTP_400_BAD_REQUEST)


            for i in range(mesesPagar):
                if pago_mes_actual >= 12:
                    pago_mes_actual += 1
                    pago_anio_actual += 1
                    pago_mes_actual = pago_mes_actual - 12
                else:
                    pago_mes_actual += 1

                instancia_pago = Detalle.objects.create(
                    servicio=instancia_servicio,
                    anio=pago_anio_actual,
                    mes=pago_mes_actual,
                    descripcion=data.get('descripcion', ''),
                    monto=costo_mensual_agua,
                    tipo_detalle=data['tipo_detalle'],
                    tipo_movimiento=data['tipo_movimiento']
                )

        serializer = self.get_serializer(instancia_pago)

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
 