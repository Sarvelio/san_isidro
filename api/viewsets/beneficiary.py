# django
from django.db import transaction
from django.core.files import File

# Rest framework
from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# Models
from api.models import Beneficiary

# Serializer
from api.serializers import BeneficiaryBaseSerializer, BeneficiaryReadSerializer, BeneficiarySaveSerializer

#others
import json

class BeneficiaryViewSet(viewsets.ModelViewSet):
    serializer_class = BeneficiaryReadSerializer
    queryset = Beneficiary.objects.filter(active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name",)
    search_fields = ("name",)
    ordering_fields = ("id", "name")

    def get_serializer_class(self):
        """Define serializer for API"""
        async_options = self.request.query_params.get('async_options', False)
        if async_options:
            return BeneficiaryBaseSerializer
        if self.action == 'list' or self.action == 'retrieve':
            return BeneficiaryReadSerializer
        else:
            return BeneficiarySaveSerializer

    def create(self, request, *args, **kwargs):
        user = request.user.id
        data = request.data
        photo = None
        data['createdBy'] = user # user who created the record
        ids_parent = data.get('parent', [])

        if 'photo' in request.data:
            photo = request.data.get('photo', None)
            data = json.loads(request.data.get('data')) 

        with transaction.atomic():
            del data['parent']
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            beneficiary= serializer.save()

            for id_parent in ids_parent:
                ParentRel.objects.create(parent_id=id_parent, beneficiary=beneficiary, createdBy_id=user)

            if photo is not None:
                beneficiary.photo = File(photo)
                beneficiary.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        user = request.user.id
        data = request.data
        photo = None
        instance = self.get_object()
        data['updatedBy'] = user # user who updated the record
        ids_parent = data.get('parent', [])

        if 'photo' in request.data:
            photo = request.data.get('photo', None)
            print(request.data.get('data'))
            data = json.loads(request.data.get('data')) 

        with transaction.atomic():
            serializer = self.get_serializer(instance, data=data)
            serializer.is_valid(raise_exception=True)
            beneficiary = serializer.save()

            for id_parent in ids_parent:
                ParentRel.objects.create(
                    parent_id=id_parent, 
                    beneficiary=beneficiary, 
                    createdBy_id=user)

            if photo is not None:
                beneficiary.photo = File(photo)
                beneficiary.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
