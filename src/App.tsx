import {Sidebar} from "./components/layout/Sidebar.tsx";
import {MainPage} from "./pages/MainPage.tsx";

function App() {

  return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <MainPage />
      </div>
  )
}

export default App
