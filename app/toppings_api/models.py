from django.db import models
from pizza_api.models import PizzaToppings
# Create your models here.

class Toppings(models.Model):
    name = models.CharField(max_length=60)
    on_top_of = models.ManyToManyField('Pizza', through=PizzaToppings)

    def __str__(self):
        return self.name