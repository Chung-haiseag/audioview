import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../components/Toggle';
import { Glasses, Type, Palette, Ghost, Eye, ChevronRight, HelpCircle, Shield, FileText, MessageCircle, Info, PlusCircle, Mail, Phone } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'settings' | 'help'>('settings');
  const [useData, setUseData] = useState(true);
  
  // Accessibility Group State
  const [accessibilityMaster, setAccessibilityMaster] = useState(true);
  const [audioDesc, setAudioDesc] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [multiLang, setMultiLang] = useState(true);

  // CC Customization State
  const [captionFontSize, setCaptionFontSize] = useState('medium'); // small, medium, large, xlarge
  const [captionFontColor, setCaptionFontColor] = useState('#FFFFFF');
  const [captionBgOpacity, setCaptionBgOpacity] = useState(0.5); // 0 to 1

  const [extendedRange, setExtendedRange] = useState(false);
  const [smartGlasses, setSmartGlasses] = useState(true);

  const fontSizes = [
    { id: 'small', label: '작게', scale: '0.8rem' },
    { id: 'medium', label: '보통', scale: '1rem' },
    { id: 'large', label: '크게', scale: '1.25rem' },
    { id: 'xlarge', label: '매우 크게', scale: '1.5rem' },
  ];

  const colors = [
    { name: '화이트', value: '#FFFFFF' },
    { name: '옐로우', value: '#F5C518' },
    { name: '그린', value: '#4ADE80' },
    { name: '시안', value: '#22D3EE' },
  ];

  const opacities = [
    { label: '0%', value: 0 },
    { label: '25%', value: 0.25 },
    { label: '50%', value: 0.5 },
    { label: '75%', value: 0.75 },
    { label: '100%', value: 1 },
  ];

  const helpMenus = [
    { title: '개인정보 처리방침', path: '/help/privacy', icon: <Shield size={18} /> },
    { title: '이용약관', path: '/help/terms', icon: <FileText size={18} /> },
    { title: '자주 묻는 질문', path: '/help/faq', icon: <MessageCircle size={18} /> },
    { title: '이용안내', path: '/help/usage', icon: <Info size={18} /> },
    { title: '새로운 작품 요청하기', path: '/help/request', icon: <PlusCircle size={18} /> }
  ];

  return (
    <div className="bg-brand-dark min-h-screen pb-20">
      
      {/* 탭 네비게이션 */}
      <div className="flex sticky top-0 bg-[#141414] z-30 border-b border-gray-800">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-4 text-center font-bold text-lg transition-all relative ${
            activeTab === 'settings' ? 'text-[#E50914]' : 'text-gray-500'
          }`}
        >
          환경설정
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E50914] rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('help')}
          className={`flex-1 py-4 text-center font-bold text-lg transition-all relative ${
            activeTab === 'help' ? 'text-[#E50914]' : 'text-gray-500'
          }`}
        >
          고객센터
          {activeTab === 'help' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E50914] rounded-t-full" />}
        </button>
      </div>

      <div className="p-4 space-y-6">
        
        {/* 1. 설정 탭 콘텐츠 */}
        {activeTab === 'settings' && (
          <div className="animate-fadeIn space-y-6">
            {/* 일반 설정 섹션 */}
            <section className="space-y-4">
              <div className="relative">
                <Toggle 
                  label="스마트 안경"
                  description="스마트 안경 연동 설정"
                  checked={smartGlasses}
                  onChange={setSmartGlasses}
                  className="bg-[#1A1A1A] rounded-2xl p-5 flex items-center justify-between border border-gray-800/50 shadow-lg"
                />
                {smartGlasses && (
                  <div className="absolute top-5 right-20 flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full animate-fadeIn">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-green-400 font-bold">연동됨</span>
                  </div>
                )}
              </div>

              <Toggle 
                label="3G/LTE 사용"
                description="체크 해제시 WiFi에서만 사용가능"
                checked={useData}
                onChange={setUseData}
                className="bg-[#1A1A1A] rounded-2xl p-5 flex items-center justify-between border border-gray-800/50 shadow-lg"
              />

              <Toggle 
                label="인식구간 확장하기"
                description="음성인식 영상물 전체로 확장"
                checked={extendedRange}
                onChange={setExtendedRange}
                className="bg-[#1A1A1A] rounded-2xl p-5 flex items-center justify-between border border-gray-800/50 shadow-lg"
              />
            </section>
            
            {/* 접근성 기능 섹션 */}
            <section>
              <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-800/50 shadow-lg">
                <Toggle 
                  label="접근성 기능 설정"
                  description="화면해설, 자막 등 모든 보조 기능 켜기/끄기"
                  checked={accessibilityMaster}
                  onChange={setAccessibilityMaster}
                  className="p-5 flex items-center justify-between bg-[#1A1A1A]"
                />

                {accessibilityMaster && (
                  <div className="bg-[#212121] border-t border-gray-800/50">
                    <Toggle 
                      label="화면해설 (AD)"
                      description="시각장애인용 오디오자막"
                      checked={audioDesc}
                      onChange={setAudioDesc}
                      className="p-4 pr-5 flex items-center justify-between border-b border-gray-800/50"
                    />
                    <Toggle 
                      label="문자자막 (CC)"
                      description="청각장애인용 대사 및 소리자막"
                      checked={captions}
                      onChange={setCaptions}
                      className="p-4 pr-5 flex items-center justify-between"
                    />
                    <Toggle 
                      label="다국어자막"
                      description="외국인용 다국어 문자자막"
                      checked={multiLang}
                      onChange={setMultiLang}
                      className="p-4 pr-5 flex items-center justify-between border-t border-gray-800/50"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* 자막 스타일 설정 섹션 */}
            {accessibilityMaster && captions && (
              <section className="bg-[#1A1A1A] rounded-2xl p-5 animate-fadeIn border border-gray-800/50 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 bg-[#E50914]/10 rounded-lg">
                    <Type size={18} className="text-[#E50914]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">자막 스타일 설정</h3>
                </div>

                <div className="mb-8 p-6 rounded-xl bg-black/40 border border-gray-800 flex flex-col items-center justify-center min-h-[120px] relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <img src="https://picsum.photos/seed/preview/400/200" alt="background preview" className="w-full h-full object-cover blur-[2px]" />
                   </div>
                   <div 
                      className="relative z-10 px-3 py-1.5 rounded transition-all duration-300 text-center font-bold"
                      style={{ 
                        fontSize: fontSizes.find(f => f.id === captionFontSize)?.scale,
                        color: captionFontColor,
                        backgroundColor: `rgba(0, 0, 0, ${captionBgOpacity})`
                      }}
                   >
                      "안녕하세요, AudioView 자막 미리보기입니다."
                   </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-400">
                     <Type size={14} />
                     <span>글자 크기</span>
                  </div>
                  <div className="flex bg-[#2F2F2F] rounded-xl p-1">
                    {fontSizes.map((f) => (
                      <button key={f.id} onClick={() => setCaptionFontSize(f.id)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${captionFontSize === f.id ? 'bg-[#E50914] text-white shadow-lg' : 'text-gray-400'}`}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-400">
                     <Palette size={14} />
                     <span>글자 색상</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map((c) => (
                      <button key={c.value} onClick={() => setCaptionFontColor(c.value)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${captionFontColor === c.value ? 'border-[#E50914] bg-[#E50914]/5' : 'border-gray-800 bg-[#2F2F2F]'}`}>
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: c.value }} />
                        <span className={`text-[10px] font-bold ${captionFontColor === c.value ? 'text-white' : 'text-gray-500'}`}>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-400">
                     <Ghost size={14} />
                     <span>배경 투명도</span>
                  </div>
                  <div className="flex bg-[#2F2F2F] rounded-xl p-1">
                    {opacities.map((o) => (
                      <button key={o.value} onClick={() => setCaptionBgOpacity(o.value)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${captionBgOpacity === o.value ? 'bg-[#E50914] text-white shadow-lg' : 'text-gray-400'}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* 2. 고객센터 탭 콘텐츠 */}
        {activeTab === 'help' && (
          <section className="animate-fadeIn pb-10">
            <div className="flex items-center gap-2 px-1 mb-4">
                <div className="w-6 h-6 rounded-full border-2 border-[#E50914] flex items-center justify-center">
                  <HelpCircle size={14} className="text-[#E50914]" />
                </div>
                <h3 className="text-xl font-bold text-white">무엇을 도와드릴까요?</h3>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-800/50 shadow-lg">
                {helpMenus.map((menu, index) => (
                    <button 
                        key={menu.path} 
                        onClick={() => navigate(menu.path)}
                        className={`flex items-center justify-between w-full p-5 hover:bg-white/5 active:bg-white/10 transition-colors ${index !== helpMenus.length - 1 ? 'border-b border-gray-800/50' : ''}`}
                    >
                        <div className="flex items-center gap-4 text-gray-300">
                            <span className="text-gray-500">{menu.icon}</span>
                            <span className="text-base font-medium">{menu.title}</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-600" />
                    </button>
                ))}
            </div>
            
            {/* 제작 및 연락처 정보 영역 (좌측 정렬 수정됨) */}
            <div className="mt-8 p-6 bg-[#1A1A1A] rounded-2xl border border-gray-800/50 shadow-inner">
                <div className="space-y-4 text-left">
                    <div className="pb-3 border-b border-gray-800">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Production</p>
                        <p className="text-white text-lg font-bold">제작 : (사)한국시각장애인연합회</p>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-[#2F2F2F] flex items-center justify-center text-gray-400 shrink-0">
                                <Mail size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Email</p>
                                <p className="text-gray-300 text-sm font-medium">kbu1004@hanmail.com</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-[#2F2F2F] flex items-center justify-center text-gray-400 shrink-0">
                                <Phone size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Phone</p>
                                <p className="text-gray-300 text-sm font-medium">02-799-1000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
        )}

      </div>
      <div className="h-10" />
    </div>
  );
};

export default Settings;