from django.urls import path

from . import views

app_name = "myapp"
urlpatterns = [
    path('', views.index, name='index'),
    path('clientes/', views.clientes, name='clientes'),
    path('equipos/', views.equipos, name='equipos'),
    path('tecnicos/', views.tecnicos, name='tecnicos'),
    path('reparaciones/', views.reparaciones, name='reparaciones')
]