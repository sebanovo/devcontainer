// src/pages/NotSubdomainRegister.jsx
export default function NotSubdomainRegister() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl'>
        {/* Icon */}
        <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
          <span className='text-3xl'>⚠️</span>
        </div>

        {/* Title */}
        <h1 className='text-2xl font-bold text-gray-800'>Tenant no registrado</h1>

        {/* Description */}
        <p className='mt-3 text-gray-600'>
          El subdominio que estás intentando acceder no existe o aún no ha sido registrado en el
          sistema.
        </p>
      </div>
    </div>
  );
}
