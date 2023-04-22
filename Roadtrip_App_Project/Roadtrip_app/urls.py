from django.urls import path
from . import views

urlpatterns =[
    path('users/', views.user_capabilities, name='user_capabilities'),
    path('', views.index, name='index'),
    path('route/', views.routes_capabilities, name='routes_capabilities'),
    path('waypoint/', views.waypoints_capabilities, name='waypoint_capabilities'),
    path('delete_trip/', views.delete_trip, name='delete_trip'),
]