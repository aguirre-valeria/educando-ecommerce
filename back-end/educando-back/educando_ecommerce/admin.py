from django.contrib import admin
from .models import  Rol,Usuario, Categoria,Curso, MisCurso, Carrito, Foro, Contacto
# Register your models here.

class RolAdmin(admin.ModelAdmin):   
    list_display = ('id_rol','nombre_rol','alta_rol','baja_rol')
class UsuarioAdmin(admin.ModelAdmin):   
    list_display = ('id_usuario','id_rol','email','nombre','apellido','password','fecha_alta_usuario')   
class CategoriaAdmin(admin.ModelAdmin): 
    list_display = ('id_categoria','nombre','descripcion')
class CursoAdmin(admin.ModelAdmin): 
    list_display = ('id_curso','id_categoria','nombre_curso','duracion','precio','descripcion','calificacion','fecha_alta_curso','imagen_url')
class MisCursoAdmin(admin.ModelAdmin): 
    list_display = ('id_mis_curso','id_usuario','id_curso',)
class CarritoAdmin(admin.ModelAdmin):   
    list_display = ('id_carrito','id_curso','nombre_curso','cantidad','total_suma')
class ForoAdmin(admin.ModelAdmin):   
    list_display = ('id_foro','id_usuarios','nombre','mensaje')
class ContactoAdmin(admin.ModelAdmin):   
    list_display = ('id_contacto','email','nombre','mensaje')
    
admin.site.register(Rol,RolAdmin)
admin.site.register(Usuario,UsuarioAdmin)
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(Curso,CursoAdmin)
admin.site.register(MisCurso,MisCursoAdmin)
admin.site.register(Carrito,CarritoAdmin)
admin.site.register(Foro,ForoAdmin)
admin.site.register(Contacto,ContactoAdmin)
    
   