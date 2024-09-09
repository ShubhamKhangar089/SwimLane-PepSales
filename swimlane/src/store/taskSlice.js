import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for interacting with the mock server
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('http://localhost:3001/tasks');
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json();
});

export const addTaskToServer = createAsyncThunk('tasks/addTaskToServer', async (task) => {
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json();
});

export const updateTaskOnServer = createAsyncThunk('tasks/updateTaskOnServer', async ({ taskId, updatedTask }) => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return response.json();
});

export const deleteTaskFromServer = createAsyncThunk('tasks/deleteTaskFromServer', async (taskId) => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return taskId;
});


export const updateTaskStatusOnServer = createAsyncThunk('tasks/updateTaskStatusOnServer', async ({ taskId, newStatus, prevStatus }) => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  const task = await response.json();
  const newHistory = [...task.history, { from: prevStatus, to: newStatus, timestamp: new Date().toLocaleString() }];

  const updateResponse = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus, history: newHistory }),
  });
  if (!updateResponse.ok) {
    throw new Error(`Network response was not ok: ${updateResponse.status}`);
  }
  return updateResponse.json();
});

const initialState = {
  tasks: [],
  filter: '',
  status: 'todo',
  history: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.tasks = action.payload;
        } else {
          console.error('Invalid response from server');
        }
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          const existingTask = state.tasks.find((task) => task.id === action.payload.id);
          if (!existingTask) {
            state.tasks.push(action.payload);
          } else {
            console.log('Task already exists');
          }
        } else {
          console.error('Invalid response from server');
        }
      })
      .addCase(updateTaskOnServer.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          const index = state.tasks.findIndex((task) => task.id === action.payload.id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          } else {
            console.log('Task not found');
          }
        } else {
          console.error('Invalid response from server');
        }
      })
      .addCase(updateTaskStatusOnServer.fulfilled, (state, action) => {
        if (action.payload && action.payload.id && action.payload.status) {
          const index = state.tasks.findIndex((task) => task.id === action.payload.id);
          if (index !== -1) {
            state.tasks[index].status = action.payload.status;
          } else {
            console.log('Task not found');
          }
        } else {
          console.error('Invalid response from server');
        }
      })
      //for testing 
      // .addCase(updateTaskStatusOnServer.fulfilled, (state, action) => {
      //   if (action.payload && action.payload.id && action.payload.status) {
      //     const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      //     if (index !== -1) {
      //       const prevStatus = state.tasks[index].status;
      //       state.tasks[index].status = action.payload.status;
      //       state.tasks[index].history.push({ from: prevStatus, to: action.payload.status, timestamp: new Date().toLocaleString() });
      //     } else {
      //       console.log('Task not found');
      //     }
      //   } else {
      //     console.error('Invalid response from server');
      //   }
      // })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        if (action.payload) {
          state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        } else {
          console.error('Invalid response from server');
        }
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;