from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpRequest, HttpResponseRedirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from tech.models import MomentModel, CommentsModel, TagModel
from tech.serializers import UserSerializer, UserSerializerWithToken, MomentSerializer, MomentsWriteSerializer, \
    CommentSerializer, TagSerializer


@api_view(['POST'])
@login_required()
def delete(request, pk):
    article = get_object_or_404(MomentModel.objects.all(), pk=pk)
    article.delete()
    return Response({
        "message": "Moment with id `{}` has been deleted.".format(pk)
    }, status=status.HTTP_204_NO_CONTENT)


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
    all_moment = MomentModel.objects.filter(tags__name=name)
    serializer = MomentSerializer(all_moment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def create_tag(request: HttpRequest, name):
    que = TagModel.objects.get_or_create(name=name)
    serializer = TagSerializer(que[0])
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_post(request: HttpRequest):
    moment = MomentModel.objects.all()
    serializer = MomentSerializer(moment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def comments_with_id_post(request: HttpRequest, pk):
    all_comments = CommentsModel.objects.filter(moment_id=pk)
    serializer = CommentSerializer(all_comments, many=True)
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


class MomentDetail(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MomentModel.objects.all()
    serializer_class = MomentsWriteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentList(ListCreateAPIView):
    queryset = CommentsModel.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CommentDetail(RetrieveUpdateDestroyAPIView):
    queryset = CommentsModel.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
