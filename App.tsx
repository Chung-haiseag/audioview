import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, Mic, Home as HomeIcon, Sun, Moon, Glasses, Radio, User, Play, Settings } from 'lucide-react';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';
import DownloadsPage from './pages/Downloads';
import CategoriesPage from './pages/Categories';
import MovieListPage from './pages/MovieList';
import PlayerPage from './pages/Player';
import HelpPage from './pages/Help';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import RequestWorkPage from './pages/RequestWork';
import UsageGuidePage from './pages/UsageGuide';
import FAQPage from './pages/FAQ';
import MovieDetail from './pages/MovieDetail';
import SearchPage from './pages/Search';

// --- Shared Components ---

interface HeaderProps {
  isSubPage: boolean;
  customTitle?: string;
  brightness: number;
  setBrightness: (val: number) => void;
  showBrightness: boolean;
  setShowBrightness: (val: boolean) => void;
  isGlassesConnected: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isSubPage, customTitle,
  brightness, setBrightness, showBrightness, setShowBrightness,
  isGlassesConnected
}) => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  if (isListening) {
    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
            <div className="absolute top-6 left-6">
                <button onClick={() => setIsListening(false)} className="text-white">
                    <ChevronLeft size={28} />
                </button>
            </div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-10">
                     <div className="absolute inset-0 border-4 border-[#E50914]/30 rounded-full animate-ping"></div>
                     <div className="w-24 h-24 bg-[#E50914] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                        <Mic size={40} className="text-white animate-pulse" />
                     </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">듣고 있습니다...</h3>
            </div>
            <button onClick={() => setIsListening(false)} className="mt-10 px-6 py-2 bg-white/10 rounded-full text-white text-sm font-bold">닫기</button>
        </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 bg-[#141414] transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 min-h-[68px]">
        {/* 상단 좌측 뒤로가기 버튼 영역 복구: 상세 페이지(고객센터 하위 등)에서 노출 */}
        <div className="w-10">
          {isSubPage && (
            <button onClick={() => navigate(-1)} className="text-white active:scale-90 transition-transform">
              <ChevronLeft size={28} />
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-black tracking-tighter font-sans text-[#E50914] whitespace-nowrap uppercase">
            {customTitle || 'AUDIOVIEW'}
          </h1>
        </div>

        <div className="flex items-center gap-3 w-10 justify-end">
          <button onClick={() => setShowBrightness(!showBrightness)} className={`transition-colors ${showBrightness ? 'text-[#E50914]' : 'text-white'}`}>
              <Sun size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showBrightness && (
          <div className="px-5 pb-4 pt-1 flex items-center gap-4 animate-fadeIn bg-[#141414]">
              <div className="shrink-0"><Moon size={18} className="text-gray-400" /></div>
              <input type="range" min="10" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#E50914]" />
              <div className="shrink-0"><Sun size={18} className="text-gray-400" /></div>
          </div>
      )}
    </div>
  );
};

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-md border-t border-gray-800 flex justify-around items-center py-2 pb-2">
      <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${path === '/' ? 'text-white' : 'text-gray-500'}`}>
        <HomeIcon size={24} />
        <span className="text-[10px] font-bold">홈</span>
      </button>
      <button onClick={() => navigate('/settings')} className={`flex flex-col items-center gap-1 ${path === '/settings' ? 'text-white' : 'text-gray-500'}`}>
        <Settings size={24} />
        <span className="text-[10px] font-bold">설정</span>
      </button>
      <button onClick={() => navigate('/search')} className={`flex flex-col items-center gap-1 ${path === '/search' ? 'text-white' : 'text-gray-500'}`}>
        <Search size={24} />
        <span className="text-[10px] font-bold">검색</span>
      </button>
      <button onClick={() => navigate('/downloads')} className={`flex flex-col items-center gap-1 ${path === '/downloads' ? 'text-white' : 'text-gray-500'}`}>
        <User size={24} />
        <span className="text-[10px] font-bold">MY</span>
      </button>
    </div>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brightness, setBrightness] = useState(100);
  const [showBrightness, setShowBrightness] = useState(false);
  const [isGlassesConnected, setIsGlassesConnected] = useState(true);

  const location = useLocation();
  const path = location.pathname;
  
  const isHome = path === '/';
  const isPlayer = path === '/player';
  const isMovieDetail = path.startsWith('/movie/');
  const isMovieList = path.startsWith('/list/');
  const isDownloads = path === '/downloads';
  const isCategories = path === '/categories';
  const isSettings = path === '/settings';
  const isSearch = path === '/search';
  const isHelpSection = path.startsWith('/help');

  const isSubPage = isMovieList || isMovieDetail || isDownloads || isCategories || isSettings || isHelpSection || isSearch;

  let pageTitle = '';
  if (isMovieList) pageTitle = '콘텐츠 목록';
  else if (isDownloads) pageTitle = 'MY AUDIOVIEW';
  else if (isSettings) pageTitle = '설정';
  else if (isCategories) pageTitle = '카테고리';
  else if (isMovieDetail) pageTitle = '영화선택';
  else if (isSearch) pageTitle = '검색';
  else if (isHelpSection) pageTitle = '고객센터';

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans relative">
      <div className="fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-200" style={{ opacity: (100 - brightness) / 100 }} />
      
      {!isPlayer && (
        <Header 
          isSubPage={isSubPage}
          customTitle={isHome ? undefined : (pageTitle || undefined)} 
          brightness={brightness} 
          setBrightness={setBrightness} 
          showBrightness={showBrightness} 
          setShowBrightness={setShowBrightness} 
          isGlassesConnected={isGlassesConnected}
        />
      )}
      <main className={!isPlayer ? 'pb-16' : ''}>{children}</main>
      {!isPlayer && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/list/:category" element={<MovieListPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/privacy" element={<PrivacyPage />} />
          <Route path="/help/terms" element={<TermsPage />} />
          <Route path="/help/request" element={<RequestWorkPage />} />
          <Route path="/help/usage" element={<UsageGuidePage />} />
          <Route path="/help/faq" element={<FAQPage />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;