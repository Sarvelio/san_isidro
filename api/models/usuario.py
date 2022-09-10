# Django
from django.db import models

# Models
from api.models import BaseModel

class Usuario(BaseModel):

  HOMBRE = 1
  MUJER = 2
  OTRO = 3

  GENEROS = (
      (HOMBRE, 'Hombre'),
      (MUJER, 'Mujer'),
      (OTRO, 'Otro'),
  )

  genero = models.PositiveSmallIntegerField(choices=GENEROS, blank=True, null=True)
  nombres = models.CharField(max_length=250)
  apellidos = models.CharField(max_length=250)
  dpi = models.CharField(max_length=13, unique=True)
  telefono = models.CharField(max_length=8, blank=True, null=True)


