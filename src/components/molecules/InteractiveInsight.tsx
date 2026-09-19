import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Zap, Check, BarChart3, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

interface PollOption {
  label: string;
  count: number;
}

interface InteractiveInsightProps {
  title: string;
  options: string[];
  pollId: string;
}

export default function InteractiveInsight({ title: propTitle, options: propOptions, pollId }: InteractiveInsightProps) {
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState<Record<number, number>>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(propTitle);
  const [options, setOptions] = useState(propOptions);

  useEffect(() => {
    const hasVoted = localStorage.getItem(`voted-${pollId}`);
    if (hasVoted) setVoted(true);

    // Fetch Poll metadata (question/options) if it exists
    const pollRef = doc(db, 'polls', pollId);
    getDoc(pollRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.question) setTitle(data.question);
        if (data.options) setOptions(data.options);
      } else {
        // If it doesn't exist, seed it with the props so it's available in Firestore
        setDoc(pollRef, {
          question: propTitle,
          options: propOptions,
          createdAt: new Date().toISOString()
        }, { merge: true });
      }
    });

    const votesRef = collection(db, 'polls', pollId, 'votes');
    const unsubscribe = onSnapshot(votesRef, (snapshot) => {
      const counts: Record<number, number> = {};
      let total = 0;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const idx = data.optionIndex;
        counts[idx] = (counts[idx] || 0) + 1;
        total++;
      });

      // Initialize with 0s for options that haven't been voted on
      options.forEach((_, i) => {
        if (!counts[i]) counts[i] = 0;
      });

      setResults(counts);
      setTotalVotes(total);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pollId, propTitle, propOptions, options.length]);

  const handleVote = async (index: number) => {
    if (voted) return;

    try {
      const votesRef = collection(db, 'polls', pollId, 'votes');
      await addDoc(votesRef, {
        optionIndex: index,
        votedAt: new Date().toISOString(),
        userId: 'anonymous' // Simple for now
      });

      setVoted(true);
      localStorage.setItem(`voted-${pollId}`, 'true');

      toast.success('Mantap! Suara lo udah masuk 🗳️', {
        icon: '🔥',
        style: { borderRadius: '12px', background: '#1e293b', color: '#fff' }
      });
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Duh, gagal ngevote nih. Coba lagi entar ya! 😅');
    }
  };

  if (loading) {
    return (
      <div className="my-12 p-10 rounded-3xl bg-slate-900 border border-slate-800 animate-pulse flex items-center justify-center">
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Lagi loading insight gokil... 🚀</p>
      </div>
    );
  }

  return (
    <div className="my-12 p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <PieChart size={20} />
          </div>
          <h4 className="font-display font-bold text-lg sm:text-xl text-white m-0 tracking-tight leading-tight">
            {title}
          </h4>
        </div>

        <p className="text-slate-400 text-sm mb-8 font-sans">
          Gimana pendapat lo soal tren ini? Spill opini lo sekarang dan liat apa kata dunia engineering 🌍
        </p>

        <div className="space-y-4">
          {options.map((option, i) => {
            const count = results[i] || 0;
            const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            
            return (
              <button
                key={i}
                onClick={() => handleVote(i)}
                disabled={voted}
                className={`w-full relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                  voted 
                    ? 'border-slate-800 bg-slate-800/30 cursor-default' 
                    : 'border-slate-700 bg-slate-800/50 hover:border-purple-500/50 hover:bg-slate-800 cursor-pointer'
                }`}
              >
                {/* Progress Bar Background */}
                <AnimatePresence>
                  {voted && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute inset-0 bg-purple-600/10 z-0"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {voted ? (
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Check size={12} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-600 group-hover:border-purple-500" />
                    )}
                    <span className={`text-sm font-medium ${voted ? 'text-white' : 'text-slate-300'}`}>
                      {option}
                    </span>
                  </div>
                  {voted && (
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {percentage}% ({count})
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {voted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Zap size={14} className="text-yellow-500" />
              <span>{totalVotes} total votes so far. Gaskeun! 🚀</span>
            </div>
            <div className="flex items-center gap-1 text-purple-400 text-xs font-bold uppercase tracking-widest">
              <BarChart3 size={14} />
              Live Result
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
