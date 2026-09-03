import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('kanban-theme') || 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast State
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTheme = () => {
    document.body.classList.add('theme-transitioning');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    window.setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 200);
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData, existingId = null) => {
    if (existingId) {
      setTasks(tasks.map(t => t.id === existingId ? { ...t, ...taskData } : t));
      showToast('Görev başarıyla güncellendi.');
    } else {
      const newTask = { id: Date.now().toString(), ...taskData, status: 'todo' };
      setTasks([...tasks, newTask]);
      showToast('Yeni görev eklendi.');
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    showToast('Görev silindi.', 'error');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks => {
      const draggedTask = prevTasks.find(t => t.id === taskId);
      if (draggedTask.status === newStatus) {
        // If it was dropped in the empty space of the SAME column, 
        // we might want to move it to the end, but usually we just ignore it.
        return prevTasks;
      }
      
      const newTasks = prevTasks.filter(t => t.id !== taskId);
      newTasks.push({ ...draggedTask, status: newStatus });
      return newTasks;
    });
  };

  const handleDropOnTask = (draggedId, targetId) => {
    setTasks(prevTasks => {
      const draggedIndex = prevTasks.findIndex(t => t.id === draggedId);
      const targetIndex = prevTasks.findIndex(t => t.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prevTasks;
      
      const draggedTask = prevTasks[draggedIndex];
      const targetTask = prevTasks[targetIndex];
      
      const updatedDraggedTask = { ...draggedTask, status: targetTask.status };
      
      const newTasks = [...prevTasks];
      newTasks.splice(draggedIndex, 1); // remove
      
      const newTargetIndex = newTasks.findIndex(t => t.id === targetId);
      newTasks.splice(newTargetIndex, 0, updatedDraggedTask); // insert before
      
      return newTasks;
    });
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="app-container">
      <header className="app-header glass">
        <h1>Görev Panosu</h1>
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Görevlerde ara..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Açık Tema' : '🌙 Koyu Tema'}
          </button>
          <button className="btn" onClick={() => handleOpenModal()}>
            <span>+</span> Yeni Görev
          </button>
        </div>
      </header>
      
      <main className="board-container" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Board 
          tasks={filteredTasks} 
          onUpdateStatus={updateTaskStatus} 
          onDelete={deleteTask} 
          onEdit={handleOpenModal}
          onDropOnTask={handleDropOnTask}
        />
      </main>

      {isModalOpen && (
        <Modal onClose={() => { setIsModalOpen(false); setEditingTask(null); }} onSave={handleSaveTask} editTaskData={editingTask} />
      )}

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}
      
      <footer className="app-footer">
        Developed by <span>Kradvia</span>
      </footer>
    </div>
  );
}

export default App;
