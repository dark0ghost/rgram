from rest_framework import serializers

from models import LowUserModel, MomentModel


class LowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LowUserModel
        fields = ("nick_name", "avatar", "short_name")


class MomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MomentModel
        fields = ("title", "content", "user", "date", "image")
