import React from 'react';
import './TasksList.css';

const TasksList = ({ tasks, onEditTask, onDeleteTask }) => { // `onDeleteTask` como prop
    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id}>
                            <div className='left'>
                                {task.description} <hr></hr> 
                                <span className={task.completed ? 'completed-text' : 'pending-text'}>
                                    {task.completed ? 'Completada' : 'Pendiente'}
                                </span>
                            </div>
                            <div>
                                <button onClick={() => onEditTask(task.id)}>Editar</button>
                                <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No hay tareas disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default TasksList;
