from django.contrib.auth.models import User
from django.db.models import Model, CharField, DateTimeField
from django.forms import ImageField


class LowUserModel(User, Model):
    nick_name = CharField(max_length=30)

    avatar = ImageField()

    short_name = CharField(max_length=120, unique=True)

    class Meta:
        ordering = ["nick_name"]

    def __str__(self):
        return self.nick_name


class MomentModel(Model):
    title = CharField(max_length=50)

    content = CharField(max_length=1200)

    user = LowUserModel()

    date = DateTimeField()

    image = ImageField()

    class Meta:
        ordering = ["date"]


class TagModel(Model):
    name = CharField(max_length=120)
