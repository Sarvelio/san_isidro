# django
from django.db import transaction

# Rest framework
from rest_framework import viewsets, filters, status, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# Models
from api.models import Configuracion

# Serializer
from api.serializers import  ConfiguracionReadSerializer, ConfiguracionSaveSerializer


class ConfiguracionViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Configuracion.objects.filter(active=True)
    
    def retrieve(self, request, *args, **kwargs):
        config = Configuracion.objects.all().last()
        serializer = ConfiguracionReadSerializer(config, partial=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def update(self, request, *args, **kwargs):
        data = request.data
        config = Configuracion.objects.all().last()
        if not config:
            serializer = ConfiguracionSaveSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        serializer = ConfiguracionSaveSerializer(instance=config, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
