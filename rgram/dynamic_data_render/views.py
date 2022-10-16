from django.http import FileResponse


# Create your views here.


def send_image(request, name="icon.jpg"):

    img = open(f"./templates/{name}", 'rb')
    response = FileResponse(img)
    return response


