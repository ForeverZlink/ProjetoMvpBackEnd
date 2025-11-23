# app/views.py
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Parque
from .serializers import ParqueSerializer
from rest_framework import status

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

@extend_schema(tags=['Parques'])
class ParqueDetailView(APIView):
    def get(self, request, pk):
        try:
            parque = Parque.objects.get(pk=pk)
        except Parque.DoesNotExist:
            return Response({"detail": "Parque não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # ------------------------
        # 📌 Endereço
        # ------------------------
        endereco = None
        if parque.endereco:
            endereco = {
                "cep": parque.endereco.cep,
                "logradouro": parque.endereco.logradouro,
                "bairro": parque.endereco.bairro,
                "cidade": parque.endereco.cidade,
                "estado": parque.endereco.estado,
            }

        # ------------------------
        # 📌 Horários de funcionamento (lista)
        # ------------------------
        horarios = []
        for h in parque.horarios.all():
            horarios.append({
                "dia": h.get_dia_display(),
                "hora_abertura": h.hora_abertura.strftime("%H:%M"),
                "hora_fechamento": h.hora_fechamento.strftime("%H:%M"),
            })

        # ------------------------
        # 📌 Tags
        # ------------------------
        tags = [t.nome_da_tag for t in parque.tag.all()]

        # ------------------------
        # 📌 Montando a resposta final manualmente
        # ------------------------
        response = {
            "id": parque.id,
            "nome_do_parque": parque.nome_do_parque,
            "descricao": parque.descricao,
            "site": parque.site,
            "endereco": endereco,
            "horarios": horarios,
            "tags": tags,
        }

        return Response(response)
    
@extend_schema(tags=['Parques'])
class ParqueListView(APIView):
    def get(self, request):

        parques = Parque.objects.all()

        resultado = []

        for parque in parques:

            # Endereço
            endereco = None
            if parque.endereco:
                endereco = {
                    "cep": parque.endereco.cep,
                    "logradouro": parque.endereco.logradouro,
                    "bairro": parque.endereco.bairro,
                    "cidade": parque.endereco.cidade,
                    "estado": parque.endereco.estado,
                }

            # Horários
            horarios = [
                {
                    "dia": h.get_dia_display(),
                    "hora_abertura": h.hora_abertura.strftime("%H:%M"),
                    "hora_fechamento": h.hora_fechamento.strftime("%H:%M"),
                }
                for h in parque.horarios.all()
            ]

            # Tags
            tags = [t.nome_da_tag for t in parque.tag.all()]

            resultado.append({
                "id": parque.id,
                "nome_do_parque": parque.nome_do_parque,
                "descricao": parque.descricao,
                "site": parque.site,
                "endereco": endereco,
                "horarios": horarios,
                "tags": tags,
            })

        return Response(resultado)
