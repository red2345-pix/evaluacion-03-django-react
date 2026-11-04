from django.contrib import admin
from .models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica

# Registro de todos los modelos para que aparezcan en el panel visual
admin.site.register(Especialidad)
admin.site.register(Medico)
admin.site.register(Paciente)
admin.site.register(EstadoCita)
admin.site.register(Cita)
admin.site.register(HistoriaClinica)
