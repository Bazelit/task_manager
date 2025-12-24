from django.shortcuts import render, redirect
from .models import Task

def index(request):
    tasks = Task.objects.all()
    return render(request, 'tasks/index.html', {'tasks': tasks})

def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        if title:
            Task.objects.create(title=title)
    return redirect('index')

def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return redirect('index')

def toggle_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.is_done = not task.is_done
    task.save()
    return redirect('index')

def clear_all(request):
    Task.objects.all().delete()
    return redirect('index')