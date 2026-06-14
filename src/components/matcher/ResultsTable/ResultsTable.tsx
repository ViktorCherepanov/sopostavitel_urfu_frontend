import {useState} from 'react';
import styles from './ResultsTable.module.css';
import type {
  ActiveSort,
  MatchStatus,
  TableRowData
} from "../../../types/TableRowData.ts";
import {MOCK_DATA} from "../../../mocks/tableMockData.ts";
import {useTableSort} from "../../../hooks/useTableSort.ts";
import {useTablePagination} from "../../../hooks/useTablePagination.ts";

const STATUS_ORDER: Record<MatchStatus, MatchStatus[]> = {
  green: ['green', 'yellow', 'red'],
  yellow: ['yellow', 'green', 'red'],
  red: ['red', 'yellow', 'green'],
};

const COLOR: Record<MatchStatus, string> = {
  green: '#2B9348',
  yellow: '#FFBF3B',
  red: '#CC313D',
};

export const ResultsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cmsFilter, setCmsFilter] = useState<MatchStatus>('red');
  const [activeSortType, setActiveSortType] = useState<ActiveSort>(null);

  const {sortConfig, handleSort, resetSort, sort} = useTableSort();
  const {paginate} = useTablePagination(15);

  const filteredData = MOCK_DATA.filter((row) =>
    row.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderedData = activeSortType === 'status'
    ? [...filteredData].sort((a, b) =>
      STATUS_ORDER[cmsFilter].indexOf(a.matchStatus) -
      STATUS_ORDER[cmsFilter].indexOf(b.matchStatus)
    )
    : sort(filteredData);

  const {
    currentRows,
    totalPages,
    currentPage,
    goNext,
    goPrev,
    reset
  } = paginate(orderedData);


  const handleCmsFilterClick = () => {
    setActiveSortType('status');
    resetSort();
    setCmsFilter(prev =>
      prev === 'red' ? 'yellow' : prev === 'yellow' ? 'green' : 'red'
    );
    reset();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    reset();
  };

  const handleSortWithReset = (key: keyof TableRowData) => {
    setActiveSortType('column');
    handleSort(key);
    reset();
  };

  const [topColor, midColor, botColor] = STATUS_ORDER[cmsFilter].map(s => COLOR[s]);

  const renderSortArrow = (key: keyof TableRowData) => {
    if (activeSortType !== 'column') return null;
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Результаты сопоставления</h2>
          <button className={styles.infoBtn} aria-label="Показать информацию">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 15.5833V22.6667M17 29.75C9.95837 29.75 4.25 24.0416 4.25 17C4.25 9.95837 9.95837 4.25 17 4.25C24.0416 4.25 29.75 9.95837 29.75 17C29.75 24.0416 24.0416 29.75 17 29.75ZM17.0706 11.3333V11.475L16.9294 11.4753V11.3333H17.0706Z"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} width="24" height="24"
               viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            className={`${styles.searchInput} brutal-shadow`}
            placeholder="Поиск по артикулу или названию..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
          <tr>
            <th onClick={() => handleSortWithReset('id')}
                className={styles.sortableHeader}>
              Артикул{renderSortArrow('id')}
            </th>
            <th onClick={() => handleSortWithReset('supplierName')}
                className={styles.sortableHeader}>
              Наименование от поставщика{renderSortArrow('supplierName')}
            </th>
            <th onClick={handleCmsFilterClick}
                className={styles.sortableHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                Наименование в CMS
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" style={{flexShrink: 0}}>
                  <path d="M7 6V18M7 18L3 14M7 18L11 14" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <circle cx="18" cy="5" r="3" fill={topColor}/>
                  <circle cx="18" cy="12" r="3" fill={midColor}/>
                  <circle cx="18" cy="19" r="3" fill={botColor}/>
                </svg>
              </div>
            </th>
            <th onClick={() => handleSortWithReset('quantity')}
                className={`${styles.sortableHeader} ${styles.textRight}`}>
              Кол-во (шт){renderSortArrow('quantity')}
            </th>
            <th onClick={() => handleSortWithReset('price')}
                className={`${styles.sortableHeader} ${styles.textRight}`}>
              Цена (руб.){renderSortArrow('price')}
            </th>
          </tr>
          </thead>
          <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row) => (
              <tr key={row.id}>
                <td className={styles.boldText}>{row.id}</td>
                <td>{row.supplierName}</td>
                <td>{row.cmsName}</td>
                <td className={styles.textRight}>{row.quantity}</td>
                <td className={styles.textRight}>
                  <div className={styles.priceTooltipWrapper}>
                    {row.price.toLocaleString('ru-RU')}
                    <div className={`${styles.tooltip} brutal-shadow`}>
                      Расчет: {row.price.toLocaleString('ru-RU')} × {row.quantity} шт.
                      = <strong>{(row.price * row.quantity).toLocaleString('ru-RU')}</strong> ₽
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.emptyState}>Ничего не найдено
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.pagination}>
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className={styles.pageBtn}
            aria-label="Предыдущая страница"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className={styles.pageIndicator}>
            Страница {currentPage} из {totalPages || 1}
          </span>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={styles.pageBtn}
            aria-label="Следующая страница"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <button className={`${styles.downloadBtn} brutal-shadow`}>
          <span>Скачать файл</span>
          <svg className={styles.downloadIcon} width="28" height="28"
               viewBox="0 0 28 28" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M7 24.5H21M14 3.5V19.8333M8.16667 14L14 19.8333L19.8333 14"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};