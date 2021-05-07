from django.core.paginator import Page, Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Model
from django.http import HttpRequest

from tech.serializers import UserSerializer


def get_page(request: HttpRequest, model: Model) -> Page:
    page = request.GET.get("page", 1)
    paginator = Paginator(model, 10)

    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    return data


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
