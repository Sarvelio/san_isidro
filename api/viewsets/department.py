# Rest framework
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

# Models
from api.models import Department

# Serializer
from api.serializers import DepartmentBaseSerializer


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DepartmentBaseSerializer
    queryset = Department.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("code","name",)
    ordering_fields = ("id", "code", "name")
  
