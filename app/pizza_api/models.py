from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Pizza(models.Model):
    name = models.CharField(max_length=60, unique=True)
    toppings = models.ManyToManyField(
        "Toppings", max_length=60, related_name="toppings"
    )

    def __str__(self):
        return (self.name, self.topping)


class Toppings(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.name
