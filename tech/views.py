from cent import Client
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpRequest
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from tech.models import MomentModel, CommentsModel, TagModel, SubscribersModel, LowUserModel
from tech.serializers import UserSerializer, UserSerializerWithToken, MomentSerializer, MomentsWriteSerializer, \
    CommentSerializer, TagSerializer, SubscribersSerializer
from techno_park_django.settings import CENTRIFUGAL_URL, CENTRIFUGAL_API_KEY

centrifugal = Client(CENTRIFUGAL_URL, api_key=CENTRIFUGAL_API_KEY, timeout=1)


@api_view(['POST', 'Get'])
@login_required
def get_user_data(request, name):
    model = LowUserModel.objects.filter(username=name)
    serializer = UserSerializer(model, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'Get'])
@login_required
def user_subscribes(request, name):
    model = SubscribersModel.objects.filter(follows__username=name)
    serializer = SubscribersSerializer(model, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@login_required
def add_comment(request, pk):
    model = CommentsModel.objects.create(owner=request.user, text=request.data["content"], moment_id=pk)
    params = {
        "channel": "comment",
        "data": "hello world"
    }
    serializer = CommentSerializer(model)
    centrifugal.add("publish", params)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@login_required
def delete(request, pk):
    article = get_object_or_404(MomentModel.objects.all(), pk=pk)
    article.delete()
    return Response({
        "message": "Moment with id `{}` has been deleted.".format(pk)
    }, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'GET'])
@login_required
def subscribes(request, name):
    user = LowUserModel.objects.filter(username=name)[0]
    model = SubscribersModel.objects.get_or_create(author=user)[0]
    serializer = SubscribersSerializer(model)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
@login_required
def my_subscribes(request):
    model = SubscribersModel.objects.filter(follows=request.user)
    serializer = SubscribersSerializer(model, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
@login_required
def make_subscribe_or_unsubscribe(request, name):
    user = LowUserModel.objects.filter(username=name)[0]
    author_model = SubscribersModel.objects.get_or_create(author=user)[0]

    if not author_model.follows.filter(id=request.user.id).exists():
        author_model.follows.add(request.user)
    else:
        author_model.follows.remove(request.user)
    serializer = SubscribersSerializer(author_model)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
@login_required
def add_like(request: HttpRequest, pk):
    post = get_object_or_404(MomentModel, id=pk)
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return Response(status=status.HTTP_201_CREATED)


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
def get_post_with_username(request: HttpRequest, username):
    all_moment = MomentModel.objects.filter(owner__username=username)
    serializer = MomentSerializer(all_moment, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_post_with_id(request: HttpRequest, id_post):
    all_moment = MomentModel.objects.filter(id=id_post)
    serializer = MomentSerializer(all_moment, many=True)
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

    def create(self, request, *args, **kwargs):
        data = request.data.dict()
        tags = data.pop("tags", "")
        data["tags"] = []
        for i in tags.split(","):
            data["tags"].append(TagModel.objects.get_or_create(name=i)[0].id)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
