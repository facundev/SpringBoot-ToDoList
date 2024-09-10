import React, { useState } from 'react';
import './AddTaskForm.css'

const AddTaskForm = ({ onTaskAdded }) => {
    

    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        // Crea el objeto de la tarea con los datos del formulario
        const newTask = { description, completed };

        // Realiza la solicitud POST al backend
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask), // Convierte el objeto en una cadena JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setDescription(''); // Limpia el formulario
            setCompleted(false);
            if (typeof onTaskAdded === 'function') {
                onTaskAdded(data); // Llama a la función si es válida
            }
        })
        .catch(error => {
            console.error('Error al agregar la tarea: ', error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h2>Agregar Nueva Tarea</h2>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='task-description-div'>
                    <label>
                        Descripción:
                        <input
                            id='description'
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='completed-task-div'>
                    <label>
                        Completada:
                        <input
                            className='checkbox-inp'
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    </label>
                </div>
                <button type="submit">Agregar Tarea</button>
            </form>
        </div>
    );
};

export default AddTaskForm;
