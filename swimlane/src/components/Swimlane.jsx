import Task from './Task';
import '../styles/Swimlane.css';

const Swimlane = ({ laneName, tasks, onDrop }) => {
  return (
    <div
      className="swimlane"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, laneName)}
    >
      <h3>{laneName.toUpperCase()}</h3>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Swimlane;
