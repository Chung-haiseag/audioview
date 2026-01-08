import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Check } from 'lucide-react';

const Terms: React.FC = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-brand-dark min-h-screen relative font-sans">
      {/* Scrollable Content */}
      <div className="p-6 pb-32 text-gray-300 space-y-8 leading-relaxed text-sm">
        
        <section>
          <h3 className="text-white text-lg font-bold mb-2">제1조 (목적)</h3>
          <p>본 약관은 AudioView(이하 "회사")가 제공하는 영화 관람 보조 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제2조 (정의)</h3>
          <p className="mb-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>"서비스"란 영화관에서 상영되는 영화에 대한 화면해설(AD, Audio Description) 및 폐쇄자막(CC, Closed Caption)을 실시간으로 제공하는 모바일 애플리케이션 서비스를 의미합니다.</li>
            <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
            <li>"회원"이란 회사와 서비스 이용계약을 체결하고 회원 ID를 부여받은 자를 말합니다.</li>
            <li>"화면해설(AD)"이란 시각장애인을 위해 영화의 장면, 인물의 동작 등을 음성으로 설명하는 서비스를 말합니다.</li>
            <li>"폐쇄자막(CC)"이란 청각장애인을 위해 영화의 대사, 효과음 등을 텍스트로 제공하는 서비스를 말합니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제3조 (약관의 게시와 개정)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기화면 또는 연결화면에 게시합니다.</li>
            <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
            <li>회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 초기화면에 그 적용일자 7일 전부터 공지합니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제4조 (서비스의 제공)</h3>
          <p className="mb-2">회사는 다음과 같은 서비스를 제공합니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>영화관 사운드 인식을 통한 자동 동기화 서비스</li>
            <li>화면해설(AD) 실시간 제공 서비스</li>
            <li>폐쇄자막(CC) 실시간 제공 서비스</li>
            <li>영화 콘텐츠 검색 및 정보 제공 서비스</li>
            <li>시청 기록 관리 및 즐겨찾기 서비스</li>
            <li>기타 회사가 추가 개발하거나 제휴계약 등을 통해 이용자에게 제공하는 일체의 서비스</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제5조 (서비스 이용시간)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다.</li>
            <li>회사는 시스템 정기점검, 증설 및 교체를 위해 회사가 정한 날이나 시간에 서비스를 일시 중단할 수 있으며, 예정된 작업으로 인한 서비스 일시 중단은 서비스를 통해 사전에 공지합니다.</li>
            <li>회사는 긴급한 시스템 점검, 증설 및 교체 등 부득이한 사유로 인하여 예고 없이 일시적으로 서비스를 중단할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제6조 (회원가입)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
            <li>
                회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>만 14세 미만인 경우</li>
                    <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                </ul>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제7조 (개인정보 보호)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사는 이용자의 개인정보 수집 시 서비스 제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.</li>
            <li>회사는 이용자의 개인정보를 보호하기 위해 "개인정보 처리방침"을 수립하고 개인정보보호책임자를 지정하여 이를 게시하고 운영합니다.</li>
            <li>회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제8조 (접근성 보장)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사는 장애인차별금지법 및 정보통신 접근성 향상을 위한 권고안을 준수하며, WCAG 2.1 Level AA 표준을 충족하도록 노력합니다.</li>
            <li>회사는 스크린 리더(TalkBack, VoiceOver) 사용자를 위한 최적화를 제공합니다.</li>
            <li>회사는 영화관의 어두운 환경을 고려하여 다크 테마 및 밝기 조절 기능을 제공합니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제9조 (이용자의 의무)</h3>
          <p className="mb-2">이용자는 다음 행위를 하여서는 안 됩니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>신청 또는 변경 시 허위 내용의 등록</li>
            <li>타인의 정보 도용</li>
            <li>회사가 게시한 정보의 변경</li>
            <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
            <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
            <li>서비스를 영리 목적으로 이용하는 행위</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제10조 (저작권)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사가 제공하는 화면해설 및 자막 콘텐츠의 저작권은 회사 또는 해당 제작사에 귀속됩니다.</li>
            <li>이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
            <li>화면해설 및 자막 서비스는 개인적인 영화 관람 용도로만 사용되어야 하며, 녹음, 녹화, 재배포는 엄격히 금지됩니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제11조 (면책조항)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
            <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
            <li>회사는 영화관의 음향 환경, 네트워크 상태 등 외부 요인으로 인한 동기화 오류에 대해 책임을 지지 않습니다.</li>
            <li>회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">제12조 (분쟁해결)</h3>
          <ul className="list-decimal pl-5 space-y-2 text-gray-400">
            <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 고객센터를 설치·운영합니다.</li>
            <li>본 약관과 관련하여 회사와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법을 적용하며, 민사소송법상의 관할법원에 소를 제기합니다.</li>
          </ul>
        </section>

        <section className="pt-4 border-t border-gray-800">
            <h3 className="text-white font-bold mb-1">부칙</h3>
            <p>본 약관은 2025년 12월부터 시행됩니다.</p>
            <p className="text-xs text-gray-600 mt-4">* 본 이용약관은 프로토타입용으로 작성되었으며, 실제 서비스 운영 시 법률 검토를 거쳐 보완되어야 합니다.</p>
        </section>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1A1A1A] border-t border-gray-800 flex space-x-3 z-50">
         <button 
            onClick={handlePrint}
            className="flex-1 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors"
         >
            <Printer size={20} />
            <span>약관 인쇄</span>
         </button>
         
         <button 
            onClick={() => navigate(-1)}
            className="flex-1 bg-[#E50914] hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors shadow-lg"
         >
            <Check size={20} />
            <span>확인</span>
         </button>
      </div>
    </div>
  );
};

export default Terms;