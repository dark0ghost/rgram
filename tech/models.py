from django.contrib.auth.models import User
from django.db.models import Model, CharField, DateTimeField, ImageField
from rest_framework.fields import EmailField


class LowUserModel(User):
    nick_name = CharField(max_length=30)

    avatar = ImageField()

    short_name = CharField(max_length=120, unique=True, default="noname")
    email = EmailField(allow_blank=True, label='Адрес электронной почты', max_length=254, required=True)

    class Meta:
        ordering = ["nick_name"]

    def __str__(self):
        return self.nick_name


class MomentModel(Model):
    title = CharField(max_length=50)

    content = CharField(max_length=1200)

    user = LowUserModel()

    date = DateTimeField(auto_now=True)

    image = ImageField()

    class Meta:
        ordering = ["date"]


class TagModel(Model):
    name = CharField(max_length=120)
