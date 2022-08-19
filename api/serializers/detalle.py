# rest framework
from rest_framework import serializers

# models
from api.models import Detalle
from .usuario import UsuarioBaseSerializer


class DetalleBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle
        fields = "__all__"


class DetalleReadSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()

    class Meta:
        model = Detalle
        fields = "__all__"

    def get_usuario(self, obj):
        if obj.tipo_detalle is not Detalle.PAGO:
            return ""
        return UsuarioBaseSerializer(obj.servicio.usuario).data


class DetalleSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle
        fields = "__all__"