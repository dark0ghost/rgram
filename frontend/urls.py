from django.urls import path, re_path

from frontend import views

urlpatterns = [
    path("", views.get_react, name="get_react"),
]
