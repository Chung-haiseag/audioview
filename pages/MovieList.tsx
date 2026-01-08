import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, ChevronLeft } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';
import { ADBadge, CCBadge } from '../components/Badges';

const MovieList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Filtering Logic
  const filteredMovies = MOCK_MOVIES.filter(movie => {
    if (!category) return true;
    if (category === '전체') return true;
    if (category === '해외') return movie.country !== '대한민국' && movie.country !== '한국' || movie.genres.includes('해외');
    if (category === '가치봄') return movie.hasAD && movie.hasCC;
    
    // 장르 또는 카테고리 이름 포함 확인
    return movie.genres.some(g => g.includes(category)) || (category === '영화' && movie.genres.includes('영화'));
  });

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col font-sans animate-fadeIn">
      {/* Category Title */}
      <div className="px-5 pt-4 pb-2">
         <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#E50914] rounded-full"></div>
            <h2 className="text-2xl font-black text-white">{category} <span className="text-gray-600 text-lg ml-1 font-medium">{filteredMovies.length}</span></h2>
         </div>
         <p className="text-gray-500 text-xs font-medium">AUDIOVIEW가 엄선한 {category} 리스트입니다.</p>
      </div>

      {/* Grid Content */}
      <div className="p-4 flex-1">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {filteredMovies.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="relative flex flex-col cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 shadow-xl bg-[#1A1A1A] mb-2">
                  {/* Poster Image */}
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* '가치봄' Badge - Top Right */}
                  {movie.hasAD && movie.hasCC && (
                      <div className="absolute top-1.5 right-1.5 bg-white px-1 py-0.5 rounded-[2px] shadow-lg flex flex-col items-center scale-75 origin-top-right">
                          <span className="text-[6px] font-black text-[#0051C4] block leading-none tracking-tighter mb-0.5">WITH</span>
                          <span className="text-[9px] font-black text-[#0051C4] block leading-none">가치봄</span>
                      </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute bottom-1.5 left-1.5 flex gap-1">
                      {movie.hasAD && <ADBadge />}
                      {movie.hasCC && <CCBadge />}
                  </div>
                </div>
                
                <h3 className="text-[11px] font-bold text-gray-200 leading-tight line-clamp-2 px-0.5">
                    {movie.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-gray-600">
             <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4 border border-gray-800">
                <Grid size={32} className="opacity-20" />
             </div>
             <p className="text-sm">해당 카테고리의 콘텐츠가 아직 없습니다.</p>
          </div>
        )}
      </div>
      <div className="h-10" />
    </div>
  );
};

export default MovieList;