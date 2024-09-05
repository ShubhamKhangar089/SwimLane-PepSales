import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../store/taskSlice';
import TaskModal from './TaskModal';
import '../styles/Task.css';

const Task = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const dispatch = useDispatch();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTask({ taskId: task.id, updatedTask: { ...task, title: newTitle } }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle(task.title);
  };

  const handleDeleteClick = () => {
    dispatch(deleteTask({ taskId: task.id }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <div className="task-title">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            autoFocus
          />
        ) : (
          <h4 onClick={() => setIsModalOpen(true)}>{task.title}</h4>
        )}
        {isEditing && (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSaveEdit}>
              ✔️
            </button>
            <button className="cancel-btn" onClick={handleCancelEdit}>
              ❌
            </button>
          </div>
        )}
      </div>
      <div className="task-actions">
        <button className="edit-btn" onClick={handleEdit}>
          ✏️
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          🗑️
        </button>
      </div>

      {isModalOpen && (
        <TaskModal task={task} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Task;