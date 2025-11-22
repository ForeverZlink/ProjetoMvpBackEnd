from django.contrib import admin
from eventos.models import Novidades


class NovidadesModelInline(admin.TabularInline):
    model = Novidades
    extra = 1


@admin.register(Novidades)
class NovidadesAdmin(admin.ModelAdmin):
    list_display = ("titulo", "parque", "ativo", "data_criacao", "vigencia_inicio", "vigencia_fim")
    search_fields = ("titulo", "descricao")
    ordering = ("titulo",)
    list_filter = ("ativo", "parque", "vigencia_inicio", "vigencia_fim")
    list_editable = ("ativo",)



