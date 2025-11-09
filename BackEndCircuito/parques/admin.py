from django.contrib import admin
from .models import Endereco, HorarioFuncionamento, Parque,Tag


# Exibição de horários diretamente dentro do parque
class HorarioFuncionamentoInline(admin.TabularInline):
    model = HorarioFuncionamento
    extra = 1
class TagInline(admin.TabularInline):
    model = Tag
    extra = 1


@admin.register(Parque)
class ParqueAdmin(admin.ModelAdmin):
    list_display = ("nome_do_parque", "descricao", "site", "get_endereco_resumido")
    search_fields = ("nome_do_parque", "descricao")
    inlines = [HorarioFuncionamentoInline,TagInline]

    def get_endereco_resumido(self, obj):
        """Exibe o endereço de forma resumida na lista."""
        if obj.endereco:
            return f"{obj.endereco.cidade}/{obj.endereco.estado}"
        return "-"
    get_endereco_resumido.short_description = "Endereço"


@admin.register(Endereco)
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ("cep", "logradouro", "bairro", "cidade", "estado")
    search_fields = ("cep", "logradouro", "bairro", "cidade")
    list_filter = ("estado",)

@admin.register(Tag)
class Tag(admin.ModelAdmin):
    list_display = ("nome_da_tag","parque")
    search_fields = ("nome_da_tag","parque")
    list_filter = ("nome_da_tag","parque")


@admin.register(HorarioFuncionamento)
class HorarioFuncionamentoAdmin(admin.ModelAdmin):
    list_display = ("parque", "dia", "hora_abertura", "hora_fechamento")
    list_filter = ("dia", "parque")
    ordering = ("parque", "dia")
