from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpRequest, HttpResponseRedirect
from django.views.generic import DetailView
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from tech.models import MomentModel
from tech.serializers import UserSerializer, UserSerializerWithToken, MomentSerializer


@api_view(['POST'])
@login_required()
def add_post(request: HttpRequest):
    if (serializer := MomentSerializer(data=request.data)).is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
def get_post(request: HttpRequest):
    serializer = MomentSerializer()
    return Response(serializer.data)


@api_view(['GET'])
def current_user(request: HttpRequest):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def get_user_photo(request: HttpRequest):
    pass


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


