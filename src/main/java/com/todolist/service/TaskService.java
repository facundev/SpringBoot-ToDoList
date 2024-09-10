package com.todolist.service;

import com.todolist.model.Task;
import com.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll(); // Obtiene todas las tareas del repositorio
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null); // Busca una tarea por ID
    }

    public Task createTask(Task task) {
        // Acá se puede agregar lógica adicional si es necesario antes de guardar la tarea
        return taskRepository.save(task); // Guarda la nueva tarea en la base de datos
    }

    public Task updateTask(Long id, Task updatedTask) {
        // Busca la tarea existente
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setDescription(updatedTask.getDescription());
            task.setCompleted(updatedTask.isCompleted());
            return taskRepository.save(task); // Actualiza la tarea existente
        } else {
            return null; // Tarea no encontrada
        }
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id); // Elimina la tarea por ID
    }
}
