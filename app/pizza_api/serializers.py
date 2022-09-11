from rest_framework import serializers
from pizza_api.models import Pizza


# class PizzaToppingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PizzaToppings
#         fields = ["toppings"]

class PizzaSerializer(serializers.ModelSerializer):
    # toppings = ToppingsSerializer(many=True, source="topping")

    class Meta:
        model = Pizza
        fields = ["id", "name", "toppings"]
    
    # def create(self, validated_data):
    #     toppings = validated_data.pop('topping')
    #     pizza = Pizza.objects.create(**validated_data)
    #     for topping_data in toppings:
    #         PizzaToppings.objects.create(pizza=pizza, **topping_data)
    #     return pizza