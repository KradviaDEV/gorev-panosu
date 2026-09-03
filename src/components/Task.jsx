import React, { useState } from 'react';

const Task = ({ task, onDelete, onEdit, onDropOnTask }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const draggedTaskId = e.dataTransfer.getData('taskId');
    if (draggedTaskId && draggedTaskId !== task.id) {
      onDropOnTask(draggedTaskId, task.id);
    }
  };

  const labelLabels = {
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek'
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));

  return (
    <>
      <div className={`drop-indicator ${isDragOver ? 'active' : ''}`}></div>
      <div 
        className="task-card"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="task-actions">
          <button className="btn btn-edit" onClick={() => onEdit(task)} title="Görevi Düzenle">✎</button>
          <button className="btn btn-danger" onClick={() => onDelete(task.id)} title="Görevi Sil">✕</button>
        </div>
        
        {task.label && task.label !== 'none' && (
          <span className={`task-label label-${task.label}`}>
            {labelLabels[task.label]}
          </span>
        )}
        
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}
        
        {task.dueDate && (
          <div className={`task-date ${isOverdue ? 'overdue' : ''}`}>
            📅 {new Date(task.dueDate).toLocaleDateString('tr-TR')} {isOverdue && '(Gecikti)'}
          </div>
        )}
      </div>
    </>
  );
};

export default Task;
