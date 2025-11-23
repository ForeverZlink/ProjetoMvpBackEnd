from rest_framework import routers
from .views import ParqueViewSet

parques_router = routers.DefaultRouter()
parques_router.register(r'parques', ParqueViewSet)
