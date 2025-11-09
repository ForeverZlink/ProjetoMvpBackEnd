from django.db import models
from datetime import timedelta

class Trilha(models.Model):
    class Dificuldade(models.IntegerChoices):
        FACIL = 1, 'Fácil'
        MODERADO = 2, 'Moderado'
        DIFICIL = 3, 'Difícil'

    nome_da_trilha = models.CharField(max_length=300, verbose_name="Nome da Trilha")
    distancia_da_trilha = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Distância (km)")
    parque = models.ForeignKey(
        'parques.Parque',   # <- nome do app + nome da classe
        on_delete=models.CASCADE,
        related_name='trilhas',
        verbose_name="Parque"
    )

    tempo_de_duracao = models.DurationField(
        help_text="Duração da atividade (ex: 1:30:00 = 1h30min)",
        verbose_name="Tempo de Duração"
    )
    dificuldade = models.IntegerField(
        choices=Dificuldade.choices,
        default=Dificuldade.MODERADO,
        verbose_name="Dificuldade"
    )
    percurso_google_maps = models.URLField(
        blank=True,
        null=True,
        help_text="Cole aqui o link do Google Maps (rota ou localização).",
        verbose_name="Percurso no Google Maps"
    )

    class Meta:
        verbose_name = "Trilha"
        verbose_name_plural = "Trilhas"
        ordering = ['nome_da_trilha']

    def __str__(self):
        return f"{self.nome_da_trilha} ({self.get_dificuldade_display()})"
