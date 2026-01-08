import React from 'react';

export const ADBadge: React.FC = () => (
  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-[#F5C518] text-black font-black text-[10px] tracking-tighter mr-1.5 h-4 shadow-sm">
    AD
  </span>
);

export const CCBadge: React.FC = () => (
  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-white text-black font-black text-[10px] mr-1.5 h-4 shadow-sm">
    CC
  </span>
);

export const MultiLangBadge: React.FC = () => (
  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-[#333] text-[#aaa] font-bold text-[10px] border border-white/10 h-4">
    A文あ
  </span>
);