import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskFromServer, updateTaskOnServer } from '../store/taskSlice';
import TaskModal from './TaskModal';
import '../styles/Task.css';

const Task = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const dispatch = useDispatch();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('prevStatus', task.status);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedTask = { ...task, title: newTitle };
    dispatch(updateTaskOnServer({ taskId: task.id, updatedTask }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle(task.title);
  };

  const handleDeleteClick = () => {
    dispatch(deleteTaskFromServer(task.id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <div className="task-title">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
        {!isEditing && (
          <>
            <button className="edit-btn" onClick={handleEdit}>
              ✏️
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              🗑️
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <TaskModal task={task} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Task;