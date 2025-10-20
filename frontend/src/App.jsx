import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PanelAdminPage from './pages/PanelAdminPage';
import SignUpPage from './pages/SignUpPage';
import RegisterSchoolPage from './pages/RegisterSchoolPage';
import ProtectedRoute from './secure/ProtectedRoute';
import { Document } from './pages/Document';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/register-school' element={<RegisterSchoolPage />} />
        <Route path='/new' element={<Document />} />

        {/* Páginas protegidas */}
        <Route
          path='/panel-admin'
          element={
            <ProtectedRoute>
              <PanelAdminPage />
            </ProtectedRoute>
          }
        />

        {/* Ruta catch-all */}
        <Route path='*' element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
