import {
  ResultsTable
} from "../components/matcher/ResultsTable/ResultsTable.tsx";
import {
  UploadScreen
} from "../components/matcher/UploadScreen/UploadScreen.tsx";
import styles from './MainPage.module.css';
import {useNavigate, useParams} from "react-router-dom";

export const MainPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const handleUploadSuccess = (newSessionId: string) => {
    navigate(`/results/${newSessionId}`);
  };

  return (
    <div className={styles.pageContainer}>
      {!sessionId ? (
        <UploadScreen onUploadSuccess={handleUploadSuccess} />
      ) : (
        <ResultsTable sessionId={sessionId} />
      )}
    </div>
  );
}