from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from citas.views import EspecialidadViewSet, MedicoViewSet, PacienteViewSet, CitaViewSet

router = DefaultRouter()
router.register(r'especialidades', EspecialidadViewSet)
router.register(r'medicos', MedicoViewSet, basename='medico')
router.register(r'pacientes', PacienteViewSet)
router.register(r'citas', CitaViewSet, basename='cita')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
