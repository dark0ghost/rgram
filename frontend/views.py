from django.http import HttpRequest
from django.shortcuts import render


def get_react(request: HttpRequest):
    return render(request, "./build/index.html")
