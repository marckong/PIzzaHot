from pizza_api.models import Toppings
from toppings_api.serializers import ToppingsSerializer
from rest_framework import generics

# Created a Toppings viewset
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
