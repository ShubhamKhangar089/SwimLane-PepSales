import React from 'react';

const TaskHistory = ({ history }) => {
  return (
    <div className="task-history">
      <h3>Task History</h3>
      <ul>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <li key={index}>
              {`Moved from ${entry.from} to ${entry.to} on ${entry.timestamp}`}
            </li>
          ))
        ) : (
          <li>No history available</li>
        )}
      </ul>
    </div>
  );
};

export default TaskHistory;
