import {useState, useRef, useEffect} from 'react';
import styles from './CmsNameCell.module.css';
import {
  getStatusByPercentage
} from "../../../../utils/getStatusByPercentage.ts";

interface CmsNameCellProps {
  cmsName: string;
  matchPercentage: number;
  manuallyMatched?: boolean;
  suggestedNames?: string[];
  onSelectAlternative: (newName: string) => void;
}

export const CmsNameCell = ({
                              cmsName,
                              matchPercentage,
                              manuallyMatched,
                              suggestedNames = [],
                              onSelectAlternative
                            }: CmsNameCellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const status = getStatusByPercentage(matchPercentage, manuallyMatched);
  const isInteractive = status === 'red' || status === 'yellow';

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={cellRef}
      className={`${styles.cellWrapper} ${isInteractive ? styles[status] : ''}`}
    >
      <span className={styles.nameText}>{cmsName}</span>

      {isInteractive && (
        <div className={styles.actionArea}>
          <button
            className={styles.triggerBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Показать варианты сопоставления"
          >
            <svg className={styles.iconInfo} width="20" height="20"
                 viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 7.04183V10.3752M10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5ZM10.0415 12.8752V12.9585L9.9585 12.9582V12.8752H10.0415Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
            </svg>
            <svg className={styles.iconArrow} width="20" height="20"
                 viewBox="0 0 20 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8334 7.5L10 13.3333L4.16669 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>

          </button>

          {isOpen && (
            <div className={`${styles.dropdown} brutal-shadow`}>
              <div className={styles.dropdownHeader}>Выберите нужный вариант из
                списка
              </div>
              <ul className={styles.dropdownList}>
                {suggestedNames.map((name, idx) => (
                  <li
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => {
                      onSelectAlternative(name);
                      setIsOpen(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
                {suggestedNames.length === 0 && (
                  <li className={styles.dropdownEmpty}>Нет предложенных
                    вариантов</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};