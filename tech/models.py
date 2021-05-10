from django.contrib.auth.models import AbstractUser
from django.db.models import Model, CharField, DateTimeField, ImageField, ForeignKey, CASCADE, ManyToManyField, \
    OneToOneField


class LowUserModel(AbstractUser):
    avatar = ImageField(default='templates/deficon.png', upload_to='nginx/')
    name = CharField(max_length=120)

    class Meta:
        ordering = ["username"]
        swappable = 'AUTH_USER_MODEL'

    def __str__(self):
        return self.username


class TagModel(Model):
    name = CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class MomentModel(Model):
    title = CharField(max_length=50)
    content = CharField(max_length=1200)
    user = ForeignKey(LowUserModel,related_name='moment', on_delete=CASCADE)
    date = DateTimeField(auto_now=True)
    image = ImageField(upload_to='templates/')
    tags = ManyToManyField(TagModel, default=None, related_name='MomentModel_tags')
    likes = ManyToManyField(LowUserModel, related_name='blogpost_like', default=None)

    def number_of_likes(self):
        return self.likes.count()

    class Meta:
        ordering = ["date"]

    def __str__(self):
        return self.title


class SubscribersModel(Model):
    author = OneToOneField(LowUserModel, on_delete=CASCADE, related_name='user', unique=True)
    follows = ManyToManyField("self", related_name='follows')


class CommentsModel(Model):
    user = ForeignKey(LowUserModel, on_delete=CASCADE)
    text = CharField(max_length=1200)
    date = DateTimeField(auto_now=True)
    momemt = ForeignKey(MomentModel, on_delete=CASCADE)

    def __str__(self):
        return self.text
