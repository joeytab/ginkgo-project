from django.shortcuts import render
from .models import Response
from .serializers import ResponseSerializer 
from rest_framework import viewsets
from django.http import HttpResponse
from django.views.generic import View
import json
import os
import sys 

sys.path.append(os.path.dirname(__file__))
import align

# Create your views here.

class ResponseView(viewsets.ViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.values('sequence') #.values['sequence']
    # def list(self, request):
    #     responses = align.search_seq(self.queryset)
    #     data = json.dumps(responses)
    #     return HttpResponse(data, content_type="application/json")
    def create(self, request):
        responses = align.search_seq(self.queryset[0]['sequence'])
        data = json.dumps(responses)
        return HttpResponse(data, content_type="application/json")
    def django_models_json(request):
        responses = list(queryset)
        data = json.dumps(responses)
        return HttpResponse(data, content_type="application/json")
