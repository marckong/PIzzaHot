from django.db import models


class PizzaToppings(models.Model):
    topping = models.ForeignKey('Toppings', on_delete=models.PROTECT)
    pizza = models.ForeignKey('Pizza', on_delete=models.PROTECT)


class Pizza(models.Model):

    name = models.CharField(max_length=60)
    toppings = models.ManyToManyField('Topping', through=PizzaToppings)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name