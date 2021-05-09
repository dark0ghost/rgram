from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpRequest, HttpResponseRedirect
from django.views.generic import DetailView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from tech.models import MomentModel
from tech.serializers import UserSerializer, UserSerializerWithToken, MomentSerializer


@api_view(['POST'])
@login_required()
def add_post(request: HttpRequest):
    print(request.data)
    if (serializer := MomentSerializer(data=request.data)).is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@login_required()
def delete(request, pk):
    article = get_object_or_404(MomentModel.objects.all(), pk=pk)
    article.delete()
    return Response({
        "message": "Moment with id `{}` has been deleted.".format(pk)
    }, status=204)


@api_view(['POST', 'GET'])
@login_required()
def add_like(request: HttpRequest, pk):
    post = get_object_or_404(MomentModel, id=request.POST.get('momentmodel_id'))
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return HttpResponseRedirect(reverse('momentmodel-detail', args=[str(pk)]))


@api_view(['GET'])
def get_post_with_tag(request: HttpRequest, name):
    print(name)
    all_moment = MomentModel.objects.filter(tags__name=name)
    serializer = MomentSerializer(all_moment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_post(request: HttpRequest):
    moment = MomentModel.objects.all()
    serializer = MomentSerializer(moment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def current_user(request: HttpRequest):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def post(request):
        serializer = UserSerializerWithToken(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MomentModelDetailView(DetailView):
    model = MomentModel

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        likes_connected = get_object_or_404(MomentModel, id=self.kwargs['pk'])
        liked = False
        if likes_connected.likes.filter(id=self.request.user.id).exists():
            liked = True
        data['number_of_likes'] = likes_connected.number_of_likes()
        data['post_is_liked'] = liked
        return data


class CreateMomentAPIView(APIView):
    serializer_class = MomentSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, format=None, *args, **kwargs):
        print(request.data)
        if (serializer := self.serializer_class(data=request.data)).is_valid():
            try:
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ValidationError as e:
                print(e, "  sadasd")
                return Response(e.message, status=status.HTTP_400_BAD_REQUEST)
        print(serializer.errors, "  sadasd")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
