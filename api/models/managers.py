from django.db import models

class DetalleManager(models.Manager):
    def detalle_por_mes(self):
        return self.filter(
            tipo_detalle=3
        )
    