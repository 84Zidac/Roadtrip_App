from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def index(reqeust):
    the_index = open('./static/index.html')
    return HttpResponse(the_index)