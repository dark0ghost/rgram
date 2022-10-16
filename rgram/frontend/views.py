from django.http import HttpRequest
from django.shortcuts import render


def get_react(request: HttpRequest):
    context = {}
    return render(request, "frontend/build/index.html", context)
