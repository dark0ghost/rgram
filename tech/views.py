from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpRequest
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from tech.serializers import UserSerializer, UserSerializerWithToken, MomentSerializer
from tech.utils import get_page


@api_view(['GET'])
@login_required
def get_post(request: HttpRequest):
    serializer = MomentSerializer()
    return Response(serializer.data)


@api_view(['GET'])
def current_user(request: HttpRequest):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request):
        try:
            serializer = UserSerializerWithToken(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            print(e)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
