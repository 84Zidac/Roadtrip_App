from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import App_User, Route, Waypoint
from .utilities import sign_up, log_in, curr_user
from django.core.serializers import serialize
# from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.
# @csrf_exempt
@api_view(['POST', 'PUT', 'GET'])
def user_capabilities(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                # Removes SessionID
                logout(request)
                print('logging out')
                return JsonResponse({"logout":True})
            except Exception as e:
                print(e)
                return JsonResponse({"logout":False})
        else:
            return sign_up(request.data)

        
    elif request.method == 'PUT':
        return log_in(request)
    
    elif request.method == 'GET':
        return curr_user(request)
        
    
    
def index(request):
    # returns the index from React Project
    the_index = open('static/index.html')
    return HttpResponse(the_index)

@api_view(['POST', 'GET'])
def route_handler(request):
    if request.method == 'POST':
        routes = list(Route.objects.filter(user_routes = request.user).values())
        try:
            route_name = request.data['name']
            new_route = Route.objects.create(route_name=name, user=request.user)
            new_route.save()
            routes = list(Route.objects.filter(user_routes = request.user).values())
            return JsonResponse({'routes': routes})
        except Exception as e:
            print(e)
            return JsonResponse({'routes': routes})
        
        
    elif request.method == 'GET':
        try:
            routes = list(Route.objects.filter(user_routes = request.user).values())
            waypoints = list(Waypoint.objects.filter(route_waypoints= request.route).values())
            
            return JsonResponse({'routes': routes,
                                 'waypoints': waypoints
                                 })
        except Exception as e:
            print(e)
            return JsonResponse({'routes': []})
        