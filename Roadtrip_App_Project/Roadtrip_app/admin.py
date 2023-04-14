from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register([App_User, Route, Waypoint])