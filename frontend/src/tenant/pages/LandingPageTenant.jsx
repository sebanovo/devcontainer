import { NavBarTenant } from '../components';
import Env from '../../constants/env';

export default function LandingPageTenant() {
  return (
    <main className='flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-green-100'>
      <NavBarTenant
        routes={[
          {
            name: 'Características',
            href: '#features',
          },
          {
            name: 'Precios',
            href: '#pricing',
          },
          {
            name: 'Testimonios',
            href: '#testimonials',
          },
        ]}
      ></NavBarTenant>
      <header className='flex flex-col items-center justify-center px-4 py-16 text-center'>
        <h1 className='mb-6 text-4xl font-extrabold text-green-800 md:text-6xl'>Colegio Aleman</h1>
        <p className='mb-8 max-w-3xl text-lg text-gray-700 md:text-xl'>
          El mejor Colegio de Santa Cruz
        </p>
        <img
          src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
          alt={`Dashboard ${Env.SYSTEM_NAME}`}
          className='mt-12 w-full max-w-5xl rounded-xl border border-gray-200 shadow-2xl'
        />
      </header>

      {/* Footer */}
      <footer className='bg-green-800 px-4 py-12 text-white'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <div className='mb-4 flex items-center'>
              <img
                src='/images/logo.png'
                alt={`${Env.SYSTEM_NAME} logo`}
                className='mr-2 h-8 w-auto'
              />
              <span className='text-xl font-bold'>{Env.SYSTEM_NAME}</span>
            </div>
            <p className='text-green-200'>
              La plataforma integral para la gestión educativa del siglo XXI.
            </p>
          </div>

          <div>
            <h4 className='mb-4 font-semibold'>Producto</h4>
            <ul className='space-y-2'>
              <li>
                <a href='#features' className='text-green-200 transition hover:text-white'>
                  Características
                </a>
              </li>
              <li>
                <a href='#pricing' className='text-green-200 transition hover:text-white'>
                  Precios
                </a>
              </li>
              <li>
                <a href='#testimonials' className='text-green-200 transition hover:text-white'>
                  Casos de éxito
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mx-auto mt-8 max-w-6xl border-t border-green-700 pt-8 text-center text-green-200'>
          <p>
            &copy; {new Date().getFullYear()} {Env.SYSTEM_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
