from django.contrib import admin
from .models import Trilha


@admin.register(Trilha)
class TrilhaAdmin(admin.ModelAdmin):
    list_display = (
        "nome_da_trilha",
        "parque",
        "distancia_da_trilha",
        "dificuldade",
        "tempo_de_duracao",
    )
    list_filter = ("parque", "dificuldade")
    search_fields = ("nome_da_trilha",)
