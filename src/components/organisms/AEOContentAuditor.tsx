import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Lightbulb, Search, ScanLine, Activity } from 'lucide-react';

interface AuditResult {
  type: 'success' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export default function AEOContentAuditor() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState<AuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [mode, setMode] = useState<'text' | 'dom'>('text');
  const [snippetScore, setSnippetScore] = useState<number | null>(null);

  const runAudit = (textContent?: string) => {
    setIsAuditing(true);
    setSnippetScore(null);
    
    setTimeout(() => {
      const newResults: AuditResult[] = [];
      const paragraphs = textContent ? textContent.split(/\n+/) : content.split(/\n+/);
      
      const questionPatterns = /(apa itu|bagaimana cara|mengapa|apa yang dimaksud|kenapa|what is|how to)/i;
      const localITKeywords = /(bsd|cisauk|tangerang|jasa|pembuatan|website|solusi it|ai automation|web development)/i;
      
      let foundSnippetOpportunity = false;
      let score = 100;

      const analyzeTextKeywords = (text: string) => {
        if (!localITKeywords.test(text)) {
          newResults.push({
            type: 'info',
            message: 'Kepadatan kata kunci lokal/IT rendah.',
            suggestion: 'Sisipkan kata kunci penunjang intensi seperti "Jasa Pembuatan Website", "Solusi IT", atau area "BSD/Tangerang" untuk memicu AEO lokal.'
          });
          score -= 15;
        } else {
          newResults.push({
            type: 'success',
            message: 'Kepadatan kata kunci lokal & IT (Intent-Rich) terdeteksi dengan baik.'
          });
        }
      };

      if (mode === 'dom') {
        const pTags = document.querySelectorAll('p');
        const textContext = Array.from(pTags).map(p => p.textContent).join(' ');
        
        analyzeTextKeywords(textContext);

        pTags.forEach(p => {
          const text = p.textContent || '';
          if (text.trim().length === 0) return;
          
          let prev = p.previousElementSibling;
          let hasHeading = false;
          let headingText = '';
          while (prev) {
            if (prev.tagName === 'H2' || prev.tagName === 'H3') {
              hasHeading = true;
              headingText = prev.textContent || '';
              break;
            }
            prev = prev.previousElementSibling;
          }

          if (hasHeading && questionPatterns.test(headingText)) {
            foundSnippetOpportunity = true;
            const wordCount = text.trim().split(/\s+/).length;
            if (wordCount < 40) {
              newResults.push({
                type: 'warning',
                message: `Jawaban AEO di bawah "${headingText.substring(0, 20)}..." terlalu singkat (${wordCount} kata).`,
                suggestion: 'Google SGE menyukai 40-60 kata. Perpanjang penjelasan.'
              });
              score -= 10;
            } else if (wordCount > 60) {
              newResults.push({
                type: 'warning',
                message: `Jawaban AEO di bawah "${headingText.substring(0, 20)}..." terlalu panjang (${wordCount} kata).`,
                suggestion: 'Persingkat menjadi 40-60 kata atau gunakan format list.'
              });
              score -= 10;
            } else {
              newResults.push({
                type: 'success',
                message: `Paragraf sempurna (${wordCount} kata) untuk heading "${headingText.substring(0, 20)}...".`
              });
            }
          } else if (questionPatterns.test(text)) {
            newResults.push({
              type: 'warning',
              message: `Pertanyaan ditemukan ("${text.substring(0, 20)}...") tetapi tidak dalam tag H2/H3.`,
              suggestion: 'Ubah teks ini menjadi header H2/H3 (FAQ Format).'
            });
            score -= 15;
          }
        });

        if (pTags.length > 0 && !foundSnippetOpportunity) {
          newResults.push({
            type: 'warning',
            message: 'Tidak ditemukan struktur AEO (H2/H3 pertanyaan) pada DOM halaman ini.',
            suggestion: 'Refactor paragraf menjadi format "What is" atau "How to" dengan H2/H3.'
          });
          score -= 30;
        }
      } else {
        analyzeTextKeywords(content);

        paragraphs.forEach((p, index) => {
          if (questionPatterns.test(p)) {
            foundSnippetOpportunity = true;
            const nextPara = paragraphs[index + 1];
            if (nextPara) {
              const wordCount = nextPara.trim().split(/\s+/).length;
              if (wordCount < 40) {
                newResults.push({ type: 'warning', message: `Pertanyaan potensial, tapi jawaban terlalu singkat (${wordCount} kata).`, suggestion: 'Google butuh 40-60 kata.' });
                score -= 10;
              } else if (wordCount > 60) {
                newResults.push({ type: 'warning', message: `Pertanyaan potensial, tapi jawaban terlalu panjang (${wordCount} kata).`, suggestion: 'Google butuh 40-60 kata.' });
                score -= 10;
              } else {
                newResults.push({ type: 'success', message: `Jawaban sempurna untuk AEO! (${wordCount} kata)` });
              }
            } else {
              newResults.push({ type: 'warning', message: `Pertanyaan tanpa jawaban di bawahnya.`, suggestion: 'Tambahkan paragraf jawaban 40-60 kata.' });
              score -= 15;
            }
          }
        });

        if (!foundSnippetOpportunity) {
          newResults.push({ type: 'warning', message: 'Tidak ada pertanyaan potensial ("Apa itu", "Bagaimana cara") yang ditemukan.', suggestion: 'Tambahkan struktur FAQ.' });
          score -= 30;
        }
      }

      setResults(newResults);
      setSnippetScore(Math.max(0, score)); // Ensure score doesn't go below 0
      setIsAuditing(false);
    }, 800);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-rose-500 bg-rose-50 border-rose-200';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <ScanLine size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AEO Content Auditor</h3>
            <p className="text-sm text-slate-500">Scan DOM & Analisis Snippet Score</p>
          </div>
        </div>
        
        {snippetScore !== null && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getScoreColor(snippetScore)}`}>
            <Activity size={16} />
            <span className="font-bold font-mono text-sm">Score: {snippetScore}/100</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
        <button 
          onClick={() => setMode('text')} 
          className={`flex-1 text-sm font-bold py-2 rounded-md transition-all ${mode === 'text' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Draft Text
        </button>
        <button 
          onClick={() => setMode('dom')} 
          className={`flex-1 text-sm font-bold py-2 rounded-md transition-all ${mode === 'dom' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Live DOM Scan
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {mode === 'text' ? (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste draft artikel blog di sini..."
              className="w-full flex-1 min-h-[140px] p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none font-sans"
            />
            <button
              onClick={() => runAudit()}
              disabled={!content.trim() || isAuditing}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {isAuditing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search size={16} /> Hitung Snippet Score</>}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 border-dashed rounded-lg flex-1">
            <ScanLine size={40} className="text-indigo-300 mb-3" />
            <p className="text-sm text-slate-500 text-center mb-5 max-w-xs">
              Memindai H2/H3 dan panjang paragraf pada DOM halaman ini secara real-time untuk skor AEO.
            </p>
            <button
              onClick={() => runAudit()}
              disabled={isAuditing}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {isAuditing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ScanLine size={16} /> Scan Current Page DOM</>}
            </button>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-2 flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hasil Audit</h4>
            {results.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-3 rounded-lg border flex gap-3 ${
                  res.type === 'success' ? 'bg-emerald-50 border-emerald-100' :
                  res.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                  'bg-blue-50 border-blue-100'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {res.type === 'success' && <CheckCircle2 size={16} className="text-emerald-600" />}
                  {res.type === 'warning' && <AlertTriangle size={16} className="text-amber-600" />}
                  {res.type === 'info' && <Lightbulb size={16} className="text-blue-600" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    res.type === 'success' ? 'text-emerald-800' :
                    res.type === 'warning' ? 'text-amber-800' :
                    'text-blue-800'
                  }`}>
                    {res.message}
                  </p>
                  {res.suggestion && (
                    <p className={`text-xs mt-1 leading-relaxed ${
                      res.type === 'success' ? 'text-emerald-600' :
                      res.type === 'warning' ? 'text-amber-700' :
                      'text-blue-600'
                    }`}>
                      <strong>Saran:</strong> {res.suggestion}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
