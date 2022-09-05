# rest framework
from rest_framework import serializers

# models
from api.models import Proyecto
from api.models.detalle import Detalle
from django.db.models import Sum

class ProyectoBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proyecto
        fields = ('id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'tipo')


class ProyectoReadSerializer(serializers.ModelSerializer):
    montos = serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = "__all__"

    def get_monto_ingreso(self, obj):
        monto_ingreso = obj.detalles.filter(active=True, tipo_movimiento=Detalle.INGRESO).aggregate(monto_ingreso=Sum('monto'))['monto_ingreso'] or 0
        return monto_ingreso

    def get_monto_egreso(self, obj):
        monto_egreso = obj.detalles.filter(active=True, tipo_movimiento=Detalle.EGRESO).aggregate(monto_egreso=Sum('monto'))['monto_egreso'] or 0
        return monto_egreso

    def get_monto_neutro(self, obj):
        monto_neutro = obj.detalles.filter(active=True, tipo_movimiento=Detalle.NEUTRO).aggregate(monto_neutro=Sum('monto'))['monto_neutro'] or 0
        return monto_neutro

    def get_montos(self, obj):
        monto_ingreso = self.get_monto_ingreso(obj)
        monto_egreso = self.get_monto_egreso(obj)
        monto_neutro = self.get_monto_neutro(obj)
        data = {
            'ingreso': monto_ingreso,
            'egreso': monto_egreso,
            'neutro': monto_neutro,
            'gasto': monto_neutro+monto_egreso,
        }
        return data

class ProyectoSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('id', 'nombre', 'createdBy', 'updatedBy', 'descripcion', 'fecha_inicio', 'fecha_fin', 'tipo')
