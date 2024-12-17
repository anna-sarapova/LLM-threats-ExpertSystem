# Generated by Django 4.2.17 on 2024-12-16 20:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0002_threat_impact_threat_mitigation_alter_option_threat'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='answer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='questionnaire.threat'),
        ),
        migrations.AddField(
            model_name='question',
            name='is_final',
            field=models.BooleanField(default=False),
        ),
    ]