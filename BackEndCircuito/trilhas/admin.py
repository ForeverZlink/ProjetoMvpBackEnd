from django.contrib import admin

from trilhas.models import Trilha

# Register your models here.
@admin.register(Trilha)
class TrilhaAdmin(admin.ModelAdmin):
    list_display = ("nomeDaTrilha", "parque", "distanciaDaTrilha", "dificuldade", "tempoDeDuracao")
    list_filter = ("parque", "dificuldade")
    search_fields = ("nomeDaTrilha",)
