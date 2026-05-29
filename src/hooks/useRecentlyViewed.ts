import { useState, useEffect } from 'react';

const KEY = 'mulco-recently-viewed';
const MAX = 5;

export function useRecentlyViewed(currentId: string): string[] {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setIds((prev) => {
      const filtered = prev.filter((id) => id !== currentId);
      const next = [currentId, ...filtered].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, [currentId]);

  return ids.filter((id) => id !== currentId);
}
