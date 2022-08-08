
# Django
from sre_constants import CATEGORY_UNI_NOT_SPACE
from django.db import models

# Models
from api.models import BaseModel

class ProjectBeneficiary(BaseModel):

  RECEIVED = 1
  REJECTED = 2
  ACCEPTED = 3

  STATES = (
    (RECEIVED, 'Recibida'),
    (REJECTED, 'Rechazada'),
    (ACCEPTED, 'Aceptada')
  )

  beneficiary = models.ForeignKey('api.Beneficiary', on_delete=models.CASCADE, related_name='rel_projects')
  project = models.ForeignKey('api.Project', on_delete=models.CASCADE, related_name='rel_beneficiaries')
  sponsor = models.ForeignKey('api.Sponsor', on_delete=models.CASCADE, related_name='projects_beneficiaries', blank=True, null=True)
  state = models.PositiveBigIntegerField(choices=STATES, default=RECEIVED)
  comments = models.TextField(blank=True, null=True)

  # FLAG TO KNOW IF HELP STOPS
  stop = models.BooleanField(default=False)

  # HERE WE WILL SAVE THE AMOUNTS THAT THE BENEFICIARY WILL RECEIVE
  amount_sponsor = models.FloatField(default=0)
  amount_quotas = models.FloatField(default=0)
  amount_delivered = models.FloatField(default=0)

