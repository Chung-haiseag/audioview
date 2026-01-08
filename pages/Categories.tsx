import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Tv, ChevronRight } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';
import { ADBadge, CCBadge } from '../components/Badges';

const SUB_CATEGORIES = {
  movie: ['한국', '해외', '가치봄', '로맨스', '스릴러', '액션', '드라마', '코믹'],
  series: ['한국예능', '미국드라마', '영국드라마', '아시아드라마', '애니', '코믹', '로맨스', '액션', '스릴러', '스포츠']
};

interface MovieRowProps {
  movies: typeof MOCK_MOVIES;
  onMovieClick: (id: string) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ movies, onMovieClick }) => (
  <div className="flex overflow-x-auto px-4 pb-2 space-x-3 no-scrollbar mt-2">
    {movies.map((movie) => (
      <div 
        key={movie.id} 
        onClick={() => onMovieClick(movie.id)}
        className="flex-none w-32 group cursor-pointer active:scale-95 transition-transform"
      >
        <div className="relative aspect-[2/3] rounded-md overflow-hidden mb-2 border border-white/5 shadow-md">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/80 to-transparent flex gap-1">
            {movie.hasAD && <ADBadge />}
            {movie.hasCC && <CCBadge />}
          </div>
        </div>
        <p className="text-[11px] text-gray-300 font-medium truncate px-0.5">{movie.title}</p>
      </div>
    ))}
  </div>
);

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  genres: string[];
  imageOffset: number;
  movies: typeof MOCK_MOVIES;
  onMovieClick: (id: string) => void;
  onGenreClick: (genre: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, icon, genres, imageOffset, movies, onMovieClick, onGenreClick }) => (
  <div className="mb-10 animate-fadeIn">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-4 px-4">
      <div className="flex items-center">
        <span className="text-[#E50914] mr-2">{icon}</span>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      <button className="text-gray-500 hover:text-white transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>

    {/* Sub-category Cards (Horizontal Scroll) */}
    <div className="flex overflow-x-auto px-4 pb-4 space-x-3 no-scrollbar">
      {genres.map((genre, index) => {
        const bgImage = MOCK_MOVIES[(index + imageOffset) % MOCK_MOVIES.length].posterUrl;
        return (
          <div 
            key={genre} 
            onClick={() => onGenreClick(genre)}
            className="flex-none w-28 group cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden mb-1 bg-[#1A1A1A] border border-gray-800">
                <img
                    src={bgImage}
                    alt={genre}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                    <span className="text-white font-bold text-base drop-shadow-lg break-keep">{genre}</span>
                </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Movies Listing under the sub-categories */}
    <div className="mt-2">
      <div className="px-4 mb-2">
        <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{title} 추천 목록</span>
      </div>
      <MovieRow movies={movies} onMovieClick={onMovieClick} />
    </div>
  </div>
);

const Categories: React.FC = () => {
  const navigate = useNavigate();
  
  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const handleGenreClick = (genre: string) => {
    navigate(`/list/${genre}`);
  };

  return (
    <div className="py-4 bg-brand-dark min-h-screen">
       <CategorySection 
         title="영화" 
         icon={<Film size={22}/>} 
         genres={SUB_CATEGORIES.movie}
         imageOffset={0}
         movies={MOCK_MOVIES.slice(0, 5)}
         onMovieClick={handleMovieClick}
         onGenreClick={handleGenreClick}
       />
       
       <div className="mx-4 h-px bg-gray-800/50 mb-10" />

       <CategorySection 
         title="시리즈" 
         icon={<Tv size={22}/>} 
         genres={SUB_CATEGORIES.series}
         imageOffset={4}
         movies={MOCK_MOVIES.slice(3, 8)}
         onMovieClick={handleMovieClick}
         onGenreClick={handleGenreClick}
       />
       <div className="h-10" />
    </div>
  );
};

export default Categories;