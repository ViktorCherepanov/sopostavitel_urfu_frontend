import { useState } from 'react';
import type { TableRowData } from '../types/TableRowData';

export const useTableSort = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableRowData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof TableRowData) => {
    setSortConfig(prev =>
      prev?.key === key && prev.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    );
  };

  const resetSort = () => setSortConfig(null);

  const sort = (data: TableRowData[]) =>
    [...data].sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  return { sortConfig, handleSort, resetSort, sort };
};