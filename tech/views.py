from django.db.models import Model
from django.http import HttpRequest
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from tech.models import LowUserModel
from tech.serializers import LowUserSerializer


@api_view(['GET'])
def get_user(request: HttpRequest):
    users = LowUserModel.objects.all()

    page = request.GET.get("page", 1)
    paginator = Paginator(users, 10)

    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    users_serializer = LowUserSerializer(data, context={'request': request}, many=True)


def get_comments(request):
    pass


def get_moments(request):
    pass


def get_tag(request):
    pass
