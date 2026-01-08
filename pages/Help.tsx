import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Help: React.FC = () => {
  const navigate = useNavigate();

  const menus = [
    { title: '개인정보 처리방침', path: '/help/privacy' },
    { title: '이용약관', path: '/help/terms' },
    { title: '자주 묻는 질문', path: '/help/faq' },
    { title: '이용안내', path: '/help/usage' },
    { title: '새로운 작품 요청하기', path: '/help/request' }
  ];

  return (
    <div className="bg-brand-dark min-h-screen px-4 py-4">
      <div className="flex flex-col space-y-3">
        {menus.map((menu, index) => (
          <button 
            key={index} 
            onClick={() => menu.path && navigate(menu.path)}
            className="flex items-center justify-between w-full p-5 bg-[#1A1A1A] rounded-2xl active:bg-gray-800 transition-colors border border-transparent hover:border-gray-800"
          >
             <span className="text-white text-base font-medium">{menu.title}</span>
             <ChevronRight className="text-gray-500" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Help;