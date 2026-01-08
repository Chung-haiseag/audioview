import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Mic, Disc, X, CheckCircle, Pause, Play, Settings, Glasses, AlertCircle } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = MOCK_MOVIES.find((m) => m.id === id) || MOCK_MOVIES[0];

  const [viewState, setViewState] = useState<'selection' | 'syncing' | 'complete' | 'playing'>('selection');
  const [adSelected, setAdSelected] = useState(false);
  const [ccSelected, setCcSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isGlassesConnected, setIsGlassesConnected] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (viewState === 'syncing') {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
        timer = setTimeout(() => { setViewState('complete'); }, 5000);
    } else if (viewState === 'complete') {
        timer = setTimeout(() => { setViewState('playing'); }, 2000);
    }
    return () => clearTimeout(timer);
  }, [viewState]);

  // Action handlers to start syncing immediately
  const handleStartAD = () => {
    setAdSelected(true);
    setCcSelected(false);
    setViewState('syncing');
  };

  const handleStartCC = () => {
    setAdSelected(false);
    setCcSelected(true);
    setViewState('syncing');
  };

  if (!movie) return null;

  if (viewState === 'playing') {
      return (
        <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col font-sans animate-fadeIn">
            <div className="flex items-center justify-between px-4 py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-20">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-white mr-3">
                        <ChevronLeft size={28} />
                    </button>
                    <div>
                        <h2 className="text-white font-bold text-lg leading-none">{movie.title}</h2>
                        <span className="text-red-500 text-xs font-medium">● 실시간 동기화 중</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {ccSelected && (
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border ${isGlassesConnected ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                            <Glasses size={12} />{isGlassesConnected ? '글래스 연결됨' : '글래스 미연결'}
                        </div>
                    )}
                    <button className="text-gray-400"><Settings size={24} /></button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
                <div className="absolute inset-0 z-0 opacity-20"><img src={movie.posterUrl} className="w-full h-full object-cover blur-sm" alt="" /><div className="absolute inset-0 bg-brand-dark/80"></div></div>
                <div className="relative z-10 space-y-8 mt-10">
                    <div className="opacity-40 space-y-4">
                        {adSelected && <div className="bg-[#1A1A1A]/80 p-4 rounded-xl border border-white/5"><span className="text-[#F5C518] text-xs font-bold mb-1 block">AD (화면해설)</span><p className="text-gray-300 text-lg font-light">어두운 지하실, 희미한 조명 아래 남자가 서 있다.</p></div>}
                        {ccSelected && <div className="bg-brand-dark/60 p-4 rounded-xl border border-white/5"><span className="text-white/60 text-xs font-bold mb-1 block">CC (소리)</span><p className="text-white text-xl">(저벅 저벅 발자국 소리)</p></div>}
                    </div>
                    <div className="animate-slideUp space-y-6">
                        {ccSelected && <div className="bg-brand-dark/90 p-5 rounded-2xl border-l-4 border-[#E50914] shadow-lg"><span className="text-white/60 text-xs font-bold mb-2 block">대사</span><p className="text-white text-3xl font-bold leading-relaxed">"대체 여기서 무슨 일이 벌어지고 있는 거야?"</p>{!isGlassesConnected && <div className="mt-4 p-2 bg-red-900/20 border border-red-900/40 rounded-lg flex items-center gap-2"><AlertCircle size={14} className="text-red-400 shrink-0" /><span className="text-[10px] text-red-300">스마트 글래스가 연결되지 않았습니다.</span></div>}</div>}
                        {adSelected && <div className="bg-[#2A2A2A] p-5 rounded-2xl border-l-4 border-[#F5C518] shadow-lg"><span className="text-[#F5C518] text-xs font-bold mb-2 block">AD (화면해설)</span><p className="text-yellow-100 text-2xl font-medium leading-relaxed">남자가 주위를 두리번거리며 천천히 뒷걸음질 친다.</p></div>}
                    </div>
                </div>
            </div>
            <div className="bg-[#121212] border-t border-white/10 px-6 py-6 pb-10">
                 <div className="flex items-center justify-between mb-4"><span className="text-xs text-gray-500">00:15:24</span><div className="h-1 flex-1 mx-4 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-[30%] bg-[#E50914]"></div></div><span className="text-xs text-gray-500">01:42:10</span></div>
                 <div className="flex items-center justify-center gap-8"><button className="text-gray-400"><Disc size={24}/></button><button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black">{isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1"/>}</button><button className="text-gray-400" onClick={() => navigate(-1)}><X size={24}/></button></div>
            </div>
        </div>
      );
  }

  if (viewState === 'syncing') {
     return (
        <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center font-sans animate-fadeIn overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-brand-dark to-brand-dark"></div>
            <div className="relative z-10 flex flex-col items-center w-full px-8">
                <div className="relative w-64 h-64 flex items-center justify-center mb-16">
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute w-40 h-40 rounded-full bg-[#E50914] blur-[60px] animate-pulse opacity-60"></div>
                    <div className="flex items-end justify-center gap-1.5 h-24 mb-2">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-2 bg-gradient-to-t from-[#E50914] to-red-400 rounded-full animate-[bounce_1.2s_infinite]" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">동기화 중...</h2>
                <p className="text-gray-400 text-sm text-center">영화 소리를 분석하고 있습니다.</p>
            </div>
            <button onClick={() => { setViewState('selection'); setAdSelected(false); setCcSelected(false); }} className="absolute top-6 right-6 p-3 rounded-full bg-white/5 backdrop-blur-sm text-white/70"><X size={24} /></button>
        </div>
     )
  }

  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden bg-brand-dark text-white font-sans">
      {/* Background Poster */}
      <div className="absolute inset-0 z-0">
          <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
      </div>

      {/* 상단 뒤로가기 버튼 */}
      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white active:scale-90 transition-all">
          <ChevronLeft size={28} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-20 flex flex-col justify-end h-full">
         <div className="w-full max-w-md mx-auto">
             {/* Title & Info */}
             <div className="mb-12 text-center">
                 <h1 className="text-4xl font-bold mb-4 drop-shadow-lg leading-tight px-4">{movie.title}</h1>
                 <div className="flex items-center justify-center space-x-3 text-sm font-medium text-gray-200">
                    <span>{movie.year}</span>
                    <span className="bg-white/20 px-1.5 rounded text-[10px] border border-white/30">HD</span>
                    <span>{movie.duration}분</span>
                 </div>
             </div>

             {/* Action Buttons */}
             <div className="flex flex-col items-center w-full">
                 <div className="w-[85%] grid grid-cols-2 gap-5">
                    {/* AD Button */}
                    <button 
                        onClick={handleStartAD}
                        className="group flex flex-col items-center justify-center bg-[#121212]/95 border border-white/10 rounded-2xl p-8 aspect-[4/5] shadow-2xl hover:bg-[#1A1A1A] active:scale-95 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1c222b] flex items-center justify-center mb-5 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                            <Disc size={36} />
                        </div>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-1">화면해설</span>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-3">(AD)</span>
                        <div className="flex flex-col items-center space-y-0.5 opacity-60 group-hover:opacity-100">
                            <span className="text-[11px] text-gray-500 font-medium group-hover:text-white leading-none">음성 가이드</span>
                            <span className="text-[11px] text-gray-500 font-medium group-hover:text-white leading-none">시작</span>
                        </div>
                    </button>

                    {/* CC Button */}
                    <button 
                        onClick={handleStartCC}
                        className="group flex flex-col items-center justify-center bg-[#121212]/95 border border-white/10 rounded-2xl p-8 aspect-[4/5] shadow-2xl hover:bg-[#1A1A1A] active:scale-95 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1c222b] flex items-center justify-center mb-5 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                            <span className="text-xl font-black">CC</span>
                        </div>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-1">문자자막</span>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-3">(CC)</span>
                        <div className="flex flex-col items-center space-y-0.5 opacity-60 group-hover:opacity-100">
                            <span className="text-[11px] text-gray-500 font-medium group-hover:text-white leading-none">텍스트 자막</span>
                            <span className="text-[11px] text-gray-500 font-medium group-hover:text-white leading-none">시작</span>
                        </div>
                    </button>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default MovieDetail;