# Generated by Django 3.2 on 2021-05-21 19:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tech', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscribersmodel',
            name='follows',
            field=models.ManyToManyField(default=None, related_name='follows', to=settings.AUTH_USER_MODEL),
        ),
    ]
