"use client";

import React, { useState, useEffect, useRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface MobileSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function MobileSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
}: MobileSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      const handleClickOutside = (e: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isMobile]);

  const selectedOption = options.find((opt) => opt.value === value);

  // Desktop dropdown
  if (!isMobile) {
    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-trigger w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg text-[var(--foreground)] appearance-none cursor-pointer focus:outline-none focus:border-[var(--primary)]"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-[38px] pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    );
  }

  // Mobile Bottom Sheet Drawer
  return (
    <div className="mobile-select">
      {label && (
        <label className="block text-sm font-medium mb-1 text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="select-trigger w-full px-4 py-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg text-[var(--foreground)] flex justify-between items-center"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          <div
            ref={drawerRef}
            className="w-full bg-[var(--card-bg)] rounded-t-2xl max-h-[70vh] overflow-hidden animate-slide-up"
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-[var(--border)] rounded-full" />
            </div>
            
            {/* Title */}
            <div className="px-4 pb-4 border-b border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {label || "Select Option"}
              </h3>
            </div>

            {/* Options */}
            <div className="py-2 max-h-[50vh] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`menu-item w-full px-4 py-3 text-left transition-colors ${
                    value === option.value
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {value === option.value && (
                    <span className="float-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Cancel button */}
            <div className="p-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="menu-item w-full py-3 bg-[var(--card-hover)] rounded-lg text-[var(--foreground)] font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
