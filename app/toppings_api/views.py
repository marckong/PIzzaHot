from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Created a topping viewset
class ToppingViewSet(ModelViewSet):
    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer
