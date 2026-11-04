from rest_framework import serializers
from django.utils import timezone
from datetime import datetime
from .models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)
    class Meta:
        model = Medico
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class EstadoCitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCita
        fields = '__all__'

class CitaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombres', read_only=True)
    medico_nombre = serializers.CharField(source='medico.nombres', read_only=True)
    especialidad = serializers.CharField(source='medico.especialidad.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)

    class Meta:
        model = Cita
        fields = '__all__'

    def validate(self, data):
        # Verificar si es una actualización parcial (PATCH) donde no se envían estos campos
        fecha_cita = data.get('fecha')
        medico = data.get('medico')
        hora_cita = data.get('hora')

        # 1. Validación de fecha pasada (Solo si se está enviando o creando la fecha)
        if fecha_cita and fecha_cita < timezone.now().date():
            raise serializers.ValidationError({"fecha": "No se pueden programar citas en una fecha pasada."})

        # 2. Validación de horario ocupado para el mismo médico (Solo si se envían los tres campos)
        if medico and fecha_cita and hora_cita:
            id_cita = self.instance.id if self.instance else None
            citas_duplicadas = Cita.objects.filter(medico=medico, fecha=fecha_cita, hora=hora_cita)
            if id_cita:
                citas_duplicadas = citas_duplicadas.exclude(id=id_cita)

            if citas_duplicadas.exists():
                raise serializers.ValidationError({"hora": "El médico ya cuenta con una cita asignada en esa fecha y hora."})

        return data
