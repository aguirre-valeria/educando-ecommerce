from django.urls import path, include
from rest_framework import routers
from educando_ecommerce import views

# Definición del enrutador
router = routers.DefaultRouter()
router.register(r'Categoria', views.CategoriaViewSet, basename='categoria')
router.register(r'Curso', views.CursoViewSet, basename='curso')
router.register(r'Carrito', views.CarritoViewSet, basename='carrito')
router.register(r'Foro', views.ForoViewSet, basename='foro')
router.register(r'Contacto', views.ContactoViewSet, basename='contacto')

# URLs de la aplicación
urlpatterns = [
    # Incluir las URLs del enrutador
    path('', include(router.urls)),
    
    # URL para la vista de inicio de sesión
    path('Login/', views.UsuarioView.as_view({'post': 'inicio_sesion'}), name='login'),
    
    # URL para la vista de creación de usuario
    path('Registro/', views.UsuarioView.as_view({'post': 'create_user'}), name='crear_usuario'),
    
    # URL para la vista de lista de usuarios
    path('Usuarios/', views.UsuarioView.as_view({'get': 'list_users'}), name='lista_usuarios'),
    
    # URL para la vista de mis cursos
    path('Mis_cursos/', views.MisCursosView.as_view(), name='mis_cursos'),
    
    # URL para la vista de adquirir curso
    path('Adquirir_curso/', views.AdquirirCursoView.as_view(), name='adquirir_curso'),
]