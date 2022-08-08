# Django
from django.db import models

# Models
from api.models import BaseModel



class Beneficiary(BaseModel):

  KID = 1
  YOUNG = 2
  ADULT = 3
  ENTITY = 4

  TYPE_BENEFICIARY = (
    (KID, 'Niños'),
    (YOUNG, 'Joven'),
    (ADULT, 'Adulto'),
    (ENTITY, 'Entidad')
  )

  MALE = 1
  FEMALE = 2
  OTHER = 3

  GENDERS = (
      (MALE, 'Hombre'),
      (FEMALE, 'Mujer'),
      (OTHER, 'Otro'),
  )

  name  = models.CharField(max_length=150)
  last_name = models.CharField(max_length=150, blank=True, null=True)
  photo = models.ImageField(upload_to='beneficiary/photo/', null=True, blank=True)
  type = models.PositiveSmallIntegerField(choices=TYPE_BENEFICIARY)
  email = models.EmailField(blank=True, null=True)
  cellphone = models.CharField(max_length=15, blank=True, null=True)
  
  # FOR PERSON
  birthday = models.DateField(blank=True, null=True)
  gender = models.PositiveSmallIntegerField(choices=GENDERS, blank=True, null=True)

  # FOR ADULT
  dpi = models.CharField(max_length=13, blank=True, null=True)

  # FOR KIDS AND YOUNGS 
  last_grade = models.CharField(max_length=25, null=True, blank=True)
  current_grade = models.CharField(max_length=25, null=True, blank=True)
  current_average = models.CharField(max_length=10, null=True, blank=True)

  # FOR ENTITIES
  person_in_charge = models.CharField(max_length=200, null=True, blank=True)

  # FOR EVERYONE
  address = models.TextField(blank=True, null=True)




