import Env from '../constants/env';

export default function NavBar({ routes }) {
  return (
    <nav className='flex items-center justify-between bg-white px-6 py-4 shadow-md'>
      <div className='flex items-center' id={Env.SYSTEM_NAME}>
        <img src='/images/logo.png' alt='Logo' className='mr-2 h-10 w-auto' />
        <span className='text-xl font-bold text-indigo-700'>{Env.SYSTEM_NAME}</span>
      </div>
      <div className='hidden space-x-8 md:flex'>
        {routes.map((route) => (
          <a
            key={route.name + route.href}
            href={route.href}
            className='text-gray-700 transition hover:text-indigo-600'
          >
            {route.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
