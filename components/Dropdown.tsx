'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  main: ReactNode;
  inside: ReactNode;
  className?: string;
}

const Dropdown = ({ main, inside, className = '' }: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="user-menu" ref={dropdownRef}>
      <button onClick={toggleDropdown} className={`${className}-button user-button bg-gray-50 border border-gray-300 text-gray-900 hover-green dark:bg-gray-700 dark:border-gray-600 dark:text-white`}>
        <span className="flex h-full w-full items-center justify-center bg-muted">{main}</span>
      </button>
      {dropdownOpen && (
        <div data-side="bottom" className={`${className}-dropdown dropdown shadow-md animate-in slide-in-from-top dark:bg-gray-700 dark:border-gray-600 dark:text-white`}>
          {inside}
        </div>
      )}
    </div> 
  );
};

export default Dropdown;
