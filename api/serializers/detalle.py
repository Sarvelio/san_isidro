# rest framework
from rest_framework import serializers

# models
from api.models import Detalle
from api.serializers.proyecto import ProyectoBaseSerializer
from .usuario import UsuarioBaseSerializer


class DetalleBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle
        fields = "__all__"


class DetalleReadSerializer(serializers.ModelSerializer):
    nombre = serializers.SerializerMethodField()
    tipo_detalle_text = serializers.CharField(source='get_tipo_detalle_display')
    tipo_movimiento_text = serializers.CharField(source='get_tipo_movimiento_display')


    class Meta:
        model = Detalle
        fields = "__all__"

    def get_nombre(self, obj):
        if obj.tipo_detalle is Detalle.PAGO:
            data = UsuarioBaseSerializer(obj.servicio.usuario).data
            return data.get('nombres','')+ " " + data.get('apellidos','')

        if obj.tipo_detalle is Detalle.PROYECTO:
            data = ProyectoBaseSerializer(obj.proyecto).data
            return data.get('nombre','')

        return ""


class DetalleSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle
        fields = "__all__"