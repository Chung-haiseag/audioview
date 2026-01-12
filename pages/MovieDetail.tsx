import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Disc, X, Pause, Play, Settings, Glasses, AlertCircle, GripHorizontal, CheckCircle, Type } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';

const FONT_SIZES = ['small', 'medium', 'large', 'xlarge'];
const FONT_LABELS: Record<string, string> = {
  small: '작게',
  medium: '보통',
  large: '크게',
  xlarge: '매우 크게'
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = MOCK_MOVIES.find((m) => m.id === id) || MOCK_MOVIES[0];

  const [viewState, setViewState] = useState<'selection' | 'syncing' | 'complete' | 'playing'>('selection');
  const [adSelected, setAdSelected] = useState(false);
  const [ccSelected, setCcSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isGlassesConnected, setIsGlassesConnected] = useState(true);

  // Subtitle Style State
  const [currentFontSize, setCurrentFontSize] = useState(() => localStorage.getItem('captionFontSize') || 'medium');
  const [showSizeHUD, setShowSizeHUD] = useState(false);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drag & Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [verticalOffset, setVerticalOffset] = useState(() => {
    const saved = localStorage.getItem('captionVerticalOffset');
    return saved ? parseFloat(saved) : 80; 
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized styles
  const captionStyles = useMemo(() => {
    const color = localStorage.getItem('captionFontColor') || '#FFFFFF';
    const opacity = Number(localStorage.getItem('captionBgOpacity')) ?? 0.5;
    
    const fontScaleMap: Record<string, string> = {
      small: '1rem',
      medium: '1.4rem',
      large: '1.9rem',
      xlarge: '2.5rem'
    };

    return {
      fontSize: fontScaleMap[currentFontSize],
      color,
      backgroundColor: `rgba(0, 0, 0, ${opacity})`
    };
  }, [currentFontSize, viewState]);

  // Volume Button Listener for Font Size
  useEffect(() => {
    if (viewState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Volume Up/Down keys
      if (e.key === 'AudioVolumeUp' || e.key === 'VolumeUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        adjustFontSize(1);
      } else if (e.key === 'AudioVolumeDown' || e.key === 'VolumeDown' || e.key === 'ArrowDown') {
        e.preventDefault();
        adjustFontSize(-1);
      }
    };

    const adjustFontSize = (direction: number) => {
      const currentIndex = FONT_SIZES.indexOf(currentFontSize);
      const nextIndex = Math.max(0, Math.min(FONT_SIZES.length - 1, currentIndex + direction));
      const nextSize = FONT_SIZES[nextIndex];
      
      if (nextSize !== currentFontSize) {
        setCurrentFontSize(nextSize);
        localStorage.setItem('captionFontSize', nextSize);
        
        // Show HUD
        setShowSizeHUD(true);
        if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
        hudTimerRef.current = setTimeout(() => setShowSizeHUD(false), 2000);
        
        // Vibration feedback if supported
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFontSize, viewState]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (viewState === 'syncing') {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
        timer = setTimeout(() => { setViewState('complete'); }, 2500);
    } else if (viewState === 'complete') {
        timer = setTimeout(() => { setViewState('playing'); }, 800);
    }
    return () => clearTimeout(timer);
  }, [viewState]);

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

  // Drag Handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    let newY = ((clientY - containerRect.top) / containerRect.height) * 100;
    newY = Math.max(10, Math.min(90, newY));
    setVerticalOffset(newY);
  };

  const onDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('captionVerticalOffset', verticalOffset.toString());
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDrag, { passive: false });
      window.addEventListener('touchend', onDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [isDragging]);

  if (!movie) return null;

  // 1. 재생 중 화면 (Playing State)
  if (viewState === 'playing') {
      return (
        <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col font-sans animate-fadeIn select-none overflow-hidden">
            {/* Font Size HUD */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[110] transition-all duration-300 pointer-events-none ${showSizeHUD ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
               <div className="bg-black/80 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                  <Type size={20} className="text-[#E50914]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">자막 크기</span>
                    <span className="text-white font-black text-sm">{FONT_LABELS[currentFontSize]}</span>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {FONT_SIZES.map((size) => (
                      <div key={size} className={`w-1.5 h-4 rounded-full transition-colors ${FONT_SIZES.indexOf(currentFontSize) >= FONT_SIZES.indexOf(size) ? 'bg-[#E50914]' : 'bg-gray-700'}`} />
                    ))}
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between px-4 py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-20">
                <div className="flex items-center">
                    <button onClick={() => setViewState('selection')} className="text-white mr-3">
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
                    <button onClick={() => navigate('/settings')} className="text-gray-400"><Settings size={24} /></button>
                </div>
            </div>

            <div ref={containerRef} className="flex-1 relative transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <img src={movie.posterUrl} className="w-full h-full object-cover blur-sm" alt="" />
                    <div className="absolute inset-0 bg-brand-dark/80"></div>
                </div>

                <div 
                  className={`absolute left-6 right-6 z-10 space-y-4 transition-transform duration-75 ${isDragging ? 'scale-[1.02]' : ''}`}
                  style={{ top: `${verticalOffset}%`, transform: 'translateY(-50%)' }}
                >
                    {adSelected && (
                        <div 
                            className="relative group p-5 rounded-2xl border-l-4 border-[#F5C518] shadow-2xl mx-auto transition-all touch-none"
                            style={{ 
                                fontSize: captionStyles.fontSize,
                                color: '#FEF3C7',
                                backgroundColor: captionStyles.backgroundColor,
                                width: '100%',
                                borderBottom: isDragging ? '2px solid rgba(245, 197, 24, 0.5)' : 'none'
                            }}
                        >
                            <div 
                              onMouseDown={onDragStart} 
                              onTouchStart={onDragStart}
                              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full px-3 py-1 cursor-grab active:cursor-grabbing border border-gray-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <GripHorizontal size={14} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400">MOVE</span>
                            </div>
                            <span className="text-[#F5C518] text-xs font-bold mb-2 block uppercase tracking-wider">AD (화면해설)</span>
                            <p className="font-medium leading-relaxed">남자가 주위를 두리번거리며 천천히 뒷걸음질 친다.</p>
                        </div>
                    )}

                    {ccSelected && (
                        <div 
                            className="relative group p-6 rounded-2xl border-l-4 border-[#E50914] shadow-2xl mx-auto transition-all touch-none"
                            style={{ 
                                fontSize: captionStyles.fontSize,
                                color: localStorage.getItem('captionFontColor') || '#FFFFFF',
                                backgroundColor: captionStyles.backgroundColor,
                                width: '100%',
                                borderBottom: isDragging ? '2px solid rgba(229, 9, 20, 0.5)' : 'none'
                            }}
                        >
                            <div 
                              onMouseDown={onDragStart} 
                              onTouchStart={onDragStart}
                              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full px-3 py-1 cursor-grab active:cursor-grabbing border border-gray-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <GripHorizontal size={14} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400">MOVE</span>
                            </div>
                            <span className="text-white/60 text-xs font-bold mb-2 block uppercase tracking-wider">대사</span>
                            <p className="font-bold leading-relaxed">"대체 여기서 무슨 일이 벌어지고 있는 거야?"</p>
                            {!isGlassesConnected && (
                                <div className="mt-4 p-2 bg-red-900/20 border border-red-900/40 rounded-lg flex items-center gap-2">
                                    <AlertCircle size={14} className="text-red-400 shrink-0" />
                                    <span className="text-[10px] text-red-300">스마트 글래스가 연결되지 않았습니다.</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {!isDragging && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none text-center">
                    <div className="flex flex-col items-center gap-2">
                      <GripHorizontal size={40} />
                      <p className="text-[10px] font-bold uppercase tracking-widest">드래그로 위치 조절</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Type size={16} />
                        <p className="text-[10px] font-bold uppercase tracking-widest">볼륨 버튼으로 크기 조절</p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="bg-[#121212] border-t border-white/10 px-6 py-6 pb-10 z-20">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">00:15:24</span>
                    <div className="h-1 flex-1 mx-4 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[30%] bg-[#E50914]"></div>
                    </div>
                    <span className="text-xs text-gray-500">01:42:10</span>
                 </div>
                 <div className="flex items-center justify-center gap-8">
                    <button className="text-gray-400"><Disc size={24}/></button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black active:scale-95 transition-transform">
                        {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1"/>}
                    </button>
                    <button className="text-gray-400" onClick={() => setViewState('selection')}><X size={24}/></button>
                 </div>
            </div>
        </div>
      );
  }

  // 2. 동기화 중 화면 (Syncing State)
  if (viewState === 'syncing' || viewState === 'complete') {
     return (
        <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center font-sans animate-fadeIn overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-brand-dark to-brand-dark"></div>
            <div className="relative z-10 flex flex-col items-center w-full px-8">
                <div className="relative w-64 h-64 flex items-center justify-center mb-16">
                    <div className={`absolute inset-0 rounded-full border border-white/5 ${viewState === 'syncing' ? 'animate-[spin_10s_linear_infinite]' : ''}`}></div>
                    <div className={`absolute w-40 h-40 rounded-full bg-[#E50914] blur-[60px] opacity-60 ${viewState === 'syncing' ? 'animate-pulse' : 'scale-150 transition-transform duration-700'}`}></div>
                    
                    {viewState === 'syncing' ? (
                        <div className="flex items-end justify-center gap-1.5 h-24 mb-2">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2 bg-gradient-to-t from-[#E50914] to-red-400 rounded-full animate-[bounce_1.2s_infinite]" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    ) : (
                        <div className="animate-scaleIn">
                            <CheckCircle size={80} className="text-white" />
                        </div>
                    )}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-3">
                    {viewState === 'syncing' ? '실시간 동기화 중' : '동기화 완료'}
                </h2>
                <p className="text-gray-400 text-sm text-center">
                    {viewState === 'syncing' ? '영화 소리를 분석하여 최적의 지점을 찾고 있습니다.' : '잠시 후 재생 화면으로 이동합니다.'}
                </p>
            </div>
            <button onClick={() => setViewState('selection')} className="absolute top-6 right-6 p-3 rounded-full bg-white/5 backdrop-blur-sm text-white/70"><X size={24} /></button>
        </div>
     )
  }

  // 3. 작품 선택 화면 (Selection State)
  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden bg-brand-dark text-white font-sans">
      <div className="absolute inset-0 z-0">
          <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
      </div>

      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white active:scale-90 transition-all">
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-20 flex flex-col justify-end h-full">
         <div className="w-full max-w-md mx-auto">
             <div className="mb-12 text-center">
                 <h1 className="text-4xl font-bold mb-4 drop-shadow-lg leading-tight px-4">{movie.title}</h1>
                 <div className="flex items-center justify-center space-x-3 text-sm font-medium text-gray-200">
                    <span>{movie.year}</span>
                    <span className="bg-white/20 px-1.5 rounded text-[10px] border border-white/30">HD</span>
                    <span>{movie.duration}분</span>
                 </div>
             </div>

             <div className="flex flex-col items-center w-full">
                 <div className="w-[85%] grid grid-cols-2 gap-5">
                    <button 
                        onClick={handleStartAD}
                        className="group flex flex-col items-center justify-center bg-[#121212]/95 border border-white/10 rounded-2xl p-8 aspect-[4/5] shadow-2xl hover:bg-[#1A1A1A] active:scale-95 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1c222b] flex items-center justify-center mb-5 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                            <Disc size={36} />
                        </div>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-1">화면해설</span>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-3">(AD)</span>
                    </button>

                    <button 
                        onClick={handleStartCC}
                        className="group flex flex-col items-center justify-center bg-[#121212]/95 border border-white/10 rounded-2xl p-8 aspect-[4/5] shadow-2xl hover:bg-[#1A1A1A] active:scale-95 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1c222b] flex items-center justify-center mb-5 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                            <span className="text-xl font-black">CC</span>
                        </div>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-1">문자자막</span>
                        <span className="text-base font-bold text-gray-300 group-hover:text-white mb-3">(CC)</span>
                    </button>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default MovieDetail;
