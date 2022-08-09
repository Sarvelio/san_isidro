from django.db import models
from api.models import BaseModel


class Configuracion(BaseModel):
    cuota_agua = models.FloatField(default=0)