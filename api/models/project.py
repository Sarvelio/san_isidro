
# Django
from django.db import models

# Models
from api.models import BaseModel


class Project(BaseModel):
    name = models.CharField(max_length=150)
    type = models.ForeignKey('api.ProjectTypes', on_delete=models.CASCADE, related_name='projects')
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey('api.Department', on_delete=models.CASCADE, related_name='projects')
    city = models.ForeignKey('api.City', on_delete=models.CASCADE, related_name='projects')
    address = models.TextField(blank=True, null=True)
    finished = models.BooleanField(default=False)