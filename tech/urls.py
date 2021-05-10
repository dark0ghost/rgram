from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from tech.views import current_user, UserList, get_post, add_like, get_post_with_tag, MomentDetail, CommentList, \
    CommentDetail, comments_with_id_post, create_tag

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('token-auth/', obtain_jwt_token),
    path("posts/", get_post),
    path("create_post/", MomentDetail.as_view()),
    path("add_like", add_like),
    path("tag/<name>", get_post_with_tag),
    path("create_tag/<name>",  create_tag),
    path('comments/', CommentList.as_view()),
    path('comments/<int:pk>/', CommentDetail.as_view()),
    path('commetnts-with-post/<int:pk>', comments_with_id_post)
]
