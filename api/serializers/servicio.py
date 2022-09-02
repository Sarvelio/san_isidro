# rest framework
from rest_framework import serializers

# models
from api.models import Servicio
from .usuario import UsuarioBaseSerializer
from .sector import SectorBaseSerializer


class ServicioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = "__all__"


class ServicioReadSerializer(serializers.ModelSerializer):
    sector = serializers.SerializerMethodField()
    usuario = serializers.SerializerMethodField()
    mes_text = serializers.CharField(source='get_mes_display')

    class Meta:
        model = Servicio
        fields = "__all__"

    def get_sector(self, obj):
        if obj.sector is not None:
            return SectorBaseSerializer(obj.sector).data
        return None
    def get_usuario(self, obj):
        if obj.usuario is not None:
            return UsuarioBaseSerializer(obj.usuario).data
        return None
class ServicioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = "__all__"