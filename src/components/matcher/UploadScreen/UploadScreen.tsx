import styles from './UploadScreen.module.css';
import {type ChangeEvent, useRef, useState} from "react";
import { type DragEvent } from "react";

interface UploadScreenProps {
  onUploadSuccess: (sessionId: string) => void;
}

export const UploadScreen = ({onUploadSuccess}: UploadScreenProps) => {
  const dragCounter = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log('Файл принят на обработку:', file.name);

    // Генерируем временный ID сессии, пока нет интеграции с бэком
    const mockSessionId = `session_${Math.random().toString(36).substring(2, 9)}`;

    // Передаем этот ID в родительский компонент
    onUploadSuccess(mockSessionId);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };


  return (
    <div
      className={styles.container}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept=".csv, .xlsx, .xls"
        style={{display: 'none'}}
      />
      <h2 className={styles.title}>Начнем работу,<br/> загрузите ваш файл</h2>
      <button onClick={handleButtonClick}
              className={`${styles.uploadBtn} brutal-shadow`}>
        <span>Загрузить файл</span>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 19.5V13M16.25 15.1667L13 13L9.74996 15.1667M14.0833 3.25094C13.9798 3.25 13.8637 3.25 13.7309 3.25H8.8835C7.67006 3.25 7.06288 3.25 6.59941 3.48615C6.19172 3.69388 5.8605 4.0251 5.65278 4.43278C5.41663 4.89626 5.41663 5.50343 5.41663 6.71688V19.2835C5.41663 20.497 5.41663 21.1034 5.65278 21.5669C5.8605 21.9746 6.19172 22.3064 6.59941 22.5141C7.06243 22.75 7.66888 22.75 8.87998 22.75L17.12 22.75C18.331 22.75 18.9366 22.75 19.3996 22.5141C19.8073 22.3064 20.1396 21.9746 20.3474 21.5669C20.5833 21.1039 20.5833 20.4983 20.5833 19.2872V10.1028C20.5833 9.96988 20.5833 9.85357 20.5823 9.75M14.0833 3.25094C14.3927 3.25376 14.5885 3.265 14.7754 3.30987C14.9964 3.36294 15.2076 3.4507 15.4015 3.5695C15.6201 3.70345 15.8078 3.89114 16.1822 4.26563L19.5682 7.65157C19.9429 8.02629 20.1292 8.21314 20.2632 8.43179C20.382 8.62565 20.4699 8.83703 20.523 9.05811C20.5678 9.24491 20.5793 9.44072 20.5823 9.75M14.0833 3.25094V6.28333C14.0833 7.49678 14.0833 8.10308 14.3194 8.56656C14.5272 8.97424 14.8584 9.30635 15.2661 9.51408C15.7291 9.75 16.3355 9.75 17.5466 9.75H20.5823M20.5823 9.75H20.5835"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round"/>
        </svg>
      </button>
      {isDragging && (
        <div
          className={styles.dragOverlay}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.dragOverlayContent}>
            <span>Вставьте файл сюда</span>
          </div>
        </div>
      )}
    </div>
  );
};