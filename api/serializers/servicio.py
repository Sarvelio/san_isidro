# rest framework
from rest_framework import serializers

# models
from api.models import Servicio


class ServicioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = "__all__"


class ServicioReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = "__all__"


class ServicioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = "__all__"