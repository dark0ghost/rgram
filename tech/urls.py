from django.urls import path

from tech import views

urlpatterns = [
    path('users', views.get_user, name="get_user"),
]
