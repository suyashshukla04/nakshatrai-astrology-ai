'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ onSearch, placeholder = "Search astrology articles..." }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex-1 max-w-md"
      autoComplete="off"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 pr-4 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg-secondary border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-transparent transition-all duration-200 placeholder-light-text-muted dark:placeholder-dark-text-muted"
        autoComplete="off"
        data-form-type="search"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
      </div>
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-light-text-muted dark:text-dark-text-muted hover:text-cosmic-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
