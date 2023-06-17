from django.urls import path, include
from rest_framework import routers
from educando_ecommerce import views

# Definición del enrutador
router = routers.DefaultRouter()
router.register(r'categoria', views.CategoriaViewSet, basename='categoria')
router.register(r'curso', views.CursoViewSet, basename='curso')
router.register(r'carrito', views.CarritoViewSet, basename='carrito')
router.register(r'foro', views.ForoViewSet, basename='foro')
router.register(r'contacto', views.ContactoViewSet, basename='contacto')

# URLs de la aplicación
urlpatterns = [
    # Incluir las URLs del enrutador
    path('', include(router.urls)),
    
    # URL para la vista de inicio de sesión
    path('login/', views.UsuarioView.as_view({'post': 'inicio_sesion'}), name='login'),
    
    # URL para la vista de creación de usuario
    path('registro/', views.UsuarioView.as_view({'post': 'create_user'}), name='crear_usuario'),
    
    # URL para la vista de lista de usuarios
    path('usuarios/', views.UsuarioView.as_view({'get': 'list_users'}), name='lista_usuarios'),
    
    # URL para la vista de mis cursos
    path('mis_cursos/', views.MisCursosView.as_view(), name='mis_cursos'),
    
    # URL para la vista de adquirir curso
    path('adquirir_curso/', views.AdquirirCursoView.as_view(), name='adquirir_curso'),

     # URL para la vista que muestra los cursos segun la categoria
    path('por_categoria/<int:categoria_id>/', views.CursosPorCategoriaView.as_view(), name='cursos_por_categoria'),

]