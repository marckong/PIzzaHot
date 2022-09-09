from django.urls import path, include
from rest_framework import routers

from pizza_api.views import PizzaViewSet

router = routers.DefaultRouter()
router.register("pizzas", PizzaViewSet, "pizzas")

urlpatterns = [
    path("pizzas/", include(router.urls)),
]