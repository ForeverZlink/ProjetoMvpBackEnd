from django.db import models

# Create your models here.
from django.db import models


class Novidades(models.Model):
    titulo = models.CharField(max_length=300, verbose_name="Título")
    descricao = models.TextField(verbose_name="Descrição")

    parque = models.ForeignKey(
        'parques.Parque',
        on_delete=models.CASCADE,
        related_name='novidades',
        verbose_name="Parque"
    )

    # ✔ Data em que a novidade foi criada
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de criação")

    # ✔ Início da vigência
    vigencia_inicio = models.DateField(verbose_name="Início da vigência", null=True, blank=True)

    # ✔ Fim da vigência
    vigencia_fim = models.DateField(verbose_name="Fim da vigência", null=True, blank=True)

    # ✔ Se a novidade está ativa ou não
    ativo = models.BooleanField(default=True, verbose_name="Ativo")

    class Meta:
        verbose_name = "Novidade"
        verbose_name_plural = "Novidades"
        ordering = ['titulo']

    def __str__(self):
        return self.titulo


