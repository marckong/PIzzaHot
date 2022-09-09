from rest_framework import serializers
from toppings_api.models import Toppings

class ToppingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toppings
        fields = ('name')