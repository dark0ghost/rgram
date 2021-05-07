from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField, EmailField, ImageField
from rest_framework_jwt.settings import api_settings
from tech.models import MomentModel, LowUserModel, TagModel


class UserSerializer(ModelSerializer):
    class Meta:
        model = LowUserModel
        fields = ('username', 'name', 'avatar')


class TagSerializer(ModelSerializer):
    class Meta:
        model = TagModel
        fields = ('name',)


class UserSerializerWithToken(ModelSerializer):
    token = SerializerMethodField(read_only=True)
    password = CharField(max_length=128,
                         min_length=8,
                         write_only=True)
    email = EmailField(write_only=True)
    username = CharField()
    name = CharField()
    avatar = ImageField(use_url=True)

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
        fields = ('token', 'username', 'password', "email", "avatar", "name")


class MomentSerializer(ModelSerializer):
    user = StringRelatedField(many=False)
    likes = StringRelatedField(many=True)
    tags = StringRelatedField(many=True)

    class Meta:
        model = MomentModel
        fields = '__all__'

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        instance = self.Meta.model(**validated_data)
        for i in tags_data:
            name = TagModel.objects.get_or_create(name=i["name"])
            instance.tags.add(name)
        return MomentModel.objects.create(**validated_data)
