// src/App.jsx

import { Outlet } from 'react-router-dom'; // Importa o Outlet

export default function App() {
  return (
    <div className="App">
      <Outlet /> {/* Renderiza o componente correspondente à rota filha */}
      
    </div>
  );
}

