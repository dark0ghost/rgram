from django.urls import path

from tech import views

urlpatterns = [
    path('get/users', views.get_user, name="get_user"),
    path("get/tag", views.get_tag, name="get_tag"),
    path('post/users', views.post_user, name="get_user"),
    path("post/tag", views.post_tag, name="get_tag")
]
