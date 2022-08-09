# rest framework
from rest_framework import serializers

# models
from api.models import Usuario

from api.serializers.sector import SectorReadSerializer, SectorBaseSerializer


class UsuarioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'nombre')


class UsuarioReadSerializer(serializers.ModelSerializer):
    sector = serializers.SerializerMethodField()
    class Meta:
        model = Usuario
        fields =  '__all__'
        
    def get_sector(self, obj):
        if obj.sector is not None:
            return SectorBaseSerializer(obj.sector).data
        return None

class UsuarioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"