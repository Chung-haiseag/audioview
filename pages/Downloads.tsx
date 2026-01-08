import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MOVIES } from '../constants';
import { PlayCircle, CheckCircle, Heart } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  movies: typeof MOCK_MOVIES;
  onMovieClick: (id: string) => void;
}

const Section: React.FC<SectionProps> = ({ title, icon, movies, onMovieClick }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4 px-4">
      <span className="text-[#E50914] mr-2">{icon}</span>
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
    <div className="flex overflow-x-auto px-4 pb-4 space-x-3 no-scrollbar">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => onMovieClick(movie.id)}
            className="flex-none w-28 group cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-md mb-2"
                />
            </div>
            <p className="text-xs text-gray-300 truncate text-center">{movie.title}</p>
          </div>
        ))
      ) : (
         <div className="w-full h-24 flex items-center justify-center text-gray-600 text-sm border border-dashed border-gray-800 rounded-lg">
            콘텐츠가 없습니다
         </div>
      )}
    </div>
  </div>
);

const Downloads: React.FC = () => {
  const navigate = useNavigate();
  // Mock data splitting
  const watchingMovies = MOCK_MOVIES.slice(0, 3);
  const watchedMovies = MOCK_MOVIES.slice(3, 6);
  const wishlistMovies = MOCK_MOVIES.slice(6, 8);

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="py-4 bg-brand-dark min-h-screen">
       <Section 
         title="시청중인 영상" 
         icon={<PlayCircle size={20}/>} 
         movies={watchingMovies}
         onMovieClick={handleMovieClick}
       />
       <Section 
         title="다운로드 한 영상" 
         icon={<CheckCircle size={20}/>} 
         movies={watchedMovies}
         onMovieClick={handleMovieClick}
       />
       <Section 
         title="내가 찜한 영상" 
         icon={<Heart size={20}/>} 
         movies={wishlistMovies}
         onMovieClick={handleMovieClick}
       />
    </div>
  );
};

export default Downloads;