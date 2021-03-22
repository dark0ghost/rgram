from django.urls import path

from frontend import views

urlpatterns = [
    path('', views.get_react, name="get_react"),
]
