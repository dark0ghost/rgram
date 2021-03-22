from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tech.models import LowUserModel, TagModel
from tech.serializers import LowUserSerializer, TagSerializer
from tech.utils import get_page


@api_view(['GET'])
def get_user(request: HttpRequest):
    users = LowUserModel.objects.all()
    data = get_page(request, users)
    users_serializer = LowUserSerializer(data, context={'request': request}, many=True)
    return Response({'data': users_serializer.data})


def get_comments(request):
    pass


def get_moments(request):
    pass


@api_view(['GET'])
def get_tag(request):
    tags = TagModel.objects.all()
    data = get_page(request, tags)
    tags_serializer = TagSerializer(data, context={'request': request}, many=True)
    return Response({'data': tags_serializer.data})
