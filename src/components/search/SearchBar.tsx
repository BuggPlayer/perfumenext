'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn, truncateText } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  showSuggestions?: boolean;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  showSuggestions = true,
  onSearch,
  suggestions = [],
  className,
}) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Persist basic history in localStorage
  const historyKey = 'searchHistory';
  const history = useMemo<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(historyKey) || '[]');
    } catch {
      return [];
    }
  }, []);

  const mergedSuggestions = useMemo(() => {
    const lower = query.toLowerCase();
    const fromProps = suggestions.filter(s => s.toLowerCase().includes(lower));
    const fromHistory = history.filter(h => h.toLowerCase().includes(lower));
    const dedup = Array.from(new Set([...fromProps, ...fromHistory]));
    return dedup.slice(0, 8);
  }, [query, suggestions, history]);

  useEffect(() => {
    if (query.length > 0) setOpen(true);
    else setOpen(false);
  }, [query]);

  const commitSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;
    const newHistory = [q, ...history.filter(h => h !== q)].slice(0, 10);
    localStorage.setItem(historyKey, JSON.stringify(newHistory));
    onSearch?.(q);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  };

  const clear = () => {
    setQuery('');
    setActiveIndex(-1);
    setOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(mergedSuggestions.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + Math.max(mergedSuggestions.length, 1)) % Math.max(mergedSuggestions.length, 1));
    } else if (e.key === 'Enter') {
      if (open && activeIndex >= 0 && mergedSuggestions[activeIndex]) {
        commitSearch(mergedSuggestions[activeIndex]);
      } else {
        commitSearch(query);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => query && setOpen(true)}
          placeholder={placeholder}
          className="w-full outline-none text-sm"
        />
        {query && (
          <button aria-label="Clear search" onClick={clear} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
        <button onClick={() => commitSearch(query)} className="text-sm font-medium text-primary-700 hover:text-primary-800">
          Search
        </button>
      </div>

      {showSuggestions && open && mergedSuggestions.length > 0 && (
        <ul ref={listRef} className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {mergedSuggestions.map((s, idx) => (
            <li
              key={s}
              className={cn(
                'px-3 py-2 text-sm cursor-pointer hover:bg-gray-50',
                idx === activeIndex && 'bg-gray-100'
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commitSearch(s)}
            >
              {truncateText(s, 60)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;


