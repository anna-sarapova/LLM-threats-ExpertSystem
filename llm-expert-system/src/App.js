import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionnairePage from './pages/QuestionnairePage';
import ThreatPage from './pages/ThreatPage';
import ThreatDictionaryPage from "./pages/ThreatDictionaryPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
      <Router>
          <Navbar/>
          <div style={{
              maxWidth: "800px",
              margin: "20px auto",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>

              <Routes>
                  {/* Main Questionnaire Page */}
                  <Route path="/" element={<QuestionnairePage/>}/>

                  {/* Threat Details Page */}
                  <Route path="/threat/:id" element={<ThreatPage/>}/>

                  {/* Threat Dictionary Page */}
                  <Route path="/dictionary" element={<ThreatDictionaryPage/>}/>

                  {/* 404 Page */}
                  <Route
                      path="*"
                      element={
                          <div style={{textAlign: 'center', marginTop: '50px'}}>
                              <h1>404 - Page Not Found</h1>
                              <p>The page you are looking for doesn't exist.</p>
                          </div>
                      }
                  />
              </Routes>
          </div>
      </Router>
);
};

export default App;
