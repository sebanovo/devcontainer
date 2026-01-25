function SidebarItemTenant({ item, activeSection, setActiveSection, isOpen, onToggle }) {
  const isActive = activeSection === item.id;

  if (item.children) {
    return (
      <li>
        <button
          onClick={onToggle}
          className={`flex w-full items-center justify-between rounded-xl p-3 transition-all duration-200 ${
            isOpen ? 'bg-white/10 text-white' : 'text-indigo-100 hover:bg-white/5'
          }`}
        >
          <div className='flex flex-1 items-center'>
            <span className='mr-3 text-lg'>{item.icon}</span>
            <div className='text-left'>
              <span className='block font-medium'>{item.name}</span>
              {item.description && (
                <span className='mt-1 block text-xs text-indigo-300'>{item.description}</span>
              )}
            </div>
          </div>
          <span className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <ul className='mt-1 ml-3 space-y-1 border-l-2 border-indigo-600/30 pl-3'>
            {item.children.map((child) => {
              const isChildActive = activeSection === child.id;
              return (
                <li key={child.id}>
                  <button
                    onClick={() => setActiveSection(child.id)}
                    className={`flex w-full items-center rounded-lg p-2 pl-3 text-left transition-all ${
                      isChildActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-indigo-200 hover:bg-white/5'
                    }`}
                  >
                    <span className='mr-3'>{child.icon}</span>
                    <span className='text-sm'>{child.name}</span>
                    {isChildActive && <span className='ml-auto text-xs'>●</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setActiveSection(item.id)}
        className={`flex w-full items-center rounded-xl p-3 transition-all ${
          isActive
            ? 'bg-white font-semibold text-indigo-900 shadow-sm'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <span className='mr-3 text-lg'>{item.icon}</span>
        <div className='text-left'>
          <span className='block'>{item.name}</span>
          {item.description && (
            <span
              className={`mt-1 block text-xs ${isActive ? 'text-indigo-700' : 'text-indigo-300'}`}
            >
              {item.description}
            </span>
          )}
        </div>
        {isActive && <span className='ml-auto text-sm'>→</span>}
      </button>
    </li>
  );
}

export default SidebarItemTenant;
