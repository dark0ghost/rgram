from django.http import HttpRequest
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from tech.models import TagModel
from tech.serializers import TagSerializer, UserSerializer, UserSerializerWithToken
from tech.utils import get_page


@api_view(['GET'])
def get_tag(request: HttpRequest):
    tags = TagModel.objects.all()
    data = get_page(request, tags)
    tags_serializer = TagSerializer(data, context={'request': request}, many=True)
    return Response({'data': tags_serializer.data})


@api_view(['POST'])
def post_tag(request: HttpRequest):
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request: HttpRequest):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
