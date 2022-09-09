from rest_framework.viewsets import ModelViewSet
from pizza_api.models import Pizza
from pizza_api.serializers import PizzaSerializer

# Created a pizza viewset
class PizzaViewSet(ModelViewSet):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer

"""
Core views for app.
"""