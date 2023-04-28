from django.db import models
from django.contrib.auth.models import AbstractUser
from django.apps import apps


# Create your models here.
class App_User(AbstractUser):
    email = models.EmailField(blank = False, null = False, unique = True)
    name = models.CharField(max_length = 255, null = False, blank = False)
    # Tells Django to utilize users email as their username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f"{self.email}"
    
class Route(models.Model):
    route_name = models.CharField(max_length=255, default='New Route')
    route_origin_lat = models.DecimalField(max_digits=10, decimal_places=6)
    route_origin_lng = models.DecimalField(max_digits=10, decimal_places=6)
    route_destination_lat = models.DecimalField(max_digits=10, decimal_places=6)
    route_destination_lng = models.DecimalField(max_digits=10, decimal_places=6)
    user_routes = models.ForeignKey(App_User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Route Name: {self.route_name} Origin: {self.route_origin_lat, self.route_origin_lng} Destination: {self.route_destination_lat, self.route_destination_lng}"
    
class Waypoint(models.Model):
    waypoint_name = models.CharField(max_length=255, default='New Waypoint')
    latitue=models.DecimalField(max_digits=10, decimal_places=7)
    longitude=models.DecimalField(max_digits=10, decimal_places=7)
    route_waypoints = models.ForeignKey(Route, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Name: {self.waypoint_name} Latitude: {self.latitue}  Longitude: {self.longitude}"
    
apps.register_model(App_User, model=AbstractUser)
