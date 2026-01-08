import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MOCK_MOVIES } from '../constants';

const Player: React.FC = () => {
  const navigate = useNavigate();
  const movie = MOCK_MOVIES[0];

  return (
    <div className="h-screen w-full bg-brand-dark flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center p-4 border-b border-[#E50914] relative">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border border-gray-700">
            <img src={movie.posterUrl} alt="mini poster" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-normal text-white truncate pr-20">{movie.title}</h1>
        
        <div className="absolute right-4 top-0 bottom-0 flex items-center space-x-2">
            <span className="text-[#F5C518] font-black italic text-lg tracking-tighter">AD)))</span>
            <span className="text-[#F5C518] font-black text-lg">CC</span>
        </div>
      </div>

      {/* Dropdown/Close indicator */}
      <div className="flex justify-center py-4">
         <button onClick={() => navigate(-1)} className="text-[#E50914]">
            <ChevronDown size={32} />
         </button>
      </div>

      {/* Main Split Control Area */}
      <div className="flex-1 flex relative">
         {/* Vertical Split Line */}
         <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gray-800"></div>

         {/* Audio Description Area */}
         <div className="w-1/2 flex flex-col items-center justify-center cursor-pointer active:bg-gray-900 transition-colors">
            <div className="mb-4 transform scale-150">
                <span className="text-[#F5C518] font-black italic text-6xl tracking-tighter">AD)))</span>
            </div>
            <span className="text-gray-400 text-2xl font-light mt-4">화면해설</span>
         </div>

         {/* Closed Caption Area */}
         <div className="w-1/2 flex flex-col items-center justify-center cursor-pointer active:bg-gray-900 transition-colors">
            <div className="mb-4 transform scale-150">
                <span className="text-[#F5C518] font-black text-6xl">CC</span>
            </div>
            <span className="text-gray-400 text-2xl font-light mt-4">문자자막</span>
         </div>
      </div>
      
      {/* Spacer for bottom safe area */}
      <div className="h-10"></div>
    </div>
  );
};

export default Player;