'use client';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import Link from 'next/link';
import { SmartSearchProps, Package } from '@/lib/types';

const SmartSearch: React.FC<SmartSearchProps> = ({ optionalData, onClose }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Package[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showSearch) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (q.trim().length < 3) {
      setFiltered([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    debounceRef.current = setTimeout(() => {
      const searchableData = optionalData?.data?.package || [];
      const lowerQ = q.trim().toLowerCase();
      const results = searchableData
        .filter((pkg: Package) => pkg.title.toLowerCase().includes(lowerQ))
        .slice(0, 10);

      setFiltered(results);
      setSearching(false);
    }, 500);
  };

  const closeSearch = () => {
    setShowSearch(false);
    if (onClose) onClose();
  };

  return (
    <div className="smart-search">
      <div
        className="quick-search cursor-pointer"
        onClick={() => setShowSearch(true)}>
        <svg
          className="icon text-navbar"
          width="24"
          height="24">
          <use
            xlinkHref="/icons.svg#search"
            fill="currentColor"
          />
        </svg>
      </div>

      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          onClick={closeSearch}>
          <div
            className="w-full max-w-4xl px-4 relative"
            onClick={e => e.stopPropagation()}>
            <form
              className="flex items-center justify-center"
              onSubmit={e => e.preventDefault()}
              noValidate>
              <div className="form-group w-full max-w-[900px] relative">
                <label
                  htmlFor="smart_search_input"
                  className="sr-only">
                  Location
                </label>
                <input
                  type="text"
                  id="smart_search_input"
                  value={query}
                  onChange={handleChange}
                  className="form-control border-none bg-page-bg focus:border-primary focus:ring-0 outline-none rounded-md rounded-r-lg w-full px-6 py-3 placeholder:text-muted placeholder:capitalize"
                  placeholder="Find your perfect quiet retreat?"
                  autoComplete="off"
                />

                {query.trim().length > 2 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-[60] max-h-[300px] overflow-auto border border-border custom-scrollbar">
                    {searching ? (
                      <p className="text-center text-muted p-4">
                        Searching for &quot;{query}&quot;
                      </p>
                    ) : filtered.length > 0 ? (
                      <ul>
                        {filtered.map(pkg => (
                          <li
                            className="py-3 px-6 border-primary/70 border-dashed border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                            key={pkg.id}
                            onClick={closeSearch}>
                            <Link
                              href={`/${pkg.slug}`}
                              className="block w-full">
                              <h3 className="text-base font-semibold text-headings hover:text-primary">
                                {pkg.title}
                              </h3>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-muted p-4">
                        No matching packages found for &quot;{query}&quot;.
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-primary px-[18px] flex items-center gap-2 rounded-r-md text-white py-3 absolute top-0 right-0 z-10"
                  aria-label="Search">
                  <svg
                    className="icon text-white"
                    width="20"
                    height="20"
                    aria-hidden="true">
                    <use
                      xlinkHref="/icons.svg#search"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
