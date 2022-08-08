# Django
from django.db import models

# Models
from api.models import BaseModel

class File(BaseModel):

  DOCUMENT = 1
  PDF = 2
  IMAGE = 3
  FILE = 4
  
  TYPES = (
    (DOCUMENT, 'Documento'),
    (PDF, 'Pdf'),
    (IMAGE, 'Imagen'),
    (FILE, 'Archivo')
  )

  name = models.CharField(max_length=250)
  type = models.PositiveSmallIntegerField(choices=TYPES, default=FILE)
  src = models.FileField(upload_to="files/")
  beneficiary = models.ForeignKey('api.Beneficiary', on_delete=models.CASCADE, related_name='files', blank=True, null=True)
  movement = models.ForeignKey('api.Movement', on_delete=models.CASCADE, related_name='files', blank=True, null=True)

  