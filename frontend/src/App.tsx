import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Импортируем компонент AppRoutes

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes /> {/* Используем компонент AppRoutes */}
    </div>
  );
};

export default App;
