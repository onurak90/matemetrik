'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare, CheckCircle2, Clock, Trash2,
  ExternalLink, ShieldAlert, Check, RefreshCw,
  Reply, Send, X, CornerDownRight
} from 'lucide-react';
import { Comment } from '@/lib/types';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const handleUpdateStatus = async (id: number, isApproved: number) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved }),
      });
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_approved: isApproved } : c))
        );
      }
    } catch (e) {
      alert('Yorum durumu güncellenemedi');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu yorumu kalıcı olarak silmek istediğinizden emin misiniz?')) return;
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      alert('Yorum silinemedi');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleAdminReply = async (comment: Comment) => {
    if (!adminReplyText.trim()) return;
    setIsSubmittingReply(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: comment.post_id,
          parentId: comment.id,
          authorName: 'Cavenaghi (Editör & Öğretmen)',
          authorEmail: 'cavenaghi@matemetrik.com',
          content: adminReplyText.trim(),
        }),
      });
      if (res.ok) {
        setAdminReplyText('');
        setReplyingId(null);
        fetchComments();
      } else {
        alert('Cevap kaydedilemedi');
      }
    } catch {
      alert('Bağlantı hatası oluştu');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const pendingCount = comments.filter((c) => c.is_approved === 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-indigo-600" />
            Yorum Moderasyonu
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ziyaretçilerin bıraktığı yorumları inceleyin, doğrudan yanıtlayın, onaylayın veya silin.
          </p>
        </div>

        <button
          onClick={fetchComments}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Yenile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilter('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'pending'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Onay Bekleyenler ({pendingCount})
        </button>

        <button
          onClick={() => setFilter('approved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'approved'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Yayındakiler
        </button>

        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Tüm Yorumlar
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Yorumlar yükleniyor...</div>
        ) : comments.length === 0 ? (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Hiç yorum bulunamadı</h3>
            <p className="text-xs text-slate-400">
              {filter === 'pending'
                ? 'Onay bekleyen tüm yorumları tamamladınız!'
                : 'Bu filtrede listelenecek yorum bulunamadı.'}
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const isApproved = comment.is_approved === 1;
            return (
              <div
                key={comment.id}
                className={`p-6 rounded-3xl bg-white border transition-all space-y-4 shadow-sm ${
                  isApproved
                    ? 'border-slate-200'
                    : 'border-amber-300 bg-amber-50/20 shadow-amber-500/5'
                }`}
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                      {comment.author_avatar ? (
                        <img
                          src={comment.author_avatar}
                          alt={comment.author_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-xs">
                          {comment.author_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{comment.author_name}</span>
                        {comment.is_admin === 1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white">
                            Öğretmen
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-slate-400 font-normal">
                          ({comment.author_email})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isApproved ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Yayında
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1 animate-pulse">
                        <Clock className="w-3.5 h-3.5" /> Onay Bekliyor
                      </span>
                    )}
                  </div>
                </div>

                {/* Post Link */}
                {comment.post_title && (
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-700">İlgili Yazı:</span>
                    <Link
                      href={comment.post_slug ? `/post/${comment.post_slug}` : '#'}
                      target="_blank"
                      className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
                    >
                      {comment.post_title}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  "{comment.content}"
                </div>

                {/* Inline Admin Reply Box */}
                {replyingId === comment.id && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                        <Reply className="w-3.5 h-3.5" />
                        <strong>{comment.author_name}</strong> kullanıcısına yönetici cevabı yazıyorsunuz:
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyingId(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Öğretmen / Admin olarak detaylı cevabınızı yazın..."
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      className="w-full p-3 text-xs bg-white border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setReplyingId(null)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-white rounded-lg transition-colors"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="button"
                        disabled={isSubmittingReply || !adminReplyText.trim()}
                        onClick={() => handleAdminReply(comment)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {isSubmittingReply ? 'Cevap Gönderiliyor...' : 'Cevabı Yayınla'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  {/* Admin Reply Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingId(replyingId === comment.id ? null : comment.id);
                      setAdminReplyText('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    Cevapla
                  </button>

                  {!isApproved ? (
                    <button
                      type="button"
                      disabled={actionLoadingId === comment.id}
                      onClick={() => handleUpdateStatus(comment.id, 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-emerald-600/20 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      Yorumu Onayla &amp; Yayınla
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={actionLoadingId === comment.id}
                      onClick={() => handleUpdateStatus(comment.id, 0)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl transition-colors disabled:opacity-50"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Onayı Kaldır (Taslağa Al)
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={actionLoadingId === comment.id}
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                    title="Yorumu Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
