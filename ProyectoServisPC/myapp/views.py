from django.shortcuts import render, redirect
from .models import Cliente, Tecnico, Equipo, Reparacion
from .forms import ClientesFormulario

# Create your views here.
def index(request):
    context = {"mensaje":"Ofrecemos servicios de reparación de computadoras, mantenimiento y soporte técnico."}
    return render(request,"myapp/index.html",context)

def clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'myapp/clientes.html', {'clientes': clientes})

def equipos(request):
    equipos = Equipo.objects.all()
    return render(request, 'myapp/equipos.html', {'equipos': equipos})

def tecnicos(request):
    tecnicos = Tecnico.objects.all()
    return render(request, 'myapp/tecnicos.html', {'tecnicos': tecnicos})

def reparaciones(request):
    reparaciones = Reparacion.objects.all()
    return render(request, 'myapp/reparacion.html', {'reparaciones': reparaciones})

def agregar_cliente(request):
    if request.method == 'POST':
        form = ClientesFormulario(request.POST)
        if form.is_valid():
            nombre = form.cleaned_data['nombre']
            apellido = form.cleaned_data['apellido']
            telefono = form.cleaned_data['telefono']
            email = form.cleaned_data['email']
            direccion = form.cleaned_data['direccion']
            cliente = Cliente(nombre=nombre, apellido=apellido, telefono=telefono, email=email, direccion=direccion)
            cliente.save()
            return redirect('clientes')
    else:
        form = ClientesFormulario()
    return render(request, 'myapp/agregar_cliente.html', {'form': form})