# rest framework
from rest_framework import serializers

# models
from api.models import Sector


class SectorBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sector
        fields = ('id', 'nombre')


class SectorReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ('id', 'nombre')


class SectorSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ('id', 'nombre', 'createdBy', 'updatedBy')
