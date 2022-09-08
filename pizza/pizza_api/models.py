from django.db import models
from django.urls import reverse
# Create your models here.


class Topping(models.Model):
    topping = models.CharField(max_length=64, unique=True, blank=True, null=True, help_text="Enter a topping")
    
    def __str__(self):
        return self.topping

class Pizza(models.Model):
    title = models.CharField(max_length=64, unique=True, blank=False, help_text="Create a pizza")
    toppings = models.ManyToManyField(Topping)

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.id} ({self.pizza.title})'
    def get_absolute_url(self):
        """Returns the url to access a particular pizza instance."""
        return reverse('pizza-detail', args=[str(self.id)])