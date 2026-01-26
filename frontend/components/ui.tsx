/**
 * Reusable UI Components for Ukraine Infrastructure Platform
 */
'use client';

import { ReactNode, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-sm hover:shadow focus:ring-[#3b82f6]',
    secondary: 'bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] shadow-sm hover:shadow focus:ring-[#94a3b8]',
    outline: 'border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#eff6ff] focus:ring-[#3b82f6]',
    danger: 'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-sm hover:shadow focus:ring-[#ef4444]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Check if className contains custom bg or text colors to skip variant
  const hasCustomColors = className.includes('bg-') || className.includes('text-');
  
  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${!hasCustomColors ? variants[variant] : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-3 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all ${
          error ? 'border-[#dc2626] focus:ring-[#ef4444]' : 'border-[#cbd5e1] hover:border-[#94a3b8]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all ${
          error ? 'border-[#dc2626] focus:ring-[#ef4444]' : 'border-[#cbd5e1] hover:border-[#94a3b8]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Select Component
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full px-3 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all ${
          error ? 'border-[#dc2626] focus:ring-[#ef4444]' : 'border-[#cbd5e1] hover:border-[#94a3b8]'
        } ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-[#e2e8f0] ${
        hover ? 'hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  onClick?: () => void;
}

export function Badge({ children, variant = 'default', className = '', onClick }: BadgeProps) {
  const variants = {
    default: 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]',
    success: 'bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]',
    warning: 'bg-[#fffbeb] text-[#b45309] border border-[#fde68a]',
    danger: 'bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]',
    info: 'bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]',
  };
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

// Container Component
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Section Component
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      {children}
    </section>
  );
}

// Multi-Select Component
interface MultiSelectProps {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="border border-gray-300 rounded-lg p-2 bg-white">
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selected.map(item => (
              <Badge key={item} variant="info" className="cursor-pointer" onClick={() => toggleOption(item)}>
                {item} ×
              </Badge>
            ))}
          </div>
        )}
        <div className="max-h-40 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center py-1 px-2 hover:bg-gray-50 cursor-pointer rounded">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
}

// Alert Component
interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  children: ReactNode;
  onClose?: () => void;
}

export function Alert({ type = 'info', children, onClose }: AlertProps) {
  const types = {
    success: 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]',
    error: 'bg-[#fef2f2] border-[#fecaca] text-[#b91c1c]',
    warning: 'bg-[#fffbeb] border-[#fde68a] text-[#b45309]',
    info: 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]',
  };

  return (
    <div className={`border rounded-lg p-4 ${types[type]} flex justify-between items-start`}>
      <div>{children}</div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-lg font-bold hover:opacity-70">
          ×
        </button>
      )}
    </div>
  );
}
