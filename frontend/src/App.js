import './App.css';
import React, { useState, useEffect } from 'react';
import TasksList from './components/TasksList/TasksList';
import AddTaskForm from './components/AddTask/AddTaskForm';
import EditTaskForm from './components/EditTask/EditTaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        fetch('/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setTasks(data))
            .catch(error => console.error('Error al cargar las tareas: ', error));
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        ));
        setEditingTaskId(null);
    };

    const handleEditTask = (taskId) => {
        setEditingTaskId(taskId);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
    };

    const handleDeleteTask = (taskId) => {
    fetch(`/tasks/${taskId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar la tarea");
            }
            setTasks(tasks.filter(task => task.id !== taskId)); // Actualiza el estado
        })
        .catch(error => console.error('Error al eliminar la tarea:', error));
    };

    return (
        <div className='main-div'>
            <h1>ToDo List</h1>
            {editingTaskId ? (
                <EditTaskForm
                    taskId={editingTaskId}
                    onTaskUpdated={handleTaskUpdated}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <AddTaskForm onTaskAdded={handleTaskAdded} />
                    <TasksList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
                </>
            )}
        </div>
    );
};

export default App;
