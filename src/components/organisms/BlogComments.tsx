import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, User, ShieldCheck, Heart, ThumbsUp, MoreHorizontal, Sparkles, Reply, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, addDoc, doc, updateDoc, increment, orderBy, where } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes: number;
  helpful?: number;
  isVerified?: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  parentId?: string;
}

const DUMMY_COMMENTS: Comment[] = [
  {
    id: 'dummy-1',
    authorName: 'Rian_Digital',
    content: 'Gokil bener dah strateginya! Gue baru aja nyoba implementasi dikit di proyek kantor, hasilnya sat-set banget beneran. No cap! 🚀',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    likes: 12,
    helpful: 5,
    isVerified: true,
    moderationStatus: 'approved'
  },
  {
    id: 'dummy-2',
    authorName: 'Siti_TechEnthusiast',
    content: 'Wah, baru tau AI bisa sampe sejauh ini integrasinya. Spill tools yang dipake dong bang Chesta! Pengen ngerasain vibe coding 2026 juga nih. 🔥',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    likes: 8,
    helpful: 12,
    moderationStatus: 'approved'
  },
  {
    id: 'dummy-r1',
    authorName: 'Chesta Azka',
    content: 'Mantap Siti! Tool utamanya Cursor buat coding & v0 buat UI. Nanti gue bikin artikel khusus bedah tools-nya ya! Stay tuned. 😉',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    likes: 24,
    helpful: 10,
    isVerified: true,
    moderationStatus: 'approved',
    parentId: 'dummy-2'
  },
  {
    id: 'dummy-3',
    authorName: 'Budi_Solopreneur',
    content: 'Bener banget poin tentang efisiensi. Sebagai solopreneur, AI itu emang bener-bener Jarvis gue sih. Mantap edukasinya bang! 🙌',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 15,
    helpful: 20,
    isVerified: true,
    moderationStatus: 'approved'
  },
  {
    id: 'dummy-4',
    authorName: 'Mega_UIUX',
    content: 'Visual arsitekturnya clean banget. Penjelasannya juga nggak ribet buat pemula kayak gue. Lanjutkan bang! 🎨✨',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 6,
    helpful: 3,
    moderationStatus: 'approved'
  }
];

export default function BlogComments({ slug }: { slug: string }) {
  const { user } = useAuth();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const commentsRef = collection(db, 'blog_interactions', slug, 'comments');
    const isAdmin = user?.email?.endsWith('@gmail.com');
    const q = isAdmin 
      ? query(commentsRef, orderBy('createdAt', 'desc'))
      : query(commentsRef, where('moderationStatus', '==', 'approved'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });
      const merged = [...fetchedComments, ...DUMMY_COMMENTS.filter(d => !fetchedComments.some(f => f.content === d.content))];
      setComments(merged);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug, user]);

  const scrollToInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      commentInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleReply = (comment: Comment) => {
    setReplyTo(comment);
    // Use a small timeout to ensure state update doesn't block focus/scroll
    setTimeout(scrollToInput, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    try {
      const commentsRef = collection(db, 'blog_interactions', slug, 'comments');
      await addDoc(commentsRef, {
        authorName: user?.displayName || 'Anonim_User',
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        helpful: 0,
        moderationStatus: user ? 'approved' : 'pending',
        parentId: replyTo?.id || null
      });

      setNewComment('');
      setReplyTo(null);
      
      toast.success(user ? 'Komentar lo udah meluncur! 🎉' : 'Komentar lo lagi dicek admin ya! Sabar dikit... ⏳', {
        icon: '💬',
        style: { borderRadius: '12px', background: '#1e293b', color: '#fff' }
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Duh, gagal ngirim komentar. Coba lagi ya! 😅');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReaction = async (id: string, type: 'likes' | 'helpful') => {
    const storageKey = `reacted-${id}-${type}`;
    if (localStorage.getItem(storageKey)) {
      toast('Lo udah ngasih reaksi di sini bray! 😉', { icon: '✨' });
      return;
    }

    try {
      const commentRef = doc(db, 'blog_interactions', slug, 'comments', id);
      await updateDoc(commentRef, {
        [type]: increment(1)
      });
      
      localStorage.setItem(storageKey, 'true');
      toast(type === 'likes' ? 'Anjay! Like lo masuk ❤️' : 'Mantap! Info ini emang helpful 🙌', { 
        icon: type === 'likes' ? '🔥' : '💡', 
        duration: 1500 
      });
    } catch (error) {
      // For dummy comments, just update local state visually
      setComments(prev => prev.map(c => 
        c.id === id ? { ...c, [type]: (c[type] || 0) + 1 } : c
      ));
      localStorage.setItem(storageKey, 'true');
      toast('Reaksi dicatat secara lokal (Dummy)! 🚀');
    }
  };

  const mainComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  return (
    <div className="mt-24 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 shadow-sm">
            <MessageSquare size={20} />
          </div>
          <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight m-0">
            Obrolan Komunitas ({comments.length})
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles size={12} className="text-purple-600" />
          Join The Vibe
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[26px] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
        <div className="relative bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm">
          {replyTo && (
            <div className="mb-4 p-3 bg-purple-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-purple-700">
                <Reply size={14} />
                <span>Balas ke: <span className="font-bold">{replyTo.authorName}</span></span>
              </div>
              <button 
                type="button"
                onClick={() => setReplyTo(null)}
                className="text-[10px] font-bold text-purple-400 hover:text-purple-600 uppercase tracking-wider"
              >
                Batal
              </button>
            </div>
          )}
          <textarea
            ref={commentInputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Tulis balasan lo..." : "Tulis opini lo di sini... spill info menarik atau tanya-tanya gaspol!"}
            className="w-full min-h-[100px] bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 font-sans resize-none"
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={16} />
              </div>
              <span className="text-xs font-medium text-slate-500">
                {user ? `Posting sebagai ${user.displayName}` : 'Posting sebagai Anonim'}
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="bg-purple-900 hover:bg-purple-950 disabled:bg-slate-300 text-white px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              {isSubmitting ? 'Lagi Dikirim...' : 'Kirim Komentar'}
              <Send size={14} />
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white border border-slate-100 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-slate-200 rounded" />
                    <div className="w-20 h-3 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-slate-100 rounded" />
                  <div className="w-3/4 h-4 bg-slate-100 rounded" />
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex gap-6">
                  <div className="w-16 h-4 bg-slate-50 rounded" />
                  <div className="w-16 h-4 bg-slate-50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {mainComments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <CommentCard 
                  comment={comment} 
                  onLike={() => handleReaction(comment.id, 'likes')} 
                  onHelpful={() => handleReaction(comment.id, 'helpful')} 
                  onReply={() => handleReply(comment)} 
                />
                
                {/* Replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="pl-6 sm:pl-12 space-y-4 border-l-2 border-slate-100">
                    {getReplies(comment.id).map(reply => (
                      <CommentCard 
                        key={reply.id} 
                        comment={reply} 
                        onLike={() => handleReaction(reply.id, 'likes')} 
                        onHelpful={() => handleReaction(reply.id, 'helpful')} 
                        onReply={() => handleReply(reply)}
                        isReply 
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function CommentCard({ comment, onLike, onHelpful, onReply, isReply }: { 
  comment: Comment, 
  onLike: () => void, 
  onHelpful: () => void,
  onReply: () => void, 
  isReply?: boolean 
}) {
  const dateStr = new Date(comment.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-3xl border transition-all group ${
        isReply ? 'bg-white border-slate-100 scale-95 origin-left' : 'bg-slate-50 border-slate-200 hover:border-purple-200 hover:bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border ${
            isReply ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-purple-100 text-purple-700 border-purple-200'
          }`}>
            {comment.authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900">{comment.authorName}</span>
              {comment.isVerified && (
                <div className="p-0.5 rounded-full bg-blue-100 text-blue-600">
                  <ShieldCheck size={12} />
                </div>
              )}
              {comment.moderationStatus === 'pending' && (
                <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-600 font-bold border border-amber-100 rounded">PENDING</span>
              )}
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{dateStr}</span>
          </div>
        </div>
        <button className="text-slate-300 hover:text-slate-500 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <p className="text-slate-700 font-sans leading-relaxed text-sm sm:text-base">
        {comment.content}
      </p>

      <div className="mt-5 pt-4 border-t border-slate-200/50 flex items-center flex-wrap gap-4 sm:gap-6">
        <button 
          onClick={onLike}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors group/like"
        >
          <Heart size={14} className="group-hover/like:fill-rose-600 transition-all" />
          {comment.likes} Like
        </button>
        
        <button 
          onClick={onHelpful}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors group/help"
        >
          <Lightbulb size={14} className="group-hover/help:text-amber-500 transition-all" />
          {comment.helpful || 0} Helpful
        </button>

        <button 
          onClick={onReply}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-700 transition-colors"
        >
          <MessageSquare size={14} />
          Balas
        </button>
        
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none ml-auto">
          <ThumbsUp size={12} />
          Vibe Check Passed
        </div>
      </div>
    </motion.div>
  );
}
