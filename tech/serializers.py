from rest_framework.serializers import ModelSerializer

from tech.models import LowUserModel, MomentModel, TagModel


class LowUserSerializer(ModelSerializer):
    class Meta:
        model = LowUserModel
        fields = ("nick_name", "avatar", "short_name")


class MomentSerializer(ModelSerializer):
    class Meta:
        model = MomentModel
        fields = ("title", "content", "user", "date", "image")


class TagSerializer(ModelSerializer):
    class Meta:
        model = TagModel
        fields = ("name",)
