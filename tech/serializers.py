from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_jwt.settings import api_settings
from tech.models import MomentModel, TagModel, LowUserModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LowUserModel
        fields = ('nick_name', 'short_name')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    @staticmethod
    def get_token(obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = LowUserModel
        fields = ('token', 'username', 'password', "email")


class MomentSerializer(ModelSerializer):
    class Meta:
        model = MomentModel
        fields = ("title", "content", "user", "date", "image")


class TagSerializer(ModelSerializer):
    class Meta:
        model = TagModel
        fields = ("name",)
