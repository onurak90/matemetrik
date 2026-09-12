'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, Calendar, AlertCircle, Clock, Check } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  priority: 'urgent' | 'high' | 'normal';
  is_completed: number;
  due_date: string;
  created_at: string;
}

export default function AdminNotesWidget() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState<'urgent' | 'high' | 'normal'>('normal');
  const [newDueDate, setNewDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      if (res.ok) {
        const data = await res.json();
        setNotes(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleToggle = async (id: number, currentCompleted: number) => {
    const nextState = currentCompleted === 1 ? 0 : 1;
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_completed: nextState } : n))
    );
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: nextState === 1 }),
      });
    } catch {
      fetchNotes();
    }
  };

  const handleDelete = async (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    } catch {
      fetchNotes();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          priority: newPriority,
          due_date: newDueDate,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setNotes((prev) => [created, ...prev]);
        setNewTitle('');
        setNewContent('');
        setNewPriority('normal');
        setNewDueDate('');
        setIsAdding(false);
      }
    } catch (e) {
      alert('Not eklenemedi');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredNotes = notes.filter((n) => {
    if (filter === 'pending') return n.is_completed === 0;
    if (filter === 'completed') return n.is_completed === 1;
    return true;
  });

  const pendingCount = notes.filter((n) => n.is_completed === 0).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span>📌</span> Yönetici Notları &amp; MEB Ajandası
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {pendingCount} tamamlanmamış görev ve hatırlatıcı
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {isAdding ? 'Vazgeç' : 'Not Ekle'}
        </button>
      </div>

      {/* Quick Add Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <input
            type="text"
            placeholder="Görev veya not başlığı (örn: 10. Sınıf MEB 2. Yazılı Çözümlerini hazırla)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Açıklama / detaylar (isteğe bağlı)..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Öncelik:</label>
              <select
                value={newPriority}
                onChange={(e: any) => setNewPriority(e.target.value)}
                className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-lg"
              >
                <option value="normal">Normal</option>
                <option value="high">Yüksek ⚠️</option>
                <option value="urgent">Acil / Kritik 🚨</option>
              </select>

              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? 'Ekleniyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      )}

      {/* Tabs */}
      <div className="px-5 pt-3 flex items-center gap-2 border-b border-slate-100 text-xs">
        <button
          onClick={() => setFilter('pending')}
          className={`pb-2.5 font-semibold transition-colors border-b-2 ${
            filter === 'pending'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Bekleyenler ({notes.filter((n) => n.is_completed === 0).length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`pb-2.5 font-semibold transition-colors border-b-2 ${
            filter === 'completed'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Tamamlananlar ({notes.filter((n) => n.is_completed === 1).length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`pb-2.5 font-semibold transition-colors border-b-2 ${
            filter === 'all'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Tümü ({notes.length})
        </button>
      </div>

      {/* Notes List */}
      <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Yükleniyor...</div>
        ) : filteredNotes.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            {filter === 'pending' ? '🎉 Harika! Bekleyen hiçbir görev yok.' : 'Kayıtlı not bulunamadı.'}
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isDone = note.is_completed === 1;
            return (
              <div
                key={note.id}
                className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3 ${
                  isDone ? 'opacity-60 bg-slate-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => handleToggle(note.id, note.is_completed)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-medium ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {note.title}
                      </span>
                      {note.priority === 'urgent' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                          🚨 Acil
                        </span>
                      )}
                      {note.priority === 'high' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                          ⚠️ Yüksek
                        </span>
                      )}
                    </div>
                    {note.content && (
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {note.content}
                      </p>
                    )}
                    {note.due_date && (
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
                        <Calendar className="w-3 h-3 text-indigo-500" /> Hedef: {note.due_date}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors shrink-0"
                  title="Notu Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
