from django.contrib import admin

# Register your models here.
from tech.models import MomentModel, LowUserModel, TagModel

admin.site.register(MomentModel)
admin.site.register(LowUserModel)
admin.site.register(TagModel)
