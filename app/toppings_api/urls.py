from django.urls import path

from toppings_api.views import (
    ToppingsCreate,
    ToppingsList,
    ToppingsUpdate,
    ToppingsDelete,
    ToppingsDetail,
)

urlpatterns = [
    path("toppings", ToppingsList.as_view()),
    path("toppings/create", ToppingsCreate.as_view()),
    path("toppings/<int:pk>", ToppingsUpdate.as_view()),
    path("toppings/view/<int:pk>", ToppingsDetail.as_view()),
    path("toppings/<int:pk>/delete", ToppingsDelete.as_view()),
]
