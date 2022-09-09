from django.shortcuts import render
from app.toppings_api.models import Toppings
from app.toppings_api.serializer import ToppingsSerializer
from rest_framework.viewsets import ModelViewSet

# Created a topping viewset
class ToppingsViewSet(ModelViewSet):
    queryset = Toppings.objects.all()
    serializer_class = ToppingsSerializer
