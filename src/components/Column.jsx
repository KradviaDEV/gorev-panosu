import React, { useState } from 'react';
import Task from './Task';

const COLUMNS_META = {
  todo:       { dot: '#818cf8', label: 'Yapılacaklar' },
  inProgress: { dot: '#fbbf24', label: 'Devam Edenler' },
  done:       { dot: '#34d399', label: 'Tamamlananlar' },
};

const Column = ({ column, tasks, onUpdateStatus, onDelete, onEdit, onDropOnTask }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const meta = COLUMNS_META[column.id] || {};

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onUpdateStatus(taskId, column.id);
  };

  return (
    <div
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div className="column-title-wrapper">
          <span className="column-dot" style={{ background: meta.dot, boxShadow: `0 0 8px ${meta.dot}80` }} />
          <h2 className="column-title">{column.title}</h2>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onDropOnTask={onDropOnTask} />
        ))}
      </div>
    </div>
  );
};

export default Column;
