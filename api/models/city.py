
# Django
from django.db import models

# Models
from api.models import BaseModel


class City(BaseModel):
  code = models.CharField(max_length=5)
  name = models.CharField(max_length=100)
  department = models.ForeignKey('api.Department', on_delete=models.CASCADE, related_name='cities')
  
  class Meta:
    indexes = [
      models.Index(fields=['code'],name='city_code_idx'),
    ]
