import React, { useState } from 'react';

const Modal = ({ onClose, onSave, editTaskData }) => {
  const [title, setTitle] = useState(editTaskData ? editTaskData.title : '');
  const [description, setDescription] = useState(editTaskData?.description || '');
  const [label, setLabel] = useState(editTaskData?.label || 'none');
  const [dueDate, setDueDate] = useState(editTaskData?.dueDate || '');

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, label, dueDate }, editTaskData?.id);
  };

  const priorities = [
    { value: 'none', label: 'Yok', icon: '—', class: 'priority-none' },
    { value: 'low', label: 'Düşük', icon: '↓', class: 'priority-low' },
    { value: 'medium', label: 'Orta', icon: '→', class: 'priority-medium' },
    { value: 'high', label: 'Yüksek', icon: '↑', class: 'priority-high' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-title-group">
            <h2>{editTaskData ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Kapat">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Başlık */}
          <div className="form-group">
            <label>
              <span className="label-icon">📝</span> Başlık
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Görev başlığını girin..."
              required
              autoFocus
            />
          </div>

          {/* Açıklama */}
          <div className="form-group">
            <label>
              <span className="label-icon">💬</span> Açıklama <span className="optional-tag">İsteğe Bağlı</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Görev hakkında daha fazla bilgi..."
            />
          </div>

          {/* Son Teslim Tarihi */}
          <div className="form-group">
            <label>
              <span className="label-icon">📅</span> Son Teslim Tarihi
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              min={today}
              max={maxDate}
            />
          </div>

          {/* Öncelik */}
          <div className="form-group">
            <label>
              <span className="label-icon">🏷️</span> Öncelik
            </label>
            <div className="priority-selector">
              {priorities.map(p => (
                <button
                  key={p.value}
                  type="button"
                  className={`priority-btn ${p.class} ${label === p.value ? 'active' : ''}`}
                  onClick={() => setLabel(p.value)}
                  aria-pressed={label === p.value}
                >
                  <span className="priority-icon" aria-hidden="true">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aksiyonlar */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>İptal</button>
            <button type="submit" className="btn" disabled={!title.trim()}>
              {editTaskData ? '✓ Güncelle' : '+ Ekle'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Modal;
