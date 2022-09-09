from rest_framework import serializers
from pizza_api.models import Pizza
from toppings_api.models import ToppingsSerializer

        
class PizzaSerializer(serializers.ModelSerializer):
    toppings = ToppingsSerializer(read_only=True, many=True)

    class Meta:
        model = Pizza
        fields = ('toppings')
        
    def create(self, validated_data):
        request = self.context['request']

        toppings_data = request.data.get('toppings')
        validated_data['toppings'] = toppings_data
        # create toppings object
        # toppings_objs = [Topping.objects.create(**data) for data in toppings_data]
        # validated_data['toppings'] = toppings_objs
        instance = super().create(validated_data)

        return instance
    
    def update(self, instance, validated_data):
        request = self.context['request']
        toppings_data = request.data.get('toppings')
        validated_data['toppings'] = toppings_data

        instance = super().update(instance, validated_data)

        return instance