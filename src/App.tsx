import './App.css'
import {Sidebar} from "./components/layout/sidebar.tsx";

function App() {

  return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        {/* Справа — основной контент */}
        <main style={{ flex: 1, padding: '24px', width: '100%' }}>
          <h1>Добро пожаловать в сопоставитель</h1>
          <p>Здесь скоро будет таблица сопоставления...</p>
        </main>

      </div>
  )
}

export default App
