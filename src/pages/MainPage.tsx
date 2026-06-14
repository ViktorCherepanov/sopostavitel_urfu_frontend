import {useState} from "react";
import type {ScreenState} from "../types/ScreenState.ts";
import {
  ResultsTable
} from "../components/matcher/ResultsTable/ResultsTable.tsx";
import {
  UploadScreen
} from "../components/matcher/UploadScreen/UploadScreen.tsx";
import { DownloadModal } from "../components/matcher/DownloadModal/DownloadModal.tsx";
import styles from './MainPage.module.css';

export const MainPage = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('upload');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.pageContainer}>
      {currentScreen === 'upload' && (
        <UploadScreen onUploadSuccess={() => setCurrentScreen('table')}></UploadScreen>
      )}

      {currentScreen === 'table' && (
        <ResultsTable></ResultsTable>
      )}

      {isModalOpen && (
        <DownloadModal></DownloadModal>
      )}
    </div>
  )
}