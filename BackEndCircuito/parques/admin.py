from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Endereco, HorarioFuncionamento, Parque, Trilha


class EnderecoInline(admin.StackedInline):
    model = Endereco
    extra = 0
    can_delete = False


class HorarioFuncionamentoInline(admin.TabularInline):
    model = HorarioFuncionamento
    extra = 1


@admin.register(Parque)
class ParqueAdmin(admin.ModelAdmin):
    list_display = ("nomeDoParque", "descricao", "site")
    search_fields = ("nomeDoParque", "descricao")
    inlines = [EnderecoInline, HorarioFuncionamentoInline]


@admin.register(Endereco)
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ("cep", "logradouro", "bairro", "cidade", "estado")
    search_fields = ("cep", "logradouro", "bairro", "cidade")
    list_filter = ("estado",)


@admin.register(HorarioFuncionamento)
class HorarioFuncionamentoAdmin(admin.ModelAdmin):
    list_display = ("parque", "dia", "hora_abertura", "hora_fechamento")
    list_filter = ("dia", "parque")
    ordering = ("parque", "dia")


