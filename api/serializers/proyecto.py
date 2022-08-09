# rest framework
from rest_framework import serializers

# models
from api.models import Proyecto


class ProyectoBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proyecto
        fields = ('id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'tipo')


class ProyectoReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'tipo')


class ProyectoSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('id', 'nombre', 'createdBy', 'updatedBy', 'descripcion', 'fecha_inicio', 'fecha_fin', 'tipo')
