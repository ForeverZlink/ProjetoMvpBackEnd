from django.db import models
from django.core.exceptions import ValidationError  # <-- use o ValidationError do Django, não o do jsonschema
import requests


# ------------------------------
# 📍 Endereço
# ------------------------------
class Endereco(models.Model):   
    cep = models.CharField(max_length=9, help_text="Formato: 00000-000")
    logradouro = models.CharField(max_length=200, blank=True, null=True)
    bairro = models.CharField(max_length=200, blank=True, null=True)
    cidade = models.CharField(max_length=200, blank=True, null=True)
    estado = models.CharField(max_length=2, blank=True, null=True)

    def save(self, *args, **kwargs):
        cep_limpo = self.cep.replace("-", "").strip()

        if len(cep_limpo) == 8:
            try:
                response = requests.get(f"https://viacep.com.br/ws/{cep_limpo}/json/")
                response.raise_for_status()
                data = response.json()

                if not data.get("erro"):
                    self.logradouro = data.get("logradouro", "")
                    self.bairro = data.get("bairro", "")
                    self.cidade = data.get("localidade", "")
                    self.estado = data.get("uf", "")
                else:
                    raise ValidationError("CEP não encontrado.")
            except requests.RequestException:
                raise ValidationError("Falha ao conectar ao serviço de CEP.")
        else:
            raise ValidationError("CEP inválido. Use o formato 00000-000 ou 8 dígitos.")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.logradouro or ''}, {self.bairro or ''} - {self.cidade or ''}/{self.estado or ''}"


# ------------------------------
# 🕒 Horário de Funcionamento
# ------------------------------
class HorarioFuncionamento(models.Model):
    DIAS_DA_SEMANA = [
        ('SEG', 'Segunda-feira'),
        ('TER', 'Terça-feira'),
        ('QUA', 'Quarta-feira'),
        ('QUI', 'Quinta-feira'),
        ('SEX', 'Sexta-feira'),
        ('SAB', 'Sábado'),
        ('DOM', 'Domingo'),
    ]

    dia = models.CharField(max_length=3, choices=DIAS_DA_SEMANA)
    hora_abertura = models.TimeField()
    hora_fechamento = models.TimeField()
    parque = models.ForeignKey(
        'Parque',
        on_delete=models.CASCADE,
        related_name='horarios',
        null=False,
        blank=False
    )

    class Meta:
        verbose_name = "Horário de Funcionamento"
        verbose_name_plural = "Horários de Funcionamento"
        ordering = ['dia']

    def __str__(self):
        return f"{self.get_dia_display()}: {self.hora_abertura.strftime('%H:%M')} - {self.hora_fechamento.strftime('%H:%M')}"


# ------------------------------
# 🏞️ Parque
# ------------------------------
class TagParque(models.Model):
    nome_da_tag = models.CharField(max_length=300, blank=False, verbose_name="Tag")

    def __str__(self):
        return self.nome_da_tag
    
class Parque(models.Model):
    nome_do_parque = models.CharField(max_length=300, verbose_name="Nome do Parque")
    descricao = models.TextField(blank=True, null=True)
    site = models.URLField(blank=True, null=True)
    endereco = models.OneToOneField(
        'Endereco',
        on_delete=models.CASCADE,
        related_name='parque'
    )
    
    tags = models.ManyToManyField(TagParque, related_name='parques', blank=True)
    class Meta:
        verbose_name = "Parque"
        verbose_name_plural = "Parques"
        ordering = ['nome_do_parque']

    def __str__(self):
        return self.nome_do_parque
