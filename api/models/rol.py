
#Django
from django.contrib.auth.models import Group

# Models
from api.models import BaseModel

class Rol(BaseModel, Group):
  """ Model for the handling of the rols of the application """