from rest_framework import viewsets 
from .serializer import  UsuarioSerializer, CategoriaSerializer, CursoSerializer, MisCursoSerializer, CarritoSerializer, ForoSerializer, ContactoSerializer
from .models import  Usuario, Categoria,Curso, MisCurso, Carrito, Foro, Contacto


class UsuarioViewSet(viewsets.ModelViewSet):    
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
class CategoriaViewSet(viewsets.ModelViewSet):   
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer  
class CursoViewSet(viewsets.ModelViewSet):  
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
class MisCursoViewSet(viewsets.ModelViewSet):   
    queryset = MisCurso.objects.all()
    serializer_class = MisCursoSerializer
class CarritoViewSet(viewsets.ModelViewSet):    
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
class ForoViewSet(viewsets.ModelViewSet):   
    queryset = Foro.objects.all()
    serializer_class = ForoSerializer
class ContactoViewSet(viewsets.ModelViewSet):   
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer  
