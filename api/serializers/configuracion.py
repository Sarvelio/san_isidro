# rest framework
from rest_framework import serializers

# models
from api.models import Configuracion



class ConfiguracionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion
        fields = ('id', 'cuota_agua')


class ConfiguracionSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuracion
        fields = ('id', 'cuota_agua', 'createdBy', 'updatedBy')
