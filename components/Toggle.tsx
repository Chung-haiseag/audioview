import React from 'react';

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange, className, disabled = false }) => {
  // If className is provided, use it. Otherwise use default card style.
  const containerClass = className 
    ? className 
    : "bg-[#1A1A1A] rounded-2xl p-5 mb-4 flex items-center justify-between";

  return (
    <div className={containerClass}>
      <div className={`flex flex-col pr-4 ${disabled ? 'opacity-50' : ''}`}>
        <span className="text-white text-xl font-medium mb-1">{label}</span>
        <span className="text-gray-500 text-sm font-light">{description}</span>
      </div>
      
      <button 
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-[#E50914]' : 'bg-gray-600'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;