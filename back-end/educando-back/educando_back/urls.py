"""
URL configuration for educandoprueba12 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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

from django.urls import path, include
from rest_framework import routers
from educando_ecommerce import views
from rest_framework.documentation import include_docs_urls
from django.contrib import admin

router = routers.DefaultRouter()

router.register(r'usuarios', views.UsuarioViewSet)

router.register(r'categorias', views.CategoriaViewSet)
router.register(r'cursos', views.CursoViewSet)
router.register(r'miscursos', views.MisCursoViewSet)    
router.register(r'carritos', views.CarritoViewSet)
router.register(r'foros', views.ForoViewSet)
router.register(r'contactos', views.ContactoViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('docs/', include_docs_urls(title='appEducando')),
    path('admin/', admin.site.urls),
    ]