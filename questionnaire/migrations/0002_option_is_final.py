# Generated by Django 4.2.17 on 2024-12-19 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='is_final',
            field=models.BooleanField(default=False),
        ),
    ]