from pizza_api.models import Pizza
from pizza_api.serializers import PizzaSerializer
from rest_framework import generics

# Created a pizza viewset
class PizzaList(generics.ListAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    
class PizzaCreate(generics.CreateAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    
class PizzaUpdate(generics.UpdateAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
class PizzaDelete(generics.DestroyAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
