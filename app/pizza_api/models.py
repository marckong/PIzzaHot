from django.db import models


class Toppings(models.Model):
    name = models.CharField(max_length=60, unique=True)

    def __str__(self):
        return self.name
    
class Pizza(models.Model):
    name = models.CharField(max_length=60, unique=True)
    toppings = models.ManyToManyField(Toppings,max_length=60)
    def __str__(self):
        return self.name
    
