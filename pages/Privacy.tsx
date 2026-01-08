import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Check } from 'lucide-react';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-brand-dark min-h-screen relative font-sans">
      <div className="p-6 pb-32 text-gray-300 space-y-8 leading-relaxed text-sm">
        
        <p>AudioView는 이용자의 개인정보를 소중히 여기며, 개인정보보호법을 준수하고 있습니다. 본 방침은 이용자의 개인정보가 어떻게 수집·이용·보관·파기되는지 설명합니다.</p>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">1. 수집하는 개인정보</h3>
          <div className="mb-4">
             <h4 className="text-gray-200 font-bold mb-1">회원가입 시</h4>
             <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>필수: 이메일 주소, 비밀번호, 닉네임</li>
                <li>선택: 생년월일, 성별, 장애 유형(접근성 맞춤 기능 제공용)</li>
             </ul>
          </div>
          <div>
             <h4 className="text-gray-200 font-bold mb-1">서비스 이용 시 (자동 수집)</h4>
             <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>기기 정보 (모델명, OS 버전, 앱 버전)</li>
                <li>이용 기록 (시청 기록, 검색 기록, 접속 로그)</li>
                <li>위치 정보 (영화관 위치 확인용, 선택)</li>
                <li>마이크 권한 (영화 사운드 인식 및 동기화용)</li>
             </ul>
          </div>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">2. 개인정보의 이용 목적</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>회원 가입 및 본인 인증</li>
            <li>화면해설(AD) 및 폐쇄자막(CC) 서비스 제공</li>
            <li>영화 정보 및 개인 맞춤 추천</li>
            <li>시청 기록 관리 및 서비스 품질 개선</li>
            <li>고객 문의 및 민원 처리</li>
            <li>이용 통계 분석 및 신규 서비스 개발</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">3. 개인정보의 보유 및 이용기간</h3>
          <div className="space-y-3 text-gray-400">
             <div>
                <span className="block text-white font-medium">회원 정보</span>
                <span>회원 탈퇴 시까지 보관</span>
             </div>
             <div>
                <span className="block text-white font-medium">시청 기록</span>
                <span>최근 1년간 보관 후 자동 삭제</span>
             </div>
             <div>
                <span className="block text-white font-medium">서비스 이용 기록</span>
                <span>최근 3개월간 보관 후 자동 삭제</span>
             </div>
             <p className="text-xs mt-2">* 법령에 따라 보존할 필요가 있는 경우, 해당 기간 동안 별도 보관됩니다.</p>
          </div>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">4. 개인정보의 제3자 제공</h3>
          <p className="mb-2">AudioView는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
          <p className="mb-2">다만, 다음의 경우 예외로 합니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의거하여 수사기관의 요청이 있는 경우</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">5. 이용자의 권리</h3>
          <p className="mb-2">이용자는 언제든지 다음 권리를 행사할 수 있습니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400 mb-3">
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정·삭제 요청</li>
            <li>개인정보 처리정지 요청</li>
            <li>회원 탈퇴 (개인정보 삭제)</li>
          </ul>
          <p className="text-gray-400">📱 권리 행사 방법: 앱 내 "설정 &gt; 계정 관리" 메뉴 또는 고객센터(help@audioview.kr)로 문의하세요.</p>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">6. 개인정보 보호 조치</h3>
          <p className="mb-2">AudioView는 이용자의 개인정보를 안전하게 보호하기 위해 다음 조치를 취합니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>비밀번호 암호화 저장</li>
            <li>개인정보 접근 권한 제한 및 관리</li>
            <li>해킹 방지를 위한 보안 시스템 운영</li>
            <li>정기적인 보안 점검 및 직원 교육</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">7. 접근성 관련 개인정보 보호</h3>
          <p className="mb-2">장애인 접근성 향상을 위해 수집하는 장애 유형 정보는 민감정보로 분류됩니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>선택적 수집 (이용자 동의 시에만)</li>
            <li>맞춤형 접근성 기능 제공 목적으로만 사용</li>
            <li>강화된 암호화 및 접근 통제 적용</li>
            <li>제3자 제공 절대 금지</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">8. 개인정보 보호책임자</h3>
          <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
              <h4 className="text-gray-200 font-bold mb-2">개인정보 보호책임자</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• 성명: 홍길동</li>
                <li>• 직책: CTO</li>
                <li>• 이메일: privacy@audioview.kr</li>
                <li>• 전화: 1588-0000</li>
              </ul>
          </div>
        </section>

        <section>
          <h3 className="text-white text-lg font-bold mb-2">9. 개인정보 처리방침 변경</h3>
          <p className="mb-2">본 개인정보 처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있습니다.</p>
          <p>변경 시 최소 7일 전 앱 공지사항 및 이메일을 통해 안내드리며, 중요한 변경사항은 30일 전에 공지합니다.</p>
        </section>

        <section className="pt-4 border-t border-gray-800">
            <p>본 개인정보 처리방침은 2025년 12월부터 시행됩니다.</p>
            <p className="text-xs text-gray-600 mt-4">* 본 개인정보 처리방침은 프로토타입용으로 작성되었으며, 실제 서비스 운영 시 법률 전문가의 검토를 거쳐 보완되어야 합니다.</p>
        </section>
      </div>

       {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1A1A1A] border-t border-gray-800 flex space-x-3 z-50">
         <button 
            onClick={handlePrint}
            className="flex-1 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors"
         >
            <Printer size={20} />
            <span>방침 인쇄</span>
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

export default Privacy;