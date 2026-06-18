import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};