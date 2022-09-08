from rest_framework import serializers
from pizza_api.function import attempt_json_deserialize
from pizza_api.models import Pizza, Topping
class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('name')
        
class PizzaSerializer(serializers.ModelSerializer):
    toppings = ToppingSerializer(read_only=True, many=True)

    class Meta:
        model = Pizza
        fields = ('toppings')
        
    def create(self, validated_data):
        request = self.context['request']

        toppings_data = request.data.get('toppings')
        toppings_data = attempt_json_deserialize(toppings_data, expect_type=list)
        validated_data['toppings'] = toppings_data
        # create toppings object
        # toppings_objs = [Topping.objects.create(**data) for data in toppings_data]
        # validated_data['toppings'] = toppings_objs
        instance = super().create(validated_data)

        return instance