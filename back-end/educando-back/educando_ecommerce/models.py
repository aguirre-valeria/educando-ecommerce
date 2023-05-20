from django.db import models

# Create your models here.
  
class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField( max_length=50, null=True)
    alta_rol = models.DateTimeField(null=True)
    baja_rol = models.DateTimeField(null=True, default=None, blank=True)
    class Meta:
        db_table = 'rol'
        verbose_name = 'Rol de usuario'
        verbose_name_plural = 'Roles de usuarios'
    def __unicode__(self):
        return self.id_rol
    def __str__(self) :
        return str(self.id_rol)


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True, related_name='usuario_rol')
    email = models.CharField(max_length=250, null=True)
    nombre = models.CharField(max_length=80, null=True)
    apellido = models.CharField(max_length=80, null=True)
    password = models.CharField(max_length=45, null=True)
    fecha_alta_usuario = models.DateTimeField(null=True, auto_now_add=True)
    fecha_baja_usuario = models.DateTimeField(null=True, default=None, blank=True)

    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuario registrado mediante el front'
        verbose_name_plural = 'Usuarios registrados mediante el front'

    def __str__(self):
        return str(self.id_usuario)

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, null=True)
    descripcion = models.CharField(max_length=45, null=True)
    class Meta:
        db_table = 'categoria'
        verbose_name = 'Categoria de curso'
        verbose_name_plural = 'Categorias de cursos'
        
    def __unicode__(self):
        return self.id_categoria
    def __str__(self) :
        return str(self.id_categoria)

class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, null=True, related_name='cursos_categoria')
    nombre_curso = models.CharField(max_length=80, null=True)
    duracion = models.IntegerField(null=True)
    precio = models.IntegerField(null=True)
    calificacion= models.FloatField( null=True,default=None)
    fecha_alta_curso = models.DateTimeField(null=True, auto_now_add=True)
    imagen_url = models.URLField(null=True,max_length=500)
    class Meta:
        db_table = 'curso'
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
        
    def __unicode__(self):
        return self.id_curso
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
        
    def __unicode__(self):
        return self.id_mis_curso
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
    
    def __unicode__(self):
        return self.id_carrito
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
    
    def __unicode__(self):
        return self.id_foro
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
    
    def __unicode__(self):
        return self.id_contacto
    def __str__(self) :
        return str( self.id_contacto)