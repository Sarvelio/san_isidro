# rest framework
from rest_framework import serializers

# models
from api.models import Beneficiary


class BeneficiaryBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Beneficiary
        fields = ('id', 'name')


class BeneficiaryReadSerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()
    class Meta:
        model = Beneficiary
        fields = "__all__"

    def get_parent(self, obj):
        parent_list = []
        for parent_rel in obj.parent_rel.filter(active=True):
            parent_list.append({ 'id': parent_rel.parent.id , 'name': parent_rel.parent.name })
        return parent_list

class BeneficiarySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        fields = "__all__"
