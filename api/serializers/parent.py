# rest framework
from rest_framework import serializers

# models
from api.models import Parent


class ParentBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = ('id', 'name')


class ParentReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = "__all__"


class ParentSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = "__all__"
