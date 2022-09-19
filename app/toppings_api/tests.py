from django.test import TestCase, Client
from django.test import TestCase
from pizza_api.models import Toppings
from toppings_api.serializers import ToppingsSerializer
from rest_framework import status

client = Client()


class ToppingsTest(TestCase):
    """Test module for Toppings model"""

    def setUp(self):
        self.first = Toppings.objects.create(name="sausage")
        self.second = Toppings.objects.create(name="olive")
        self.valid_payload = {"name": "onion"}
        self.invalid_payload = {"name": ""}

    # Get all toppings
    def test_get_all_toppings(self):
        """Get a list of all toppings"""
        response = self.client.get("/owner/toppings")
        topping = Toppings.objects.all()
        serializer = ToppingsSerializer(topping, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Add a valid single topping
    def test_add_valid_single_topping(self):
        """Test to add a valid topping"""
        response = self.client.post(
            "/owner/toppings/create", {"id": 2, "name": "pepperoni"}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Add a duplicate single topping
    def test_add_invalid_single_topping(self):
        """Test to add an invalid topping"""
        response = self.client.post(
            "/owner/toppings/create", {"id": 10, "name": "pepperoni"}
        )
        response = self.client.post(
            "/owner/toppings/create", {"id": 10, "name": "pepperoni"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Delete a valid single topping
    def test_delete_valid_single_topping(self):
        """Test to delete a valid topping"""
        response = self.client.delete(
            "/owner/toppings/10/delete", {"id": 10, "name": "pepperoni"}
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # Delete an invalid single topping
    def test_delete_invalid_single_topping(self):
        """Test to delete a invalid topping"""
        response = self.client.delete("/owner/toppings/124/delete")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # Update a valid single topping
    def test_update_valid_single_topping(self):
        """Current test is not working but it is working in dev, prod, and API tests. I believe I have just written the test incorrectly and am continuing to troubleshoot it. It should return a 200 status code and update the existing object in the database"""
        response = self.client.put(
            "/owner/toppings",
            {"id": 20, "name": "pepperoni"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
