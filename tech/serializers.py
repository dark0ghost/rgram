from django.db.models import ManyToManyField
from rest_framework.fields import ReadOnlyField
from rest_framework.relations import StringRelatedField, PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField, EmailField, ImageField
from rest_framework_jwt.settings import api_settings

from tech.models import MomentModel, LowUserModel, TagModel, CommentsModel


class UserSerializer(ModelSerializer):
    class Meta:
        model = LowUserModel
        fields = ('username', 'name', 'avatar')


class TagSerializer(ModelSerializer):
    name = CharField(max_length=50)

    class Meta:
        model = TagModel
        fields = ('name',"id")


class UserSerializerWithToken(ModelSerializer):
    token = SerializerMethodField(read_only=True)
    password = CharField(max_length=128,
                         min_length=8,
                         write_only=True)
    email = EmailField(write_only=True)
    username = CharField()
    name = CharField()
    avatar = ImageField(use_url=True, default='templates/deficon.png')

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
    owner = UserSerializer()
    likes = UserSerializer(many=True, default=[], read_only=True)
    tags = TagSerializer(many=True, default={}, read_only=True)
    comments = PrimaryKeyRelatedField(many=True, read_only=True)

    @staticmethod
    def get_user(obj):
        return UserSerializer(obj.user).data

    class Meta:
        model = MomentModel
        fields = '__all__'


class MomentsWriteSerializer(ModelSerializer):
    user = ReadOnlyField(source='owner.username')
    comments = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = MomentModel
        fields = '__all__'


class UserSerializerWithMoment(ModelSerializer):
    moments = PrimaryKeyRelatedField(many=True, read_only=True)
    comments = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = LowUserModel
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = CommentsModel
        fields = ['id', 'text', 'owner', 'moment']


"""class TagWriteSerializerWithMoment(ModelSerializer):
    name = CharField(max_length=100, blank=False, default='')
    moment = ManyToManyField(MomentModel, related_name='tag', blank=True)"""
