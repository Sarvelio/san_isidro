from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewSet)
router.register(r'servicio', viewsets.ServicioViewSet)
router.register(r'usuario', viewsets.UsuarioViewSet)
router.register(r'sector', viewsets.SectorViewSet)
router.register(r'configuracion', viewsets.ConfiguracionViewSet)
router.register(r'proyecto', viewsets.ProyectoViewSet)
router.register(r'detalles', viewsets.DetalleViewSet)
router.register(r'pagos', viewsets.PagoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]