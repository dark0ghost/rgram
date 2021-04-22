from django.contrib.auth.models import User
from django.db.models import Model, CharField, DateTimeField, ImageField, ForeignKey, CASCADE, ManyToManyField
from rest_framework.fields import EmailField


class LowUserModel(User):
    nick_name = CharField(max_length=30)
    avatar = ImageField(default='templates/deficon.png')
    short_name = CharField(max_length=120, unique=True, default="noname")
    email = EmailField(allow_blank=True, label='Адрес электронной почты', max_length=254, required=True)

    class Meta:
        ordering = ["short_name"]

    def __str__(self):
        return self.nick_name


class MomentModel(Model):
    title = CharField(max_length=50)
    content = CharField(max_length=1200)
    user = ForeignKey(LowUserModel, on_delete=CASCADE)
    date = DateTimeField(auto_now=True)
    image = ImageField()

    class Meta:
        ordering = ["date"]


class TagModel(Model):
    name = CharField(max_length=120)


class Subscribers(Model):
    author = ForeignKey(LowUserModel, on_delete=CASCADE, related_name='user', unique=True)
    follows = ManyToManyField("self", related_name='follows')
