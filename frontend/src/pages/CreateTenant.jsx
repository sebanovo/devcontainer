import { useState } from 'react';
import Env from '../constants/env';

export default function CreateTenant() {
  const [tenantName, setTenantName] = useState('');
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
      tenant_name: tenantName,
      manager_name: managerName,
      email: email,
      password: password,
    };

    try {
      const res = await fetch(`${Env.VITE_API_URL}/api/v1/register-tenant/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage(`Tenant "${data.tenant}" creado exitosamente con manager "${data.manager}"`);
        setTenantName('');
        setManagerName('');
        setEmail('');
        setPassword('');
        window.location.href = `http://${data.tenant}.${Env.VITE_HOST}:5173/`;
      } else if (res.status === 400) {
        // Mostrar errores de validación del backend
        const errors = Object.entries(data)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
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
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-center text-2xl font-bold'>Crear Tenant</h1>

        {message && <div className='mb-4 rounded bg-green-100 p-2 text-green-800'>{message}</div>}

        {error && <div className='mb-4 rounded bg-red-100 p-2 text-red-800'>{error}</div>}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-semibold text-gray-700'>Nombre del Tenant</label>
            <input
              type='text'
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              required
              className='mt-1 w-full rounded border p-2 focus:border-blue-300 focus:ring focus:outline-none'
            />
          </div>

          <div>
            <label className='block font-semibold text-gray-700'>Nombre del Encargado</label>
            <input
              type='text'
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              required
              className='mt-1 w-full rounded border p-2 focus:border-blue-300 focus:ring focus:outline-none'
            />
          </div>

          <div>
            <label className='block font-semibold text-gray-700'>Email del Encargado</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 w-full rounded border p-2 focus:border-blue-300 focus:ring focus:outline-none'
            />
          </div>

          <div>
            <label className='block font-semibold text-gray-700'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 w-full rounded border p-2 focus:border-blue-300 focus:ring focus:outline-none'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600'
          >
            Crear Tenant
          </button>
        </form>
      </div>
    </div>
  );
}
