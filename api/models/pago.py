from django.db import models

from api.models import BaseModel


class Pago(BaseModel):

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

    servicio = models.ForeignKey(
        'api.Servicio', on_delete=models.CASCADE, related_name='pagos')
    anio = models.PositiveSmallIntegerField()
    mes = models.PositiveSmallIntegerField(choices=MESES)
    descripcion = models.TextField(blank=True, null=True)
    pago = models.FloatField()


