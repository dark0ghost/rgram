from django.core.paginator import Page, Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Model
from django.http import HttpRequest


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
