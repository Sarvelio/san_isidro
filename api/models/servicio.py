from api.models.usuario import Usuario
from django.db import models

from api.models import BaseModel


class Servicio(BaseModel):
    ENERO = 1
    FEBRERO = 2
    MARZO = 3
    ABRIL = 4
    MAYO = 5
    JUNIO = 6
    JULIO = 7
    AGOSTO = 8
    SEPTIEMBRE = 9
    OCTUBRE = 10
    NOVIEMBRE = 11
    DICIEMBRE = 12

    MESES=[
        (ENERO, 'Enero'),
        (FEBRERO, 'Febrero'),
        (MARZO, 'Marzo'),
        (ABRIL, 'Abril'),
        (MAYO, 'Mayo'),
        (JUNIO, 'Junio'),
        (JULIO, 'Julio'),
        (AGOSTO, 'Agosto'),
        (SEPTIEMBRE, 'Septiembre'),
        (OCTUBRE, 'Octubre'),
        (NOVIEMBRE, 'Noviembre'),
        (DICIEMBRE, 'Diciembre')
    ]

    AGUA = 10
    CEMENTERIO = 20

    TIPOS_SERVICIOS = (
        (AGUA, 'Servicio Agua'),
        (CEMENTERIO, 'Servicio Cementerio')
    )

    usuario = models.ForeignKey(
        'api.Usuario', on_delete=models.CASCADE, related_name='servicios')

    tipo = models.IntegerField(choices=TIPOS_SERVICIOS, default=AGUA)

    anio = models.SmallIntegerField()
    mes = models.PositiveSmallIntegerField(choices=MESES)
    descripcion = models.TextField(blank=True, null=True)
    sector = models.ForeignKey('api.Sector', on_delete=models.CASCADE, related_name='servicios')
