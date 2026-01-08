import React, { useState } from 'react';

const RequestWork: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center bg-brand-dark">
            <div className="w-20 h-20 bg-[#E50914] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
                <span className="text-4xl text-white">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">요청이 접수되었습니다</h2>
            <p className="text-gray-400 mb-8">검토 후 최대한 빠르게 반영하도록 하겠습니다.<br/>소중한 의견 감사합니다.</p>
            <button 
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 border border-gray-600 rounded-full text-sm text-gray-300 hover:bg-gray-900"
            >
                다시 요청하기
            </button>
        </div>
    )
  }

  return (
    <div className="p-6 bg-brand-dark min-h-screen">
      <div className="mb-8 p-4 bg-[#1A1A1A] rounded-xl border border-gray-800">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-[#E50914] font-bold">보고 싶은 영화가 있다면 신청해주세요.</span><br/>
          저작권 및 제작 여건에 따라 서비스 제공이 어려울 수 있는 점 양해 부탁드립니다.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">작품명 <span className="text-red-500">*</span></label>
            <input 
                type="text" 
                required 
                className="w-full bg-[#2F2F2F] border border-transparent rounded-lg p-4 text-white placeholder-gray-500 focus:border-[#E50914] focus:bg-[#1A1A1A] outline-none transition-all" 
                placeholder="예: 기생충, 범죄도시4" 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">감독 / 주연배우</label>
            <input 
                type="text" 
                className="w-full bg-[#2F2F2F] border border-transparent rounded-lg p-4 text-white placeholder-gray-500 focus:border-[#E50914] focus:bg-[#1A1A1A] outline-none transition-all" 
                placeholder="정보를 알고 계시다면 입력해주세요" 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">신청 사유</label>
            <textarea 
                rows={4}
                className="w-full bg-[#2F2F2F] border border-transparent rounded-lg p-4 text-white placeholder-gray-500 focus:border-[#E50914] focus:bg-[#1A1A1A] outline-none transition-all resize-none" 
                placeholder="이 작품이 보고 싶은 이유를 자유롭게 적어주세요." 
            />
        </div>

        <button 
            type="submit" 
            className="w-full bg-[#E50914] text-white font-bold py-4 rounded-xl mt-4 hover:bg-red-700 transition-colors shadow-lg"
        >
            요청하기
        </button>
      </form>
    </div>
  );
};

export default RequestWork;