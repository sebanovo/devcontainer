import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTenant } from '../components';
import { DashboardContent, UsersContent, GroupsContent } from './content';
import Env from '../../constants/env';
import { removeTokens } from '../../utils/auth';

export default function PanelAdminPageTenant() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeTokens();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'groups':
        return <GroupsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      <SidebarTenant activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <header className='bg-white shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Panel de Administración - {Env.SYSTEM_NAME}
            </h1>
            <div className='flex items-center'>
              <span className='mr-4 text-gray-700'>Bienvenido, Admin</span>
              <button
                onClick={handleLogOut}
                className='rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700'
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
        <main className='flex-1 overflow-y-auto p-6'>{renderContent()}</main>
      </div>
    </div>
  );
}
