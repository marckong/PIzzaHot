from pizza_api.models import Toppings
from pizza_api.deserialize import deserialize
from rest_framework import serializers
from pizza_api.models import Pizza
from toppings_api.serializers import ToppingsSerializer


class PizzaSerializer(serializers.ModelSerializer):
    topping = ToppingsSerializer(read_only=True, many=True, source="toppings")

    class Meta:
        model = Pizza
        fields = ["id", "name", "toppings", "topping"]


class PizzaDetailSerializer(PizzaSerializer):
    """Serializer for pizza detail view."""

    class Meta(PizzaSerializer.Meta):
        fields = PizzaSerializer.Meta.fields + ["description"]

    def _get_or_create_toppings(self, toppings, pizza):
        """Handle getting or creating toppings as needed."""
        auth_user = self.context["request"].user
        for topping in toppings:
            topping_obj, created = Toppings.objects.get_or_create(
                user=auth_user,
                **topping,
            )
            pizza.toppings.add(topping_obj)

    def create(self, validated_data):
        """Create a pizza."""
        toppings = validated_data.pop("toppings", [])
        pizza = Pizza.objects.create(**validated_data)
        self._get_or_create_toppings(toppings, pizza)

        return pizza

    def update(self, instance, validated_data):
        """Update pizza."""
        toppings = validated_data.pop("toppings", None)
        if toppings is not None:
            instance.toppings.clear()
            self._get_or_create_toppings(toppings, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
