# Generated by Django 4.1.13 on 2024-04-18 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_signuptable_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='signuptable',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
