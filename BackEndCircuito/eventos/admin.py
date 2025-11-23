from django.contrib import admin
from eventos.models import Novidade,TagNovidade


class NovidadeModelInline(admin.TabularInline):
    model = Novidade
    extra = 1
@admin.register(TagNovidade)
class TagNovidadeAdmin(admin.ModelAdmin):
    list_display = ("nome_da_tag",)
    search_fields = ("nome_da_tag",)


@admin.register(Novidade)
class NovidadesAdmin(admin.ModelAdmin):
    list_display = ("titulo", "parque", "ativo", "data_criacao", "vigencia_inicio", "vigencia_fim")
    search_fields = ("titulo", "descricao")
    ordering = ("titulo",)
    list_filter = ("ativo", "parque", "vigencia_inicio", "vigencia_fim")
    list_editable = ("ativo",)
  


