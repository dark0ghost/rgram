from django.contrib.auth.models import AbstractUser
from django.db.models import Model, CharField, DateTimeField, ImageField, ForeignKey, CASCADE, ManyToManyField, \
    OneToOneField
from taggit.managers import TaggableManager


class LowUserModel(AbstractUser):
    avatar = ImageField(default='templates/deficon.png')
    name = CharField(max_length=120)

    class Meta:
        ordering = ["username"]
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.username

    def set_email(self, val):
        setattr(self, "email", val)


class MomentModel(Model):
    title = CharField(max_length=50)
    content = CharField(max_length=1200)
    user = ForeignKey(LowUserModel, on_delete=CASCADE)
    date = DateTimeField(auto_now=True)
    image = ImageField()
    tags = TaggableManager()

    class Meta:
        ordering = ["date"]


class Subscribers(Model):
    author = OneToOneField(LowUserModel, on_delete=CASCADE, related_name='user', unique=True)
    follows = ManyToManyField("self", related_name='follows')
