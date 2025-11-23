# app/views.py
from rest_framework import viewsets
from .models import Parque
from .serializers import ParqueSerializer
from drf_spectacular.utils import extend_schema, extend_schema_view

@extend_schema(tags=['Parques'])
@extend_schema_view(
    list=extend_schema(
        summary="Listar Parques",
        description="Retorna todos os parques cadastrados.",
    ),
    retrieve=extend_schema(
        summary="Detalhar Parque",
        description="Retorna os dados de um parque específico.",
    ),
)
class ParqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Parque.objects.all()
    serializer_class = ParqueSerializer