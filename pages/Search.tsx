import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Mic, X, Film, PlayCircle, ChevronLeft } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';
import { ADBadge, CCBadge } from '../components/Badges';

const RECOMMENDED_TAGS = ['액션', '가치봄', '한국 영화', '인사이드 아웃', '데몬 헌터스', '공포'];

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return MOCK_MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.genres.some(g => g.toLowerCase().includes(lowerQuery)) ||
      movie.country.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition;
    
    if (!SpeechRecognition && !(window as any).webkitSpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. 크롬 브라우저를 권장합니다.');
      return;
    }

    const recognition = new (SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error('음성 인식 오류:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col relative">
      {/* Recording Overlay */}
      {isRecording && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
          {/* 상단 좌측 뒤로가기 버튼 복구 */}
          <div className="absolute top-6 left-6">
            <button onClick={() => setIsRecording(false)} className="text-white active:scale-90 transition-transform">
              <ChevronLeft size={28} />
            </button>
          </div>
          
          <div className="relative flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-10">
              {/* 애니메이션 링 */}
              <div className="absolute inset-0 border-4 border-[#E50914]/30 rounded-full animate-ping"></div>
              <div className="absolute inset-4 border-2 border-[#E50914]/50 rounded-full animate-pulse"></div>
              
              <div className="w-24 h-24 bg-[#E50914] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(229,9,20,0.6)] z-10">
                <Mic size={44} className="text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">듣고 있습니다...</h3>
            <p className="text-gray-400 text-sm mb-12">찾으시는 작품의 이름을 말씀해주세요.</p>

            {/* 시각화 바 애니메이션 */}
            <div className="flex items-end gap-1.5 h-12">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#E50914] rounded-full animate-bounce" 
                  style={{ 
                    height: `${20 + Math.random() * 80}%`,
                    animationDuration: `${0.6 + Math.random() * 0.8}s`,
                    animationDelay: `${i * 0.05}s`
                  }} 
                />
              ))}
            </div>
          </div>
          <button onClick={() => setIsRecording(false)} className="mt-16 px-10 py-3 bg-white/10 rounded-full text-white font-bold">취소</button>
        </div>
      )}

      {/* Search Input Area */}
      <div className="px-4 py-4 sticky top-0 z-10 bg-[#141414] border-b border-white/5">
        <div className="relative flex items-center bg-[#2F2F2F] rounded-xl overflow-hidden group focus-within:ring-2 focus-within:ring-[#E50914]/50 transition-all">
          <div className="pl-4 text-gray-400 group-focus-within:text-white transition-colors">
            <SearchIcon size={20} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="영화, 시리즈, 배우 검색" 
            className="flex-1 bg-transparent border-none outline-none py-4 px-3 text-white placeholder-gray-500 text-base"
            autoFocus={!isRecording}
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-2 mr-1 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          )}
          <button 
            onClick={startVoiceSearch}
            className={`pr-4 transition-transform active:scale-90 ${isRecording ? 'text-[#E50914]' : 'text-[#F5C518]'}`}
          >
            <Mic size={22} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        {query.trim() === '' ? (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-2 mb-6">
              <PlayCircle size={18} className="text-[#E50914]" />
              <h3 className="text-lg font-bold text-white">추천 검색어</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {RECOMMENDED_TAGS.map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => setQuery(tag)}
                  className="px-5 py-2.5 bg-[#1A1A1A] border border-gray-800 rounded-full text-sm font-medium text-gray-300 hover:bg-[#2F2F2F] hover:text-white hover:border-gray-700 transition-all active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            {results.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-5">
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">검색 결과 ({results.length})</h3>
                </div>
                <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                  {results.map((movie) => (
                    <div 
                      key={movie.id} 
                      onClick={() => handleMovieClick(movie.id)}
                      className="relative aspect-[2/3] rounded-md overflow-hidden border border-white/5 shadow-lg bg-[#1A1A1A] group cursor-pointer active:scale-95 transition-transform"
                    >
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-2 pb-1.5">
                         <h3 className="text-[11px] font-bold text-white leading-tight mb-1 line-clamp-1 drop-shadow-md">
                            {movie.title}
                         </h3>
                         <div className="flex gap-1 flex-wrap">
                            {movie.hasAD && <ADBadge />}
                            {movie.hasCC && <CCBadge />}
                         </div>
                      </div>
                      {/* 가치봄 배지 */}
                      {movie.hasAD && movie.hasCC && (
                          <div className="absolute top-1.5 right-1.5 bg-white px-1 py-0.5 rounded-[2px] shadow-lg flex flex-col items-center scale-75 origin-top-right">
                              <span className="text-[6px] font-black text-[#0051C4] block leading-none tracking-tighter mb-0.5">WITH</span>
                              <span className="text-[9px] font-black text-[#0051C4] block leading-none">가치봄</span>
                          </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center">
                <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6 border border-gray-800">
                  <Film size={36} className="text-gray-700" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">찾으시는 영화가 없나요?</h4>
                <p className="text-gray-500 text-sm">입력하신 검색어 '{query}'와(과)<br/>일치하는 결과가 없습니다.</p>
                <button 
                  onClick={() => navigate('/help/request')}
                  className="mt-8 text-[#E50914] font-bold text-sm border-b border-[#E50914] pb-0.5"
                >
                  작품 요청하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-10" />
    </div>
  );
};

export default SearchPage;