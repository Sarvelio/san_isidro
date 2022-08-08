# rest framework
from rest_framework import serializers

# models
from api.models import Project

# dynamic
from .dynamic_fields_serializer import DFModelSerializer


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = "__all__"


class ProjectReadSerializer(DFModelSerializer):

    class Meta:
        model = Project
        fields = ('__all__')
