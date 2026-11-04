from rest_framework import viewsets
from .models import Especialidad, Medico, Paciente, Cita
from .serializers import EspecialidadSerializer, MedicoSerializer, PacienteSerializer, CitaSerializer

class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer
    filterset_fields = ['especialidad']

    def get_queryset(self):
        queryset = Medico.objects.all()
        especialidad_id = self.request.query_params.get('especialidad')
        if especialidad_id is not None:
            queryset = queryset.filter(especialidad_id=especialidad_id)
        return queryset

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer

    def get_queryset(self):
        queryset = Cita.objects.all()
        fecha = self.request.query_params.get('fecha')
        if fecha is not None:
            queryset = queryset.filter(fecha=fecha)
        return queryset
