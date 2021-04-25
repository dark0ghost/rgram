from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from tech.views import current_user, UserList, get_post

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('token-auth/', obtain_jwt_token),
    path("posts/", get_post)
]
