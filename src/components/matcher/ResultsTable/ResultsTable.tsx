import {useState} from 'react';
import styles from './ResultsTable.module.css';
import type {
  ActiveSort,
  MatchStatus,
  TableRowData
} from "../../../types/TableRowData.ts";
import {MOCK_DATA} from "../../../mocks/tableMockData.ts";
import {useTableSort} from "../../../hooks/useTableSort.ts";
import {CmsNameCell} from "./CmsNameCell/CmsNameCell.tsx";
import {getStatusByPercentage} from "../../../utils/getStatusByPercentage.ts";
import {COLOR, STATUS_ORDER} from "../../../utils/statusConfig.ts";

const CHUNK_SIZE = 50;

export const ResultsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cmsFilter, setCmsFilter] = useState<MatchStatus>('red');
  const [activeSortType, setActiveSortType] = useState<ActiveSort>(null);
  const [tableData, setTableData] = useState<TableRowData[]>(MOCK_DATA);

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  const {sortConfig, handleSort, resetSort, sort} = useTableSort();

  const filteredData = tableData.filter((row) =>
    row.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderedData = activeSortType === 'status'
    ? [...filteredData].sort((a, b) => {
      const statusA = getStatusByPercentage(a.matchPercentage, a.manuallyMatched);
      const statusB = getStatusByPercentage(b.matchPercentage, a.manuallyMatched);
      return (
        STATUS_ORDER[cmsFilter].indexOf(statusA) -
        STATUS_ORDER[cmsFilter].indexOf(statusB)
      );
    })
    : sort(filteredData);

  const currentRows = orderedData.slice(0, visibleCount);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // Если доскроллили до конца (оставляем запас 100px для плавности подгрузки)
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      if (visibleCount < orderedData.length) {
        setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, orderedData.length));
      }
    }
  };


  const handleCmsFilterClick = () => {
    if (activeSortType !== 'status') {
      setActiveSortType('status');
      setCmsFilter('red');
    } else {
      setCmsFilter(prev =>
        prev === 'red' ? 'yellow' : prev === 'yellow' ? 'green' : 'red'
      );
    }

    resetSort();
    setVisibleCount(CHUNK_SIZE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(CHUNK_SIZE);
  };

  const handleSortWithReset = (key: keyof TableRowData) => {
    setActiveSortType('column');
    handleSort(key);
    setVisibleCount(CHUNK_SIZE);
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

      <div className={styles.tableWrapper} onScroll={handleScroll}>
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
                <td>
                  <CmsNameCell
                    cmsName={row.cmsName}
                    matchPercentage={row.matchPercentage}
                    manuallyMatched={row.manuallyMatched}
                    suggestedNames={row.suggestedCmsNames}
                    onSelectAlternative={(newName) => {
                      setTableData(prevData =>
                        prevData.map(item =>
                          item.id === row.id
                            ? {...item, cmsName: newName, manuallyMatched: true}
                            : item
                        )
                      );
                    }}
                  />
                </td>
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
        <div className={styles.rowCountIndicator}>
          Отображено: <strong>{currentRows.length}</strong> из <strong>{orderedData.length}</strong>
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