'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, LogOut, Clock, ShieldCheck, User } from 'lucide-react';

interface CommentItem {
  id: number;
  author_name: string;
  author_email: string;
  author_avatar?: string;
  content: string;
  created_at: string;
}

interface CommenterUser {
  name: string;
  email: string;
  avatar: string;
}

export default function CommentSection({
  postId,
  postTitle,
}: {
  postId: number;
  postTitle: string;
}) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CommenterUser | null>(null);

  // Modal / Login form
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  // Comment input
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch approved comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}&approvedOnly=true`);
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

    // Check localStorage for saved Google / Gmail user
    try {
      const saved = localStorage.getItem('matemetrik_commenter');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
  }, [postId]);

  const handleGoogleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) {
      setErrorMsg('Lütfen adınızı ve Gmail adresinizi girin.');
      return;
    }

    if (!loginEmail.toLowerCase().includes('@')) {
      setErrorMsg('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    const seed = encodeURIComponent(loginName.trim());
    const newUser: CommenterUser = {
      name: loginName.trim(),
      email: loginEmail.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
    };

    setUser(newUser);
    try {
      localStorage.setItem('matemetrik_commenter', JSON.stringify(newUser));
    } catch {}

    setShowLoginModal(false);
    setErrorMsg(null);
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('matemetrik_commenter');
    } catch {}
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!commentText.trim()) return;

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          authorName: user.name,
          authorEmail: user.email,
          authorAvatar: user.avatar,
          content: commentText.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setCommentText('');
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setErrorMsg(data.error || 'Yorum gönderilemedi');
      }
    } catch {
      setErrorMsg('Bağlantı hatası oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Yorumlar &amp; Soru-Cevap
            </h2>
            <p className="text-xs text-slate-500">
              {comments.length} onaylanmış topluluk yorumu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> Moderatör Onaylı
        </div>
      </div>

      {/* Comment Form Box */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-4">
        {submitSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Teşekkürler, yorumunuz alındı!</div>
              <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                Yorumunuz içerik yöneticimizin onayından sonra bu sayfada yayınlanacaktır.
              </p>
            </div>
          </div>
        ) : (
          <>
            {user ? (
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 bg-white shrink-0">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                        Gmail İle Giriş Yapıldı
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Çıkış
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Google 'G' icon */}
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Gmail Hesabınızla Yorum Yapın
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Sitede üyelik oluşturmadan, Google hesabınızla anında soru sorabilir veya yorum bırakabilirsiniz.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shrink-0"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Google ile Bağlan
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <textarea
                rows={3}
                placeholder={
                  user
                    ? 'Bu konu hakkında bir soru sorun veya düşüncelerinizi paylaşın...'
                    : 'Yorum yazmak için önce yukarıdan Google hesabınızı onaylayın...'
                }
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user || submitting}
                required
                className="w-full p-3.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed resize-none"
              />

              {errorMsg && (
                <div className="text-xs text-rose-600 font-semibold">{errorMsg}</div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  🔒 Gönderilen yorumlar moderatör kontrolünden geçtikten sonra listelenir.
                </p>

                <button
                  type="submit"
                  disabled={!user || submitting || !commentText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Yorumlar yükleniyor...</div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
            Henüz yorum yapılmamış. İlk yorumu siz yapın!
          </div>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:border-indigo-200 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-white shrink-0">
                    {c.author_avatar ? (
                      <img src={c.author_avatar} alt={c.author_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xs">
                        {c.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{c.author_name}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Kullanıcı
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(c.created_at)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-12">
                {c.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Google Connect Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 mx-auto flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Gmail Hesabınızla Bağlanın
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Sitede üye olmadan, doğrudan Google hesabınızla yorum bırakabilirsiniz.
              </p>
            </div>

            <form onSubmit={handleGoogleConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Adınız ve Soyadınız
                </label>
                <input
                  type="text"
                  placeholder="Örn: Zeynep Kaya"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gmail / E-Posta Adresiniz
                </label>
                <input
                  type="email"
                  placeholder="ornek@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-600 font-semibold">{errorMsg}</div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md shadow-indigo-600/20"
                >
                  Bağlan &amp; Devam Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
