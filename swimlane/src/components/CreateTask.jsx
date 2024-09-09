// import  { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTask } from '../store/taskSlice';
// import '../styles/CreateTask.css';

// const CreateTask = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const dispatch = useDispatch();

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setTitle('');
//     setDescription('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && description) {
//       dispatch(addTask({ title, description }));
//       handleCloseModal();
//     } else {
//       alert('Please fill out both fields');
//     }
//   };

//   return (
//     <div>
//       <button className="open-create-task" onClick={handleOpenModal}>Create Task</button>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Create New Task</h3>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Task Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <textarea
//                 placeholder="Task Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <button type="submit">Submit</button>
//               <button type="button" className="close-btn" onClick={handleCloseModal}>Close</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateTask;


import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskToServer } from '../store/taskSlice';
import '../styles/CreateTask.css';

const CreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      const newTask = {
        title,
        description,
        status: 'todo',
        history: [],
      };
      dispatch(addTaskToServer(newTask));
      setTitle('');
      setDescription('');
      handleCloseModal();
    } else {
      alert('Please fill out both fields');
    }
  };

  return (
    <div>
      <button className="open-create-task" onClick={handleOpenModal}>Create Task</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Task</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Submit</button>
              <button type="button" className="close-btn" onClick={handleCloseModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
