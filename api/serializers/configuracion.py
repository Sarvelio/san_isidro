# rest framework
from rest_framework import serializers

# models
from api.models import Configuracion


class ConfiguracionBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Configuracion
        fields = ('id', 'cuota_agua')


class ConfiguracionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion
        fields = ('id', 'cuota_agua')


class ConfiguracionSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion
        fields = ('id', 'cuota_agua', 'createdBy', 'updatedBy')
