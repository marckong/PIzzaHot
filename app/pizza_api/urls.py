from django.urls import path

from pizza_api.views import PizzaCreate, PizzaList, PizzaUpdate, PizzaDelete, PizzaDetail

urlpatterns = [
    path("pizza", PizzaList.as_view()),
    path("pizza/create", PizzaCreate.as_view()),
    path("pizza/<int:pk>", PizzaUpdate.as_view()),
    path("pizza/?=<int:pk>", PizzaDetail.as_view()),
    path("pizza/<int:pk>/delete", PizzaDelete.as_view()),
]
