from .models import App_User, Route, Waypoint
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize
import json


def sign_up(data):
    email = data['email']
    password = data['password']
    name = data['name']
    super_user = True
    staff = True
    if 'super' in data:
        super_user = data['super']
    if 'staff' in data:
        staff = data['staff']
    try:
        # creates new user
        new_user = App_User.objects.create_user(username = email, email = email, name = name, password = password, is_superuser = super_user, is_staff = staff)
        new_user.save()
        return JsonResponse({"success":True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})
    
def log_in(request):
    email = request.data['email']
    password = request.data['password']
    print(email, password)
    user = authenticate(username = email , password = password)
    if user is not None and user.is_active:
        try:
            # Creates SessionID
            login(request._request, user)
            return JsonResponse({'login':True, 'email': user.email, 'name':user.name})
        except Exception as e:
            print(e)
            return JsonResponse({'login':False})
    return JsonResponse({'login':False})

def curr_user(request):
    if request.user.is_authenticated:
        #                    format       query                     options
        user_info = serialize("json",  [request.user], fields = ['name', 'email'])
        user_info_workable = json.loads(user_info)
        return JsonResponse(user_info_workable[0]['fields'])
    else:
        return JsonResponse({"user":None})

def create_route(request):
    # print(request.user)
    user = App_User.objects.filter(email=request.user)
    # print(user)
    route_name = request.data['route_name']
    originLat = request.data['originLat']
    originLng = request.data['originLng']
    destLat = request.data['destLat']
    destLng = request.data['destLng']
    routes = list(Route.objects.filter(user_routes = user[0]).values())
    # print(user)
    try:
        new_Route = Route.objects.create(route_name=route_name, 
                                         route_origin_lat=originLat, 
                                         route_origin_lng=originLng,
                                         route_destination_lat=destLat,
                                         route_destination_lng=destLng,
                                         user_routes=user[0])
        new_Route.save()
        routes = list(Route.objects.filter(user_routes = user[0]).values())
        return JsonResponse({'routes': routes,
                             'success': True})
    except Exception as e:
        print(f"exception: {e}")
        return JsonResponse({'routes': routes,
                             'success': False})
        
def get_routes(request):
    if request.user.is_authenticated:
        user = App_User.objects.filter(email=request.user)
        routes = list(Route.objects.filter(user_routes = user[0]).values())
        return JsonResponse({'routes': routes,
                             'success': True})
 
 
 
def create_waypoint(request):
    # print(request.data['id'])
    # print(Route.objects.all())
    route = Route.objects.filter(pk=request.data['id'])
    # print(user)
    route_name = request.data['waypoint_name']
    originLat = request.data['Lat']
    originLng = request.data['Lng']

    waypoints = list(Waypoint.objects.filter(route_waypoints = route[0]).values())
    # print(user)
    try:
        new_Waypoint = Waypoint.objects.create(waypoint_name=route_name, 
                                         latitue=originLat, 
                                         longitude=originLng,
                                         route_waypoints=route[0])
        new_Waypoint.save()
        waypoints = list(Waypoint.objects.filter(route_waypoints = route[0]).values())
        return JsonResponse({'waypoints': waypoints,
                             'success': True})
    except Exception as e:
        print(f"exception: {e}")
        return JsonResponse({'waypoints': waypoints,
                             'success': False})
        
def get_waypoint(request):
    if request.user.is_authenticated:
        try:
            # print(request.data)
            route = Route.objects.filter(pk=request.data['id'])
            waypoints = list(Waypoint.objects.filter(route_waypoints = route[0]).values())
            # print(waypoints)
            return JsonResponse({'waypoints': waypoints,
                                'success': True})           
        except Exception as e:
            print(f"exception: {e}")
            return JsonResponse({
                'success': False,
                'waypoints': []})