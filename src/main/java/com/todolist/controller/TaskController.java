package com.todolist.controller;

import com.todolist.model.Task;
import com.todolist.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks(); // Usa el servicio para obtener todas las tareas
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return ResponseEntity.ok(task); // Devuelve la tarea si se encuentra
        } else {
            return ResponseEntity.notFound().build(); // Devuelve 404 si no se encuentra
        }
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task); // Usa el servicio para crear una nueva tarea
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = taskService.updateTask(id, updatedTask);
        if (task != null) {
            return ResponseEntity.ok(task); // Devuelve la tarea actualizada si se encuentra
        } else {
            return ResponseEntity.notFound().build(); // Devuelve 404 si no se encuentra
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id); // Usa el servicio para eliminar la tarea
        return ResponseEntity.noContent().build(); // Devuelve 204 No Content después de eliminar la tarea
    }
}
