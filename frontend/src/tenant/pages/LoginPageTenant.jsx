import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubdomain } from '../../utils/hosts';
import { setToken, setRefreshToken } from '../../utils/auth';
import Env from '../../constants/env';

function LoginPageTenant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const subdomain = getSubdomain(window.location.hostname);
      const response = await fetch(`http://${subdomain}.${Env.VITE_SERVER_HOST}:8000/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access);
        setRefreshToken(data.refresh);
        navigate('/panel-admin');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Credenciales inválidas');
      }
    } catch (error) {
      console.log(error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold'>Iniciar Sesión</h2>

        {error && <div className='mb-4 rounded-md bg-red-100 p-3 text-red-700'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='mb-2 block text-gray-700'>Usuario</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='mb-2 block text-gray-700'>Contraseña</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50'
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className='mt-4 text-center text-gray-600'>
          ¿No tienes cuenta?{' '}
          <a href='/signup' className='text-indigo-600 hover:underline'>
            Regístrate
          </a>
          <br />
          <a
            onClick={() => (window.location.href = '/')}
            className='cursor-pointer text-indigo-600 hover:underline'
          >
            Volver al inicio
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPageTenant;
