# rest framework
from rest_framework import serializers

# models
from api.models import Rol

#dynamic
from .dynamic_fields_serializer import DFModelSerializer


class RolSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rol
        fields = "__all__"
       

class RolReadSerializer(DFModelSerializer):

    permissions = serializers.SerializerMethodField()
   
    class Meta:
        model = Rol
        fields = ('__all__')

    def get_permissions(self, obj):
        permissions = obj.permissions.values('codename')
        permissions = [x['codename'] for x in permissions]
        return permissions
