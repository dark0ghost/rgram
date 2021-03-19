from django.db.models import Model
from django.http import HttpRequest
from django.shortcuts import render
from rest_framework.decorators import api_view

import tech.models


# Create your views here.

@api_view(['GET'])
def get_user(request: HttpRequest):
    if request.user.is_authenticated:
        users = tech.models.LowUserModel.objects.filter(short_name=request.GET["short_name"])
        return users

    return render(request, '../tech/frontend/templates/base/user_not_auth.html')


def get_comments(request):
    pass


def get_moments(request):
    pass


def get_tag(request):
    pass
