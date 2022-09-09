from django.urls import path, include
from rest_framework import routers

from pizza_api.views import ToppingViewSet

router = routers.DefaultRouter()

router.register("toppings", ToppingViewSet, "toppings")
urlpatterns = [
    path("toppings/", include(router.urls)),
]
