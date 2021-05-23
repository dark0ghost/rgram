from django.urls import path

from dynamic_data_render.views import send_image

urlpatterns = [
    path("<name>",  send_image),
]
