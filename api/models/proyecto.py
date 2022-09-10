from django.db import models
from api.models import BaseModel


class Proyecto(BaseModel):

    AGUA = 10
    CEMENTERIO = 20
    OTROS = 30

    TIPOS_PROYECTO = ((AGUA, 'Proyecto de agua'),
                      (CEMENTERIO, 'Proyecto de cementerio'),
                      (OTROS, 'Otros proyectos'))

    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250, blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    tipo = models.IntegerField(choices=TIPOS_PROYECTO, default=AGUA)