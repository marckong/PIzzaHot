from django.test import TestCase, Client
from django.test import TestCase
from pizza_api.models import Pizza
from pizza_api.serializers import PizzaSerializer
from rest_framework import status

client = Client()


class PizzaTest(TestCase):
    """Test module for Pizza model"""

    def setUp(self):
        self.first = Pizza.objects.create(name="sausage")
        self.second = Pizza.objects.create(name="olive")
        self.valid_payload = {"name": "onion"}
        self.invalid_payload = {"name": ""}

    # Get all pizza
    def test_get_all_pizza(self):
        # get API response
        response = self.client.get("/chef/pizza")
        pizzas = Pizza.objects.all()
        serializer = PizzaSerializer(pizzas, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Add a valid single pizzas
    def test_add_valid_single_pizzas(self):
        """The create test is not working. I believe it to be due to the fact that the response payload is in strange formatting. I need to look into fixing the formatting. Delete is working in development. Will continue to look into this."""
        response = self.client.post(
            "/chef/pizza/create", {"name": "pepperoni", "toppings": ["pepp"]}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Add a duplicate single pizzas
    def test_add_invalid_single_pizzas(self):
        response = self.client.post(
            "/chef/pizza/create", {"id": 10, "name": "pepperoni"}
        )
        response = self.client.post(
            "/chef/pizza/create", {"id": 10, "name": "pepperoni"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Delete a valid single pizzas
    def test_delete_valid_single_pizzas(self):
        """The delete test is not working. I believe it to be due to the fact that the response payload is in strange formatting. I need to look into fixing the formatting.Delete is working in development. Will continue to look into this."""
        response = self.client.delete("/chef/pizza/2/delete", {"name": "pepperoni"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # Delete an invalid single pizzas
    def test_delete_invalid_single_pizzas(self):
        response = self.client.delete("/chef/pizza/124/delete")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Update a valid single pizzas
    def test_update_valid_single_pizzas(self):
        """Unable to test the update method. It is working in development but not in the test. Need to investigate."""
        response = self.client.put(
            "/chef/pizza",
            {"id": 20, "name": "pepperoni"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
