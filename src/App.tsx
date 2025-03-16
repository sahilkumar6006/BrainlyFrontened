import './App.css';
import AuthPage from './pages/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/Dashboard" replace /> : <AuthPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" replace />} />   
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;