import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';
import { ADBadge, CCBadge } from '../components/Badges';

const CATEGORY_CHIPS = ['예능', '드라마', '영화', '시사교양', '애니', '해외'];

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 데이터 분할 (Mock 데이터를 활용해 섹션별로 다르게 노출)
  const newMovies = MOCK_MOVIES.slice(0, 5);
  const popularMovies = [...MOCK_MOVIES].reverse().slice(0, 6);
  const top10Movies = MOCK_MOVIES.slice(0, 10);

  return (
    <div className="bg-brand-dark min-h-screen">
      {/* 상단 카테고리 칩 */}
      <div className="flex overflow-x-auto px-4 py-3 space-x-6 no-scrollbar sticky top-0 bg-[#141414]/90 backdrop-blur-md z-30 border-b border-white/5">
        {CATEGORY_CHIPS.map((chip) => (
          <button 
            key={chip} 
            onClick={() => navigate(`/list/${chip}`)}
            className="flex-none text-gray-400 hover:text-white text-lg font-bold transition-colors whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="space-y-10 pt-6 pb-10">
        
        {/* 섹션 1: 새로 올라온 영화 */}
        <section>
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              새로 올라온 영화
              <ChevronRight className="ml-1 text-gray-500" size={20} />
            </h2>
          </div>
          <div className="flex overflow-x-auto px-4 space-x-3 no-scrollbar">
            {newMovies.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex-none w-32 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1A1A1A] mb-2 shadow-lg">
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 bg-[#0051C4] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-md">NEW</div>
                  {/* 하단 정보 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/40 to-transparent">
                     <div className="flex gap-1">
                        {movie.hasAD && <ADBadge />}
                        {movie.hasCC && <CCBadge />}
                     </div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-gray-300 line-clamp-1 px-1">{movie.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 2: 실시간 인기영화 */}
        <section>
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              실시간 인기영화
              <ChevronRight className="ml-1 text-gray-500" size={20} />
            </h2>
          </div>
          <div className="flex overflow-x-auto px-4 space-x-3 no-scrollbar">
            {popularMovies.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex-none w-32 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1A1A1A] mb-2 shadow-lg border border-white/5">
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <p className="text-[11px] font-medium text-gray-300 line-clamp-1 px-1">{movie.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 3: 오늘의 TOP 10 (순위 숫자 디자인) */}
        <section>
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              오늘의 <span className="text-[#E50914] ml-1.5 mr-1">TOP 10</span>
              <ChevronRight className="text-gray-500" size={20} />
            </h2>
          </div>
          <div className="flex overflow-x-auto px-4 space-x-8 no-scrollbar pb-4">
            {top10Movies.map((movie, index) => (
              <div 
                key={movie.id} 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex-none flex items-end relative cursor-pointer active:scale-95 transition-transform"
              >
                {/* 배경 숫자 디자인 */}
                <span className="absolute -left-7 bottom-[-10px] text-[100px] font-black leading-none italic select-none"
                      style={{ 
                        color: 'transparent', 
                        WebkitTextStroke: '2px rgba(255,255,255,0.4)',
                        fontFamily: 'Impact, sans-serif'
                      }}>
                  {index + 1}
                </span>
                
                {/* 포스터 */}
                <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden bg-[#1A1A1A] shadow-[10px_10px_20px_rgba(0,0,0,0.5)] z-10">
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2">
                     <div className="flex gap-1">
                        {movie.hasAD && <ADBadge />}
                        {movie.hasCC && <CCBadge />}
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="h-10" />
    </div>
  );
};

export default Home;