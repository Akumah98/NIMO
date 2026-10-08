"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchResultItem } from "@/types/search";
import { searchSite } from "@/lib/services/searchService";

export function useSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setTimeout(() => inputRef.current?.focus(), 100);
      return next;
    });
  };

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      const timer = setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    let isMounted = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchSite(query);
        if (isMounted) {
          setResults(res);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeSearch]);

  const submitSearch = () => {
    if (!query.trim()) return;
    const targetUrl = `/search?q=${encodeURIComponent(query.trim())}`;
    closeSearch();
    router.push(targetUrl);
  };

  return {
    isOpen,
    query,
    results,
    loading,
    containerRef,
    inputRef,
    setQuery,
    toggleOpen,
    closeSearch,
    submitSearch,
  };
}
