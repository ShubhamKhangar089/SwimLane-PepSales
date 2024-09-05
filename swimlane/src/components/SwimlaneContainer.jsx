import { useSelector, useDispatch } from 'react-redux';
import Swimlane from './Swimlane';
import FilterBar from './FilterBar';
import TaskModal from './TaskModal';
import { updateTaskStatus } from '../store/taskSlice';
import '../styles/SwimlaneContainer.css';
import CreateTask from './CreateTask';

const SwimlaneContainer = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const filter = useSelector(state => state.tasks.filter);
  const dispatch = useDispatch();
  
  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()));

  const onDrop = (e, laneName) => {
    const taskId = e.dataTransfer.getData('taskId');
    dispatch(updateTaskStatus({ taskId: Number(taskId), newStatus: laneName }));
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
