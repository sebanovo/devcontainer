import Env from '../../constants/env';

function SidebarTenant({ activeSection, setActiveSection }) {
  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '📊',
    },
    {
      id: 'users',
      name: 'Usuarios',
      icon: '👥',
    },
    {
      id: 'groups',
      name: 'Grupos',
      icon: '👨‍👩‍👧‍👦',
    },
  ];

  return (
    <div className='flex w-64 flex-col bg-indigo-800 text-white'>
      <div className='flex items-center p-4'>
        <span className='text-xl font-bold'>🎯 {Env.SYSTEM_NAME}</span>
      </div>

      <nav className='flex-1 overflow-y-auto pt-2'>
        <ul className='space-y-1 px-2'>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center rounded-lg p-3 transition hover:bg-indigo-700 ${
                  activeSection === item.id ? 'bg-indigo-600' : ''
                }`}
              >
                <span className='mr-3 text-lg'>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => (window.location.href = '/')}
          className='text-white-700 rounded-lg border border-gray-300 px-6 py-2 font-medium transition hover:bg-blue-600'
        >
          Volver al inicio
        </button>
      </nav>
    </div>
  );
}

export default SidebarTenant;
