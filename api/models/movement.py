
# Django
from django.db import models

# Models
from api.models import BaseModel

class Movement(BaseModel):

  CASH_INPUT = 1
  CASH_OUTPUT = 2
  
  TYPES = (
    (CASH_INPUT, 'Entradas'),
    (CASH_OUTPUT, 'Salidas')
  )

  sponsor = models.ForeignKey('api.Sponsor', on_delete=models.CASCADE, related_name='movements')
  beneficiary = models.ForeignKey('api.Beneficiary', on_delete=models.CASCADE, related_name='movements', blank=True, null=True)
  project = models.ForeignKey('api.Project', on_delete=models.CASCADE, related_name='movements', blank=True, null=True)

  type = models.PositiveSmallIntegerField(choices=TYPES)
  amount_usd = models.FloatField(default=0)
  exchange_rate = models.FloatField(default=0)
  amount_gtq = models.FloatField(default=0)
  percent_fee = models.FloatField(default=0)
  amount_fee = models.FloatField(default=0)
  amount = models.FloatField(default=0)
  description = models.TextField(blank=True, null=True)

  # FLAG TO KNOW IF THE MOVEMENT WAS DELETED, EVERY DELETE HAS TO HAVE A REASON
  deleted = models.BooleanField(default=False)
  removal_reason = models.TextField(blank=True, null=True)
