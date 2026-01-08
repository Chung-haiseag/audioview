import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start justify-between text-left focus:outline-none group"
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-[#E50914]' : 'text-white group-hover:text-gray-300'}`}>
          Q. {question}
        </span>
        <div className="ml-4 mt-1 text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="pb-5 text-gray-400 text-sm leading-relaxed whitespace-pre-line px-2 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "어디서 사용할 수 있나요?",
      answer: "AudioView는 영화관뿐만 아니라 넷플릭스, 디즈니+ 등 OTT 서비스나 TV 시청 중에도 사용할 수 있습니다. 독자적인 음원 핑거프린팅 기술을 통해 소리가 들리는 곳이라면 어디서든 자동 동기화 기술을 통해 화면해설과 자막을 제공합니다."
    },
    {
      question: "데이터가 많이 소모되나요?",
      answer: "영화 관람 전 와이파이 환경에서 콘텐츠(화면해설/자막 데이터)를 미리 다운로드하시면, 관람 중에는 동기화를 위한 아주 적은 양의 데이터만 사용됩니다. 안심하고 사용하세요."
    },
    {
      question: "배터리 소모가 심하지 않나요?",
      answer: "AudioView는 리소스 최적화 기술을 적용하여, 2시간 연속 사용 시에도 배터리 소모량을 25% 이하(일반적인 기기 기준)로 유지하도록 설계되었습니다. 다만, 화면 밝기나 기기 성능에 따라 차이가 있을 수 있습니다."
    },
    {
      question: "동기화가 자꾸 끊겨요.",
      answer: "주변 소음이 너무 심하거나 영화 소리가 너무 작으면 인식이 어려울 수 있습니다.\n\n1. 스마트폰 마이크가 가려지지 않았는지 확인해주세요.\n2. 마이크 권한이 허용되어 있는지 확인해주세요.\n3. 일시적인 현상일 경우 자동으로 3초 이내에 재동기화됩니다."
    },
    {
      question: "이어폰은 필수인가요?",
      answer: "시각장애인을 위한 '화면해설(AD)' 기능을 영화관에서 이용하실 때는 주변 관객에게 방해가 되지 않도록 이어폰 착용이 필수입니다. 집에서 혼자 관람하실 때는 스피커 모드로도 이용 가능합니다."
    },
    {
      question: "모든 영화가 지원되나요?",
      answer: "현재 배리어프리 버전(가치봄 등)이 제작된 영화를 우선적으로 지원하고 있습니다. 보고 싶은 영화가 있다면 '고객센터 > 새로운 작품 요청하기' 메뉴를 통해 신청해주세요."
    },
    {
      question: "화면해설 속도를 조절할 수 있나요?",
      answer: "네, 가능합니다. 플레이어 설정 또는 앱 설정 메뉴에서 화면해설 재생 속도를 0.8배속에서 1.5배속까지 자유롭게 조절하실 수 있습니다."
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen px-4 pb-safe">
      <div className="py-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      
      {/* 제작 및 연락처 정보 영역 */}
      <div className="mt-10 mb-10 p-6 bg-[#1A1A1A] rounded-2xl border border-gray-800 shadow-lg">
        <div className="space-y-4">
            <div className="pb-3 border-b border-gray-800">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Production</p>
                <p className="text-white text-base font-bold">제작 : (사)한국시각장애인연합회</p>
            </div>
            
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#2F2F2F] flex items-center justify-center text-gray-400">
                        <Mail size={14} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[9px] font-bold">EMAIL</p>
                        <p className="text-gray-300 text-sm font-medium">kbu1004@hanmail.com</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#2F2F2F] flex items-center justify-center text-gray-400">
                        <Phone size={14} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-[9px] font-bold">PHONE</p>
                        <p className="text-gray-300 text-sm font-medium">02-799-1000</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;