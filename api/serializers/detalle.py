# rest framework
from rest_framework import serializers

# models
from api.models import Detalle


class DetalleBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle
        fields = "__all__"


class DetalleReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle
        fields = "__all__"



class DetalleSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle
        fields = "__all__"