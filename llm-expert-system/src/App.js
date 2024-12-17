import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionnairePage from './pages/QuestionnairePage';
import ThreatPage from './pages/ThreatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Questionnaire Page */}
        <Route path="/" element={<QuestionnairePage />} />

        {/* Threat Details Page */}
        <Route path="/threat/:id" element={<ThreatPage />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for doesn't exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
