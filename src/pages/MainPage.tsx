import {
  ResultsTable
} from "../components/matcher/ResultsTable/ResultsTable.tsx";
import {
  UploadScreen
} from "../components/matcher/UploadScreen/UploadScreen.tsx";
import styles from './MainPage.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import type {TableRowData} from "../types/TableRowData.ts";

export const MainPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableRowData[]>([]);

  const handleUploadSuccess = (newSessionId: string, data: TableRowData[]) => {
    setTableData(data);
    navigate(`/results/${newSessionId}`);
  };


  return (
    <div className={styles.pageContainer}>
      {!sessionId ? (
        <UploadScreen onUploadSuccess={handleUploadSuccess} />
      ) : (
        <ResultsTable initialData={tableData} />
      )}
    </div>
  );
}