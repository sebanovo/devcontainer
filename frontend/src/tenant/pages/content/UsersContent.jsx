import { useState, useEffect } from 'react';
import { getSubdomain } from '../../../utils/hosts';
import Env from '../../../constants/env';

function UsersContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const subdomain = getSubdomain(window.location.hostname);
      const response = await fetch(
        `http://${subdomain}.${Env.VITE_HOST}:8000/api/v1/tenant/users/`
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Usuarios</h2>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='mb-4 text-xl font-semibold'>Usuarios</h2>

      <div className='mb-6'>
        <button className='rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700'>
          Crear Usuario
        </button>
      </div>

      <div className='overflow-x-auto rounded-lg border border-gray-200'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Username
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Nombre
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Apellido
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900'>{user.id}</td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900'>{user.email}</td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900'>
                  {user.username}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900'>
                  {user.first_name}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-900'>
                  {user.last_name}
                </td>
                <td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
                  <button className='mr-3 text-indigo-600 hover:text-indigo-900'>Editar</button>
                  <button className='text-red-600 hover:text-red-900'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && !loading && (
        <p className='mt-4 text-gray-500'>No hay usuarios registrados.</p>
      )}
    </div>
  );
}

export default UsersContent;
