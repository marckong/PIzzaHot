from itertools import count
from pizza_api.models import Toppings
from pizza_api.deserialize import deserialize
from rest_framework import serializers
from pizza_api.models import Pizza
from toppings_api.serializers import ToppingsSerializer


class PizzaSerializer(serializers.ModelSerializer):
    topping = ToppingsSerializer(read_only=True, many=True, source='toppings')

    class Meta:
        model = Pizza
        fields = ["name", "topping", "toppings"]
