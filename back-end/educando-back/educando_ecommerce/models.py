from django.db import models
from django.contrib.auth.models import (AbstractBaseUser,PermissionsMixin,BaseUserManager,Group)

# Create your models here.
  
class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField( max_length=50, null=True)
    alta_rol = models.DateTimeField(null=True)
    baja_rol = models.DateTimeField(null=True, default=None, blank=True)
    grupos = models.ManyToManyField(Group, related_name ='roles')
    class Meta:
        db_table = 'rol'
        verbose_name = 'Rol de usuario'
        verbose_name_plural = 'Roles de usuarios'

    def __str__(self) :
        return str(self.id_rol)


#===========================================================================================================================================================================

class UserManager(BaseUserManager): #BaseUserManager proporciona un método llamado create_user que te permite crear y guardar un nuevo usuario en la base de datos. 
    def create_user(self, email, password, id_rol_id, **extra_fields):
        if not email:
            raise ValueError('Falta e-mail')
        if not password:
            raise ValueError('Falta ingresar password')
        user = self.model(email=email, id_rol_id=id_rol_id, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):

        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
      
class Usuario(AbstractBaseUser,PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True, related_name='usuario_rol')
    email = models.CharField(unique = True, max_length=250, null=True)
    nombre = models.CharField(max_length=80, null=True)
    apellido = models.CharField(max_length=80, null=True)
    password = models.CharField(max_length=100, null=True)
    fecha_alta_usuario = models.DateTimeField(null=True, auto_now_add=True)
    fecha_baja_usuario = models.DateTimeField(null=True, default=None, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # Configura el administrador de usuarios personalizado
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =  ['password']
    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuario registrado mediante el front'
        verbose_name_plural = 'Usuarios registrados mediante el front'

    def str(self):
        return str(self.id_usuario)

#===========================================================================================================================================================================

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=True)
    descripcion = models.CharField(max_length=250, null=True)
    class Meta:
        db_table = 'categoria'
        verbose_name = 'Categoria de curso'
        verbose_name_plural = 'Categorias de cursos'
        
    def __str__(self) :
        return str(self.id_categoria)

class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, null=True, related_name='cursos_categoria')
    nombre_curso = models.CharField(max_length=80, null=True)
    duracion = models.IntegerField(null=True)
    precio = models.IntegerField(null=True)
    descripcion = models.CharField(max_length= 2000, null=True)
    calificacion= models.FloatField( null=True,default=None)
    fecha_alta_curso = models.DateTimeField(null=True, auto_now_add=True)
    imagen_url = models.URLField(null=True,max_length=500)
    class Meta:
        db_table = 'curso'
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
        
    def __str__(self):
        return str(self.id_curso)


class MisCurso(models.Model):
    id_mis_curso = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE, null=True, related_name='mis_curso_cursos')
    class Meta:
        db_table = 'mis_curso'
        verbose_name = 'Mi Curso comprado'
        verbose_name_plural = 'Mis Cursos comprados'
        
    def __str__(self) :
        return str(self.id_mis_curso)

class Carrito(models.Model):
    id_carrito = models.AutoField(primary_key=True)
    id_curso = models.ForeignKey(Curso, on_delete=models.CASCADE, null=True)
    nombre_curso = models.CharField(max_length=80, null=True)
    cantidad = models.IntegerField(null=True)
    total_suma = models.FloatField(null=True)
    class Meta:
        db_table = 'carrito'
        verbose_name = 'Curso seleccionado para comprar'
        verbose_name_plural = 'Cursos seleccionados para comprar'
    
    def __str__(self) :
        return str(self.id_carrito)

class Foro(models.Model):
    id_foro = models.AutoField(primary_key=True)
    id_usuarios = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True, related_name='foro_rol')
    nombre = models.CharField(max_length=80, null=True)
    mensaje = models.CharField(max_length=500, null=True)
    class Meta:
        db_table = 'foro'
        verbose_name = 'Foro de consulta'
        verbose_name_plural = 'Foros de consultas'
    
    def __str__(self) :
        return str(self.id_foro)

class Contacto(models.Model):
    id_contacto = models.AutoField(primary_key=True,default=None)  
    email = models.CharField(max_length=250, null=True)
    nombre = models.CharField(max_length=80, null=True)
    mensaje = models.CharField(max_length=500, null=True)

    class Meta:
        db_table = 'contacto'
        verbose_name = 'Consulta de usuario'
        verbose_name_plural = 'Consultas de usuarios'
    
    def __str__(self) :
        return str( self.id_contacto)