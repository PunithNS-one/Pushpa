import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SendPage from './pages/SendPage';
import ReceivePage from './pages/ReceivePage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/send" element={<SendPage />} />
          <Route path="/receive" element={<ReceivePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
