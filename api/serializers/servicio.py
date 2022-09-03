# rest framework
from rest_framework import serializers

# models
from api.models import Servicio
from .usuario import UsuarioBaseSerializer
from .sector import SectorBaseSerializer
from django.utils import timezone
from api.models import Configuracion


class ServicioBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = "__all__"


class ServicioReadSerializer(serializers.ModelSerializer):
    sector = serializers.SerializerMethodField()
    usuario = serializers.SerializerMethodField()
    mes_text = serializers.CharField(source='get_mes_display')
    fecha_solvente = serializers.SerializerMethodField()
    moroso = serializers.SerializerMethodField()
    costo_mensual = serializers.SerializerMethodField()

    class Meta:
        model = Servicio
        fields = "__all__"

    def get_sector(self, obj):
        if obj.sector is not None:
            return SectorBaseSerializer(obj.sector).data
        return None
    def get_usuario(self, obj):
        if obj.usuario is not None:
            return UsuarioBaseSerializer(obj.usuario).data
        return None

    def get_fecha_solvente(self, obj):
        return obj.get_mes_display() + " de " + str(obj.anio)

    def get_moroso(self,obj):
        anio = timezone.now().year
        mes = timezone.now().month
        return obj.anio <=anio and obj.mes <= mes
        
    def get_costo_mensual(self, obj):
        try:
            configuraciones = Configuracion.objects.all().last()
            return configuraciones.cuota_agua
        except Exception as e:
            return 0

class ServicioSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = "__all__"