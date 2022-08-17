# rest framework
from rest_framework import serializers

# models
from api.models import Usuario
from api.models import Configuracion



class UsuarioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ('id', 'nombres', 'apellidos', 'dpi')


class UsuarioReadSerializer(serializers.ModelSerializer):
    costo_mensual = serializers.SerializerMethodField()
    class Meta:
        model = Usuario
        fields =  '__all__'

    def get_costo_mensual(self, obj):
        try:
            configuraciones = Configuracion.objects.all().last()
            return configuraciones.cuota_agua
        except Exception as e:
            return 0

class UsuarioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"