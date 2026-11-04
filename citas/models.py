from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import UniqueConstraint

class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Medico(models.Model):
    nombres = models.CharField(max_length=150)
    cmp = models.CharField(max_length=12, unique=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, related_name='medicos')
    telefono = models.CharField(max_length=20)
    correo = models.EmailField()

    def __str__(self):
        return f"{self.nombres} - CMP: {self.cmp}"

class Paciente(models.Model):
    dni = models.CharField(max_length=8, unique=True)
    nombres = models.CharField(max_length=150)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=20)
    correo = models.EmailField()

    def __str__(self):
        return f"{self.nombres} (DNI: {self.dni})"

class EstadoCita(models.Model):
    nombre = models.CharField(max_length=50, unique=True) # pendiente, confirmada, atendida, cancelada
    es_final = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class Cita(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='citas')
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.TextField()
    estado = models.ForeignKey(EstadoCita, on_delete=models.PROTECT)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['medico', 'fecha', 'hora'], name='unique_cita_medico_horario')
        ]

    def __str__(self):
        return f"Cita {self.id}: Paciente {self.paciente.nombres} con Dr(a). {self.medico.nombres}"

class HistoriaClinica(models.Model):
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name='historia_clinica')
    grupo_sanguineo = models.CharField(max_length=5)
    alergias = models.TextField(blank=True, null=True)
    antecedentes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Historia Clínica de {self.paciente.nombres}"
