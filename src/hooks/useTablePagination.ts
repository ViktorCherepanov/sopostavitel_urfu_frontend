import { useState } from 'react';

export const useTablePagination = (rowsPerPage = 15) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = <T>(data: T[]) => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    return {
      currentRows: data.slice(start, start + rowsPerPage),
      totalPages,
      currentPage,
      goNext: () => setCurrentPage(p => Math.min(p + 1, totalPages)),
      goPrev: () => setCurrentPage(p => Math.max(p - 1, 1)),
      reset: () => setCurrentPage(1),
    };
  };

  return { paginate };
};