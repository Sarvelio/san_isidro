# Generated by Django 4.0.6 on 2022-08-13 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_detalle_proyecto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='rol',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Administrador'), (2, 'Cajero'), (0, 'Otro')], default=2),
        ),
        migrations.DeleteModel(
            name='Rol',
        ),
    ]