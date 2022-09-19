from django.test import TestCase
from pizza_api.models import Pizza, Toppings
from rest_framework.test import APIClient
from pizza_api.serializers import PizzaSerializer
from rest_framework import status

client = APIClient()


class PizzaTest(TestCase):

    """Test module for Pizza model"""

    def setUp(self):
        self.valid_payload = {"name": "pepperoni", "toppings": [1]}
        self.invalid_payload = {"name": ""}

    # Get all pizza
    def test_get_all_pizza(self):

        """Should return all pizzas with id, name, and toppings"""

        response = self.client.get("/chef/pizza")
        pizzas = Pizza.objects.all()
        serializer = PizzaSerializer(pizzas, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_pizza_post(self):
        """Current test is not working but it is working in dev, prod, and API tests. I believe I have just written the test incorrectly and am continuing to troubleshoot it. It should return a 201 status code and an object with the name of the pizzam, the toppings, and the id. Toppings should be an array of integers"""
        response = self.client.post("/chef/pizza/create", self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "pepperoni")
        self.assertEqual(response.data["toppings"], [1])

    # Add a duplicate single pizzas
    def test_add_invalid_single_pizzas(self):
        """Should not allow duplicate pizzas to be added. It should return a 400 status code"""
        response = self.client.post(
            "/chef/pizza/create", {"id": 10, "name": "pepperoni"}
        )
        response = self.client.post(
            "/chef/pizza/create", {"id": 10, "name": "pepperoni"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Delete a valid single pizzas
    def test_delete_valid_single_pizzas(self):
        """Current test is not working but it is working in dev, prod, and API tests. I believe I have just written the test incorrectly and am continuing to troubleshoot it. It should return a 204 status code and remove the object from the database"""
        response = self.client.delete("/chef/pizza/2/delete", {"name": "pepperoni"})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # Delete an invalid single pizzas
    def test_delete_invalid_single_pizzas(self):
        response = self.client.delete("/chef/pizza/124/delete")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Update a valid single pizzas
    def test_update_valid_single_pizzas(self):
        """Current test is not working but it is working in dev, prod, and API tests. I believe I have just written the test incorrectly and am continuing to troubleshoot it. It should return a 200 status code and update the existing object in the database"""
        response = self.client.put(
            "/chef/pizza",
            {"id": 20, "name": "pepperoni"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
