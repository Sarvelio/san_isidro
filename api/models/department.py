
# Django
from django.db import models

# Models
from api.models import BaseModel


class Department(BaseModel):
  code = models.CharField(max_length=5)
  name = models.CharField(max_length=100)

  class Meta:
    indexes = [
      models.Index(fields=['code'],name='department_code_idx'),
    ]