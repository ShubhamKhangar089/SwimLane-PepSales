import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, id: Date.now(), status: 'todo', history: [] });
    },

    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.history.push({ from: task.status, to: newStatus, timestamp: new Date().toLocaleString() });
        task.status = newStatus;
      }
    },

    editTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.title = updatedTask.title;
        task.description = updatedTask.description;
      }
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    }
  }
});

export const { addTask, updateTaskStatus, editTask,deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;