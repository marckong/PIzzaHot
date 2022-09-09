from django.urls import path

from pizza_api.views import PizzaCreate, PizzaList, PizzaUpdate, PizzaDelete
urlpatterns = [
    path('pizza/all',PizzaList.as_view()),
    path('pizza/create',PizzaCreate.as_view()),
    path('pizza/<int:pk>',PizzaUpdate.as_view()),
    path('pizza/<int:pk>/delete',PizzaDelete.as_view()),
]