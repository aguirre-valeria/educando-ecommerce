from django.urls import path, include
from rest_framework import routers
from educando_ecommerce import views

router = routers.DefaultRouter()
router.register(r'Usuario', views.UsuarioViewSet)
router.register(r'Categoria', views.CategoriaViewSet)
router.register(r'Curso', views.CursoViewSet)
router.register(r'MisCurso', views.MisCursoViewSet)
router.register(r'Carrito', views.CarritoViewSet)
router.register(r'Foro', views.ForoViewSet)
router.register(r'Contacto', views.ContactoViewSet)

urlpatterns = [
    path('', include(router.urls)),

]