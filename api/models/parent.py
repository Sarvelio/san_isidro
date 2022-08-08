# Django
from django.db import models

# Models
from api.models import BaseModel

class ParentRel(BaseModel):
    parent = models.ForeignKey('api.Parent', on_delete=models.CASCADE, related_name='parent_rel')
    beneficiary = models.ForeignKey('api.Beneficiary', on_delete=models.CASCADE, related_name='parent_rel')

    class Meta:
      constraints = [
          models.UniqueConstraint(fields=['parent', 'beneficiary',], name='unique_parent_rel')
      ]


class Parent(BaseModel):

  MALE = 1
  FEMALE = 2
  OTHER = 3

  GENDERS = (
      (MALE, 'Hombre'),
      (FEMALE, 'Mujer'),
      (OTHER, 'Otro'),
  )

  MOTHER = 1
  FATHER = 2
  GRANDMOTHER = 3
  GRANDFATHER = 4
  AUNT = 5
  UNCLE = 6
  IN_CHARGE = 7

  TYPE_RELATION = (
    (MOTHER, 'Madre'),
    (FATHER, 'Padre'),
    (GRANDMOTHER, 'Abuela'),
    (GRANDFATHER, 'Abuelo'),
    (AUNT, 'Tia'),
    (UNCLE, 'Tio'),
    (IN_CHARGE, 'Encargado'),
  )

  name  = models.CharField(max_length=150)
  last_name = models.CharField(max_length=150, blank=True, null=True)
  birthday = models.DateField(blank=True, null=True)
  gender = models.PositiveSmallIntegerField(choices=GENDERS, blank=True, null=True)
  email = models.EmailField(blank=True, null=True)
  cellphone = models.CharField(max_length=15, blank=True, null=True)
  dpi = models.CharField(max_length=13, blank=True, null=True)
  address = models.TextField(blank=True, null=True)
  relation = models.PositiveSmallIntegerField(choices=TYPE_RELATION, blank=True, null=True)



