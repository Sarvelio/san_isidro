# rest framework
from rest_framework import serializers

# models
from api.models import Department


class DepartmentBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = ('id', 'name')