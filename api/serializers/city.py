# rest framework
from rest_framework import serializers

# models
from api.models import City


class CityBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'name')