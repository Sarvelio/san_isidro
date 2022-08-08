# rest framework
from rest_framework import serializers

# models
from api.models import Sponsor


class SponsorBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sponsor
        fields = ('id', 'name')


class SponsorReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = "__all__"


class SponsorSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = "__all__"
