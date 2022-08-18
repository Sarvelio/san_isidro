from django.db import models

from api.models import BaseModel


class Detalle(BaseModel):
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

    INGRESO = 10
    EGRESO = 20
    NEUTRO = 30

    TIPOS_MOVIMIENTO = (
        (INGRESO, 'Ingreso'),
        (EGRESO, 'Egreso'),
        (NEUTRO, 'Neutro')
    )

    PROYECTO = 3
    PAGO = 6
    CAJA = 9
    TIPOS_DETALLE = (
        (PROYECTO, 'Proyecto'),
        (PAGO, 'Pago'),
        (CAJA, 'Caja')
    )

    tipo_detalle = models.IntegerField(choices=TIPOS_DETALLE)
    tipo_movimiento = models.IntegerField(choices=TIPOS_MOVIMIENTO)


    proyecto = models.ForeignKey(
        'api.Proyecto', on_delete=models.CASCADE, related_name='detalles', null=True, blank=True)


    servicio = models.ForeignKey(
    'api.Servicio', on_delete=models.CASCADE, related_name='pagos', null=True, blank=True)
    anio = models.PositiveSmallIntegerField(blank=True, null=True)
    mes = models.PositiveSmallIntegerField(choices=MESES, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    monto = models.FloatField()