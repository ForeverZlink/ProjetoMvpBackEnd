"""
URL configuration for BackEndCircuito project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from parques.views import ParqueDetailView, ParqueViewSet,ParqueListView
from eventos.views import NovidadesListView,NovidadeDetailView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from parques.routers import parques_router


urlpatterns = [
    path('admin/', admin.site.urls),

    # Schema
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI
    path(
        'swagger/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui',
    ),

    # API
    path('api/', include(parques_router.urls)),
    path("api/parques/<int:pk>/completo/", ParqueDetailView.as_view()),
    path("api/parques/all/completo/", ParqueListView.as_view()),
    path("api/novidades/<int:pk>/completo/", NovidadeDetailView.as_view()),
    path("api/novidades/all/completo/", NovidadesListView.as_view()),
]
