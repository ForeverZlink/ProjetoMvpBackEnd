from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Novidade

@extend_schema(tags=['Novidades'])
class NovidadeDetailView(APIView):
    def get(self, request, pk):
        try:
            n = Novidade.objects.get(pk=pk)
        except Novidade.DoesNotExist:
            return Response({"detail": "Novidade não encontrada"}, status=status.HTTP_404_NOT_FOUND)

        response = {
            "id": n.id,
            "titulo": n.titulo,
            "descricao": n.descricao,
            "parque": {
                "id": n.parque.id,
                "nome_do_parque": n.parque.nome_do_parque,
            } if n.parque else None,
            "data_criacao": n.data_criacao.strftime("%Y-%m-%d %H:%M:%S") if n.data_criacao else None,
            "data_publicacao": n.data_publicacao.strftime("%Y-%m-%d") if n.data_publicacao else None,
            "vigencia_inicio": n.vigencia_inicio.strftime("%Y-%m-%d") if n.vigencia_inicio else None,
            "vigencia_fim": n.vigencia_fim.strftime("%Y-%m-%d") if n.vigencia_fim else None,
            "ativo": n.ativo
        }

        return Response(response, status=status.HTTP_200_OK)

@extend_schema(tags=['Novidades'])
class NovidadesListView(APIView):
    def get(self, request):
        novidades = Novidade.objects.filter(ativo=True).order_by('-data_publicacao', '-data_criacao')
        response = []

        for n in novidades:
            response.append({
                "id": n.id,
                "titulo": n.titulo,
                "descricao": n.descricao,
                "parque": {
                    "id": n.parque.id,
                    "nome_do_parque": n.parque.nome_do_parque,
                } if n.parque else None,
                "data_criacao": n.data_criacao.strftime("%Y-%m-%d %H:%M:%S") if n.data_criacao else None,
                "data_publicacao": n.data_publicacao.strftime("%Y-%m-%d") if n.data_publicacao else None,
                "vigencia_inicio": n.vigencia_inicio.strftime("%Y-%m-%d") if n.vigencia_inicio else None,
                "vigencia_fim": n.vigencia_fim.strftime("%Y-%m-%d") if n.vigencia_fim else None,
                "ativo": n.ativo
            })

        return Response(response, status=status.HTTP_200_OK)
