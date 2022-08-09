# Django
from django.db import models

# Models
from api.models import BaseModel


class Sector(BaseModel):

    nombre = models.CharField(max_length=254, blank=True, null=True)
