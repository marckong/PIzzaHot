from pizza_api.models import Toppings
from toppings_api.serializers import ToppingsSerializer
from rest_framework import generics
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                "toppings",
                OpenApiTypes.STR,
                description="Comma separated list of topping IDs to filter",
            )
        ]
    )
)
class ToppingsList(generics.ListAPIView):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer


class ToppingsCreate(generics.CreateAPIView):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer


class ToppingsUpdate(generics.UpdateAPIView):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer


class ToppingsDelete(generics.DestroyAPIView):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer
