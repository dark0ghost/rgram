from django.contrib import admin

# Register your models here.
from tech.models import MomentModel, LowUserModel, TagModel, CommentsModel, SubscribersModel

admin.site.register(MomentModel)
admin.site.register(LowUserModel)
admin.site.register(TagModel)
admin.site.register(CommentsModel)
admin.site.register(SubscribersModel)

