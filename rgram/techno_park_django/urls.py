"""techno_park_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path("", views.home, name="home")
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path("", Home.as_view(), name="home")
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path("blog/", include("blog.urls"))
"""
from django.contrib import admin
from django.urls import path, include

import frontend.urls
from dynamic_data_render import urls as  dynamic_data_render_urls
from tech import urls as tech_url
from techno_park_django.views import send_favicon

urlpatterns = [
    path("local/admin/", admin.site.urls),
    path("api/", include(tech_url.urlpatterns)),
    path("index", include(frontend.urls.urlpatterns)),
    path("templates/", include(dynamic_data_render_urls.urlpatterns)),
    path("favicon.ico", send_favicon),
    path("", send_favicon),
    path("add", frontend.views.get_react, name="get_react"),
    path("signup", frontend.views.get_react, name="get_react"),
    path("login", frontend.views.get_react, name="get_react"),
    path("tags/<name>", frontend.views.get_react, name="get_react"),
    path("profile", frontend.views.get_react, name="get_react"),
    path("comments/<name>", frontend.views.get_react, name="get_react"),
    path("user/<name>", frontend.views.get_react, name="get_react"),
]
