import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegulationPage from './pages/RegulationPage';
import ListView from './pages/ListView';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RegulationPage />} />
      <Route path="/list" element={<ListView />} />
    </Routes>
  </Router>
);

export default App;
