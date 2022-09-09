from rest_framework import serializers
from pizza_api.models import Toppings

class ToppingsSerializer(serializers.ModelSerializer):
    # def create(self, obj):
    #     if 'toppings' not in self.fields:
    #         self.fields['toppings'] = ToppingsSerializer(obj, many=True)      
    #     return super(ToppingsSerializer, self).create(obj)
    
    class Meta:
        model = Toppings
        fields = "__all__"