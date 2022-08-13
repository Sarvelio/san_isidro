# rest framework
from rest_framework import serializers

# models
from api.models import Pago


class PagoBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = "__all__"


class PagoReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"


class PagoSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = "__all__"
