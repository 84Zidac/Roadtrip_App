from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpRequest
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import App_User, Route, Waypoint
from .utilities import sign_up, log_in, curr_user, create_route, get_routes, create_waypoint, get_waypoint
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
        
        
@api_view(['POST', 'PUT', 'GET'])
def routes_capabilities(request):
 
    if request.method == 'POST':
        return create_route(request)
    if request.method == 'GET':
        return get_routes(request)
    
@api_view(['POST', 'PUT', 'GET'])
def waypoints_capabilities(request):
    if request.method == 'POST':
        return create_waypoint(request)
    if request.method == 'PUT':
        # print(request.data)
        return get_waypoint(request)
 
@api_view(['POST'])   
def delete_trip(request):
    # print (request.data)
    Route.objects.filter(pk=request.data['id']).delete()
    user = App_User.objects.filter(email=request.user)
    routes = list(Route.objects.filter(user_routes = user[0]).order_by('-id').values())

    return HttpResponse({'success': True,
                         'routes': routes})
    
@api_view(['POST'])
def delete_waypoint(request):
    Waypoint.objects.filter(pk=request.data['id']).delete()
    # print(request.data)
    request_obj = HttpRequest()
    request_obj.data = {'id': request.data['routes_id']}
    return get_waypoint(request_obj)



    