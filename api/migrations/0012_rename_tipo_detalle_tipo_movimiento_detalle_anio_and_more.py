# Generated by Django 4.0.6 on 2022-08-18 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_pago'),
    ]

    operations = [
        migrations.RenameField(
            model_name='detalle',
            old_name='tipo',
            new_name='tipo_movimiento',
        ),
        migrations.AddField(
            model_name='detalle',
            name='anio',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='detalle',
            name='mes',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Enero'), (2, 'Febrero'), (3, 'Marzo'), (4, 'Abril'), (5, 'Mayo'), (6, 'Junio'), (7, 'Julio'), (8, 'Agosto'), (9, 'Septiembre'), (10, 'Octubre'), (11, 'Noviembre'), (12, 'Diciembre')], null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='servicio',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pagos', to='api.servicio'),
        ),
        migrations.AddField(
            model_name='detalle',
            name='tipo_detalle',
            field=models.IntegerField(choices=[(3, 'Proyecto'), (6, 'Pago'), (9, 'Caja')], default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='detalle',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='detalle',
            name='proyecto',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='detalles', to='api.proyecto'),
        ),
        migrations.DeleteModel(
            name='Pago',
        ),
    ]