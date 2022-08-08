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
  foto = models.ImageField(upload_to='usuario/foto/', null=True, blank=True)
  telefono = models.CharField(max_length=15, blank=True, null=True)
  sector = models.ForeignKey('api.Sector', on_delete=models.CASCADE, related_name='usuarios')



