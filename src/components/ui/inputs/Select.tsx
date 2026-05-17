import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export default function Select({ label, options, error, className = '', id, ...props }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={selectId} className="font-poppins text-xs uppercase tracking-wider text-accent mb-1 font-medium">
        {label}
      </label>
      <select
        id={selectId}
        className={`bg-secondary border ${error ? 'border-red-500' : 'border-primary/40'} rounded px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors cursor-pointer`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 mt-1 font-poppins">{error}</span>}
    </div>
  );
}
