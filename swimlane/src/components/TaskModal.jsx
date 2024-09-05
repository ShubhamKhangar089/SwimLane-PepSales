import React from 'react';
import TaskHistory from './TaskHistory';
import '../styles/TaskModal.css';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
        
        <TaskHistory history={task.history} />
      </div>
    </div>
  );
};

export default TaskModal;
