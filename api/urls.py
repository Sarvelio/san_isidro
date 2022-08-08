from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewSet)
router.register(r'rol', viewsets.RolViewSet)
router.register(r'project_types', viewsets.ProjectTypesViewSet)
router.register(r'project', viewsets.ProjectViewSet)
router.register(r'department', viewsets.DepartmentViewSet)
router.register(r'city', viewsets.CityViewSet)
router.register(r'beneficiary', viewsets.BeneficiaryViewSet)
router.register(r'sponsor', viewsets.SponsorViewSet)
router.register(r'parent', viewsets.ParentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]