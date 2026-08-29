import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, query, orderBy, increment } from 'firebase/firestore';
import { Heart, MessageSquare, Send, User, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export interface CommentItem {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface BlogInteractionsProps {
  slug: string;
}

export default function BlogInteractions({ slug }: BlogInteractionsProps) {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for liked status
    if (typeof window !== 'undefined' && localStorage.getItem(`liked_${slug}`)) {
      setHasLiked(true);
    }

    // Real-time listener for likes count
    const interactionRef = doc(db, 'blog_interactions', slug);
    const unsubInteraction = onSnapshot(
      interactionRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          setLikes(docSnap.data()?.likes || 0);
        }
      },
      (err) => {
        console.error("Firestore interaction listener error:", err);
      }
    );

    // Real-time listener for comments collection
    const commentsRef = collection(db, `blog_interactions/${slug}/comments`);
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const unsubComments = onSnapshot(
      q, 
      (snapshot) => {
        const comms: CommentItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          comms.push({
            id: docSnap.id,
            authorName: data.authorName || 'Anonim',
            content: data.content || '',
            createdAt: data.createdAt || new Date().toISOString(),
          });
        });
        setComments(comms);
        setIsLoadingComments(false);
      },
      (err) => {
        console.error("Firestore comments listener error:", err);
        setIsLoadingComments(false);
      }
    );

    return () => {
      unsubInteraction();
      unsubComments();
    };
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) {
      toast('Anda sudah menyukai artikel ini!', { icon: '❤️' });
      return;
    }

    setHasLiked(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`liked_${slug}`, 'true');
    }
    setLikes((prev) => prev + 1); // Optimistic UI update

    try {
      const interactionRef = doc(db, 'blog_interactions', slug);
      const docSnap = await getDoc(interactionRef);
      if (!docSnap.exists()) {
        await setDoc(interactionRef, { likes: 1, viewCount: 0 });
      } else {
        await setDoc(interactionRef, { likes: increment(1) }, { merge: true });
      }
      toast.success("Terima kasih atas apresiasinya!");
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Gagal menyukai artikel.");
      setHasLiked(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`liked_${slug}`);
      }
      setLikes((prev) => Math.max(0, prev - 1));
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = authorName.trim();
    const cleanContent = newComment.trim();

    if (!cleanName) {
      toast.error("Silakan masukkan nama Anda.");
      return;
    }
    if (!cleanContent) {
      toast.error("Komentar tidak boleh kosong.");
      return;
    }
    if (cleanContent.length > 500) {
      toast.error("Komentar maksimal 500 karakter.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Ensure parent document exists
      const interactionRef = doc(db, 'blog_interactions', slug);
      const docSnap = await getDoc(interactionRef);
      if (!docSnap.exists()) {
        await setDoc(interactionRef, { likes: 0, viewCount: 0 });
      }

      // Add comment to subcollection
      const commentsRef = collection(db, `blog_interactions/${slug}/comments`);
      await addDoc(commentsRef, {
        authorName: cleanName,
        content: cleanContent,
        createdAt: new Date().toISOString()
      });

      setNewComment('');
      toast.success("Komentar Anda berhasil dipublikasikan!");
    } catch (error) {
      console.error("Error adding comment to Firestore:", error);
      toast.error("Gagal mengirim komentar. Coba lagi beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="comments-section" className="w-full mt-12 pt-8 border-t border-purple-100/80">
      {/* Interaction Bar (Likes & Comments Count) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLike}
            className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm ${
              hasLiked 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 hover:text-purple-800'
            }`}
            aria-label="Sukai artikel ini"
          >
            <Heart 
              size={16} 
              className={`transition-transform duration-200 group-hover:scale-110 ${
                hasLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover:text-purple-600'
              }`} 
            />
            <span>{likes} Suka</span>
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100/80 text-slate-600 text-xs font-mono font-medium tracking-wider">
            <MessageSquare size={15} className="text-purple-600" />
            <span>{comments.length} Komentar</span>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Diskusi Terbuka Komunitas
        </span>
      </div>

      {/* Comment Form Card */}
      <div className="bg-white/60 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white shadow-xl shadow-purple-900/5 relative overflow-hidden ring-1 ring-purple-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-purple-100/30 -z-10" />
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 text-white flex items-center justify-center shadow-md shadow-purple-800/20">
            <MessageSquare size={18} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-display font-semibold text-slate-900">
              Tinggalkan Tanggapan
            </h4>
            <p className="text-xs font-sans text-slate-500">
              Bagikan pemikiran, pertanyaan, atau feedback Anda terkait artikel ini.
            </p>
          </div>
        </div>

        <form onSubmit={handleCommentSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Nama Lengkap / Alias <span className="text-purple-800">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Contoh: Budi Pratama"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={50}
                required
                className="w-full px-4 py-3 pl-10 bg-white/70 backdrop-blur-md border border-purple-200/60 rounded-xl text-sm font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800/20 transition-all shadow-inner"
              />
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                Pesan Komentar <span className="text-purple-800">*</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">
                {newComment.length}/500
              </span>
            </div>
            <textarea
              placeholder="Tuliskan pandangan atau pertanyaan Anda mengenai topik ini..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={500}
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-purple-200/60 rounded-xl text-sm font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800/20 transition-all resize-y shadow-inner"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-950 hover:to-purple-900 active:scale-98 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-900/30 disabled:opacity-60 cursor-pointer border border-purple-700/50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <span>Kirim Komentar</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="mt-10">
        <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <span>Komentar Pembaca</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
          <span className="text-slate-500">({comments.length})</span>
        </h5>

        {isLoadingComments ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-100 animate-pulse flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50/70 border border-dashed border-purple-200/80 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={20} />
            </div>
            <p className="text-sm font-sans font-medium text-slate-700 mb-1">
              Belum ada komentar
            </p>
            <p className="text-xs font-sans text-slate-400 max-w-sm mx-auto">
              Jadilah yang pertama memberikan tanggapan atau berdiskusi seputar artikel ini!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {comments.map((comment) => {
                let formattedDate = 'Baru saja';
                if (comment.createdAt) {
                  try {
                    const parsed = new Date(comment.createdAt);
                    if (!isNaN(parsed.getTime())) {
                      formattedDate = parsed.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                    }
                  } catch {
                    formattedDate = 'Baru saja';
                  }
                }

                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-white border border-purple-100/70 shadow-xs hover:border-purple-200 transition-all flex gap-4"
                  >
                    {/* User Avatar Initial with Purple/Indigo Gradient */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20 uppercase">
                      {comment.authorName ? comment.authorName.charAt(0) : 'U'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h6 className="text-sm font-sans font-bold text-slate-900 truncate">
                          {comment.authorName}
                        </h6>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Clock size={11} />
                          {formattedDate}
                        </span>
                      </div>

                      <p className="text-sm font-sans text-slate-700 leading-relaxed break-words whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
