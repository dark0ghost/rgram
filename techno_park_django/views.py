from django.http import FileResponse


def send_favicon(request):
    img = open(f"./templates/favicon.ico", 'rb')
    response = FileResponse(img)
    return response
