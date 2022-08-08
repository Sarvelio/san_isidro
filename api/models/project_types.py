# Django
from django.db import models

# Models
from api.models import BaseModel


class ProjectTypes(BaseModel):
    """ Model for project types """
    name = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
