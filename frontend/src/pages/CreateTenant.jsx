import { useState } from 'react';
import Env from '../constants/env';

export default function CreateTenant() {
  const [subdomain, setSubdomain] = useState('');
  const [managerName, setManagerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      subdomain: subdomain,
      manager_name: managerName,
      email: email,
      password: password,
    };

    try {
      const res = await fetch(`http://${Env.VITE_SERVER_HOST}:8000/api/v1/register-tenant/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage(
          `Tenant "${data.subdomain}" creado exitosamente con manager "${data.manager_name}"`
        );
        setSubdomain('');
        setManagerName('');
        setEmail('');
        setPassword('');
        // Redirigir al nuevo subdominio
        setTimeout(() => {
          window.location.href = `http://${data.subdomain}.${Env.VITE_SERVER_HOST}:5173/`;
        }, 2000);
      } else if (res.status === 400) {
        // Mostrar errores de validación del backend
        const errors = Object.entries(data)
          .map(([field, msgs]) => {
            if (Array.isArray(msgs)) {
              return `${field}: ${msgs.join(', ')}`;
            }
            return `${field}: ${msgs}`;
          })
          .join(' | ');
        setError(errors);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } catch (err) {
      console.error(err);
      setError('Error conectando con el servidor.');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-lg'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Crear Nuevo Tenant</h1>
          <p className='mt-2 text-gray-600'>Registra tu nueva organización en la plataforma</p>
        </div>

        {message && (
          <div className='mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800'>
            <div className='flex items-center'>
              <span className='mr-2'>✅</span>
              <p>{message}</p>
            </div>
            <p className='mt-2 text-sm text-green-600'>
              Redirigiendo automáticamente en 2 segundos...
            </p>
          </div>
        )}

        {error && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
            <div className='flex items-center'>
              <span className='mr-2'>❌</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Campo Subdominio */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-gray-700'>Subdominio</label>
            <div className='flex items-center'>
              <input
                type='text'
                value={subdomain}
                onChange={(e) =>
                  setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                }
                required
                placeholder='ejemplo: mi-escuela'
                className='flex-1 rounded-l-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none'
                pattern='[a-z0-9-]+'
                title='Solo letras minúsculas, números y guiones'
              />
              <div className='flex min-w-[120px] items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-4 py-3 text-gray-600'>
                .{Env.VITE_SERVER_HOST}
              </div>
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <span className='mr-2'>🌐</span>
              <span>
                Tu URL será:{' '}
                <span className='font-mono font-medium'>
                  http://{subdomain || 'tusubdominio'}.{Env.VITE_SERVER_HOST}:5173
                </span>
              </span>
            </div>
            <p className='mt-1 text-xs text-gray-500'>
              Solo letras minúsculas, números y guiones. Sin espacios ni caracteres especiales.
            </p>
          </div>

          {/* Campo Manager Name */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-gray-700'>
              Nombre del Administrador
            </label>
            <input
              type='text'
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              required
              placeholder='Nombre completo'
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none'
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-gray-700'>
              Email del Administrador
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='admin@example.com'
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none'
            />
          </div>

          {/* Campo Password */}
          <div>
            <label className='mb-2 block text-sm font-semibold text-gray-700'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Mínimo 8 caracteres'
              minLength='8'
              className='w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none'
            />
          </div>

          {/* Botón de submit */}
          <button
            type='submit'
            className='w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-3 font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none'
          >
            <div className='flex items-center justify-center'>
              <span className='mr-2'>🚀</span>
              Crear Tenant
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
