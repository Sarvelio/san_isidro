# Rest framework
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

# Models
from api.models import City

# Serializer
from api.serializers import CityBaseSerializer


class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CityBaseSerializer
    queryset = City.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ("code","department")
    search_fields = ("code","name")
    ordering_fields = ("id", "code", "name")
  
