import React, { useState, useEffect } from 'react';
import './EditTaskForm.css';

const EditTaskForm = ({ taskId, onTaskUpdated, onCancel }) => {
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Obtener los datos de la tarea a editar
        fetch(`/tasks/${taskId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                return response.json();
            })
            .then(task => {
                setDescription(task.description);
                setCompleted(task.completed);
            })
            .catch(error => {
                console.error('Error al cargar la tarea: ', error);
                setError(error.message);
            });
    }, [taskId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedTask = { description, completed };

        fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            onTaskUpdated(data); // Notifica al componente padre que la tarea ha sido actualizada
        })
        .catch(error => {
            console.error('Error al actualizar la tarea: ', error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h2>Editar Tarea</h2>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
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
                <button type="submit">Actualizar Tarea</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditTaskForm;
