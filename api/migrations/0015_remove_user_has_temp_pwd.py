# Generated by Django 4.0.6 on 2022-09-02 23:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_servicio_mes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='has_temp_pwd',
        ),
    ]