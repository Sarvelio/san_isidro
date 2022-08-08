# Django
from django.db import models

# Models
from api.models import BaseModel



class Sponsor(BaseModel):

  PERSON = 1
  CHURCH = 2
  COUPLE = 3
  ORGANIZATION = 4
  OTHER = 5

  TYPE_SPONSOR = (
    (PERSON, 'Persona'),
    (CHURCH, 'Iglesia'),
    (COUPLE, 'Pareja'),
    (ORGANIZATION, 'Organización'),
    (OTHER, 'Otro'),
  )

  MALE = 1
  FEMALE = 2
  OTHER = 3

  GENDERS = (
      (MALE, 'Hombre'),
      (FEMALE, 'Mujer'),
      (OTHER, 'Otro'),
  )

  type = models.PositiveSmallIntegerField(choices=TYPE_SPONSOR)

  name  = models.CharField(max_length=150)
  last_name = models.CharField(max_length=150, blank=True, null=True)
  gender = models.PositiveSmallIntegerField(choices=GENDERS)
  address = models.TextField(blank=True, null=True)
  email = models.EmailField(blank=True, null=True)
  cellphone = models.CharField(max_length=15, blank=True, null=True)

