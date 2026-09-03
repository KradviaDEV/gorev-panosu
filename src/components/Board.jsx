import React from 'react';
import Column from './Column';

const COLUMNS = [
  { id: 'todo', title: 'Yapılacaklar' },
  { id: 'inProgress', title: 'Devam Edenler' },
  { id: 'done', title: 'Tamamlananlar' }
];

const Board = ({ tasks, onUpdateStatus, onDelete, onEdit, onDropOnTask }) => {
  return (
    <div className="board">
      {COLUMNS.map(col => (
        <Column 
          key={col.id} 
          column={col} 
          tasks={tasks.filter(t => t.status === col.id)}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
          onEdit={onEdit}
          onDropOnTask={onDropOnTask}
        />
      ))}
    </div>
  );
};

export default Board;
