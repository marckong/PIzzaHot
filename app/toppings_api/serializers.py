from rest_framework import serializers
from pizza_api.models import Toppings


class ToppingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toppings
        fields = "__all__"
