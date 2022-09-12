from django.db import models
from django.db.models.signals import pre_delete


class Pizza(models.Model):
    name = models.CharField(max_length=60, unique=True)
    topping = models.ManyToManyField("Toppings", max_length=60)
    #
    # related_name="toppings"
    def __str__(self):
        return self.name


class Toppings(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.name


# class PizzaToppings(models.Model):
#     toppings = models.ForeignKey(Toppings, on_delete=models.CASCADE)
#     pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE)
