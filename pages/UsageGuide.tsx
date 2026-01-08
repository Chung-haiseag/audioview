import React from 'react';
import { Download, Mic, Headphones, Smartphone, Accessibility } from 'lucide-react';

const UsageGuide: React.FC = () => {
  const steps = [
    {
      icon: <Download size={28} className="text-[#E50914]" />,
      title: "1. 콘텐츠 미리 받기",
      description: "영화 관람 전, 와이파이 환경에서 화면해설(AD) 및 자막(CC) 데이터를 미리 다운로드 받아주세요. 데이터 절약과 안정적인 재생을 위해 필수적입니다."
    },
    {
      icon: <Mic size={28} className="text-[#E50914]" />,
      title: "2. 실시간 동기화",
      description: "영화가 시작되면 앱 하단의 마이크 버튼이나 '동기화 시작'을 눌러주세요. 독자적인 음원 핑거프린팅 기술이 3초 이내에 영화 소리를 인식하여 정확한 재생 위치를 찾아줍니다."
    },
    {
      icon: <Headphones size={28} className="text-[#E50914]" />,
      title: "3. 배리어프리 관람",
      description: "동기화가 완료되면 화면해설은 이어폰으로, 자막은 화면으로 제공됩니다. 영화관, OTT, TV 등 어디서든 끊김 없는 감동을 즐기세요."
    },
    {
      icon: <Smartphone size={28} className="text-[#E50914]" />,
      title: "4. 맞춤 설정",
      description: "재생 속도(0.8x ~ 1.5x), 자막 크기, 고대비 모드 등 나에게 맞는 최적의 환경을 설정 메뉴에서 자유롭게 변경할 수 있습니다."
    },
    {
      icon: <Accessibility size={28} className="text-[#E50914]" />,
      title: "5. 완벽한 접근성 지원",
      description: "VoiceOver(iOS) 및 TalkBack(Android) 제스처를 완벽하게 지원합니다. 시각장애인 사용자도 도움 없이 스스로 앱의 모든 기능을 제어할 수 있습니다."
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen p-6 pb-safe">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">AudioView 100% 활용하기</h2>
        <p className="text-gray-400 text-sm">영화관부터 안방극장까지, <br/>모두를 위한 배리어프리 솔루션</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex bg-[#1A1A1A] p-5 rounded-2xl border border-gray-800">
            <div className="mr-4 mt-1 flex-shrink-0">
               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-gray-700">
                 {step.icon}
               </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 p-4 bg-[#1A1A1A] rounded-xl flex items-start gap-3 border border-[#333]">
        <div className="mt-0.5 text-[#E50914]">
            <Mic size={16} />
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-gray-300 font-bold">마이크 권한 안내</span><br/>
            원활한 자동 동기화 기능을 위해 앱 실행 시 마이크 접근 권한을 꼭 허용해주세요. 수집된 오디오 데이터는 동기화 매칭 목적으로만 사용되며, 별도로 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
};

export default UsageGuide;