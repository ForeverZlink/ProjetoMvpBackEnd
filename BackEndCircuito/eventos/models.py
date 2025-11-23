from django.db import models

# Create your models here.
from django.db import models


# App: novidades
class TagNovidade(models.Model):
    nome_da_tag = models.CharField(max_length=300, blank=False, verbose_name="Tag")

    def __str__(self):
        return self.nome_da_tag

class Novidade(models.Model):
    titulo = models.CharField(max_length=300, verbose_name="Título")
    descricao = models.TextField(verbose_name="Descrição")
    parque = models.ForeignKey(
        'parques.Parque',
        on_delete=models.CASCADE,
        related_name='novidades',
        verbose_name="Parque"
    )
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de criação")
    data_publicacao = models.DateField(verbose_name="Data de publicação", null=True, blank=True)
    vigencia_inicio = models.DateField(verbose_name="Início da vigência", null=True, blank=True)
    vigencia_fim = models.DateField(verbose_name="Fim da vigência", null=True, blank=True)
    ativo = models.BooleanField(default=True, verbose_name="Ativo")

    # Relação Many-to-Many com as tags do mesmo app
    tags = models.ManyToManyField(TagNovidade, related_name='novidades', blank=True)

    def __str__(self):
        return self.titulo
