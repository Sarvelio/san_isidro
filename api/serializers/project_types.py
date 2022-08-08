# rest framework
from rest_framework import serializers

# models
from api.models import ProjectTypes


class ProjectTypesBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectTypes
        fields = ('id', 'name')


class ProjectTypesReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTypes
        fields = ('id', 'name', 'description')


class ProjectTypesSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTypes
        fields = ('id', 'name', 'description', 'createdBy', 'updatedBy')
