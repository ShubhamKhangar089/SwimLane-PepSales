import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swimlane from './Swimlane';
import FilterBar from './FilterBar';
import CreateTask from './CreateTask';
import { fetchTasks, updateTaskStatusOnServer } from '../store/taskSlice';
import '../styles/SwimlaneContainer.css';

const SwimlaneContainer = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  // console.log("tasks :", tasks)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch,tasks]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const onDrop = (e, laneName) => {
    const taskId = e.dataTransfer.getData('taskId');
    const prevStatus = e.dataTransfer.getData('prevStatus');
    dispatch(updateTaskStatusOnServer({ taskId: taskId, newStatus: laneName, prevStatus: prevStatus }));
  };

  const lanes = ['todo', 'in-progress', 'done'];

  return (
    <div className="swimlane-container">
      <div className="swimlane-headers">
        <CreateTask />
        <FilterBar />
      </div>
      <div className="swimlanes">
        {lanes.map(lane => (
          <Swimlane
            key={lane}
            laneName={lane}
            tasks={filteredTasks.filter(task => task.status === lane)}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default SwimlaneContainer;
