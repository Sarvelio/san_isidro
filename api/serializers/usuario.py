# rest framework
from rest_framework import serializers

# models
from api.models import Usuario



class UsuarioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'nombres', 'apellidos')


class UsuarioReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields =  '__all__'


class UsuarioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"