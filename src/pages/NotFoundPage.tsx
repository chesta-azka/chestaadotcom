import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toast.error('Halaman tidak ditemukan. Mengembalikan...', {
      duration: 3000,
      icon: '🔍',
      style: {
        background: '#1e293b',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '12px',
      }
    });
    
    // Gunakan history state dari React Router untuk memastikan ada halaman sebelumnya di dalam app
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // Fallback aman jika buka link langsung dari tab baru
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
      <div className="flex items-center gap-3 text-slate-500">
        <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-purple-600 animate-spin" />
        <span className="text-sm font-medium font-sans animate-pulse">Mengalihkan...</span>
      </div>
    </div>
  );
}
