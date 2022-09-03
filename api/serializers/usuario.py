# rest framework
from rest_framework import serializers

# models
from api.models import Usuario
from api.models import Configuracion



class UsuarioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'nombres', 'apellidos', 'dpi')


class UsuarioReadSerializer(serializers.ModelSerializer):
    genero_text = serializers.CharField(source='get_genero_display')

    class Meta:
        model = Usuario
        fields =  '__all__'


class UsuarioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"