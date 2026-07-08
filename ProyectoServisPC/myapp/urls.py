from django.urls import path

from . import views

app_name = "myapp"
urlpatterns = [
    path('', views.index, name='index'),
    path('clientes/', views.clientes, name='clientes'),
    path('equipos/', views.equipos, name='equipos'),
    path('tecnicos/', views.tecnicos, name='tecnicos'),
    path('reparaciones/', views.reparaciones, name='reparaciones'),
    path('agregar_cliente/', views.agregar_cliente, name='agregar_cliente'),
    path('cliente/editar/<int:id>/', views.editar_cliente, name='editar_cliente'),
    path('cliente/eliminar/<int:id>/', views.eliminar_cliente, name='eliminar_cliente'),
]


