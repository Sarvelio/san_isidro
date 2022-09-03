# rest framework
from rest_framework import serializers

# models
from api.models import User

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
    rol_text = serializers.CharField(source='get_rol_display')
    status_text = serializers.CharField(source='get_status_display')

   
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
            'status_text',
            'email',
            'telephone',
            'rol',
            'rol_text'
        )
