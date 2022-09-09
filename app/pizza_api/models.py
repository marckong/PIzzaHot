from django.db import models
from django.db.models.signals import pre_delete 
from django.dispatch import receiver


class Pizza(models.Model):
    name = models.CharField(max_length=60, unique=True)
    toppings = models.ManyToManyField("Toppings", max_length=60, related_name="toppings")

    def __str__(self):
        return (self.name, self.topping)

class Toppings(models.Model):
    name = models.CharField(max_length=60, unique=True)
    
    #Deletes associated pizza when topping is deleted
    @receiver(pre_delete, sender=Pizza)
    def delete_related_pizza(sender, instance, **kwargs):
        pizza = instance.pizza # instance is your Pizza instance that is about to be deleted
        pizza.delete()
    def __str__(self):
        return self.name


class PizzaToppings(models.Model):
    pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE)
    toppings = models.ForeignKey(Toppings, on_delete=models.CASCADE)

    def __str__(self):
        return self.topping, self.pizza
