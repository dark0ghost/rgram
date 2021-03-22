from django.http import HttpRequest
from rest_framework import status
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


@api_view(['GET'])
def get_tag(request):
    tags = TagModel.objects.all()
    data = get_page(request, tags)
    tags_serializer = TagSerializer(data, context={'request': request}, many=True)
    return Response({'data': tags_serializer.data})


@api_view(['POST'])
def post_user(request: HttpRequest):
    serializer = LowUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def post_tag(request):
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
