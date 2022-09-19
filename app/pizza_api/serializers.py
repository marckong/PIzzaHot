from rest_framework import serializers
from pizza_api.models import Pizza


class PizzaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pizza
        fields = ["id", "name", "toppings"]
