import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={inputId} className="font-poppins text-xs uppercase tracking-wider text-accent mb-1 font-medium">
        {label}
      </label>
      <input
        id={inputId}
        className={`bg-transparent border ${error ? 'border-red-500' : 'border-primary/40'} rounded px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 font-poppins">{error}</span>}
    </div>
  );
}
