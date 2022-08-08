# rest framework
from rest_framework import serializers

# models
from api.models import User

# serializers
from api.serializers.rol import RolReadSerializer

class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'read_only': True}}


class UserReadSerializer(serializers.ModelSerializer):

    rol = serializers.SerializerMethodField()
   
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'birthday',
            'gender',
            'status',
            'email',
            'telephone',
            'has_temp_pwd',
            'rol'
        )

    def get_rol(self, obj):
        if obj.rol is not None:
            return RolReadSerializer(obj.rol, fields=('id', 'name')).data
        return None