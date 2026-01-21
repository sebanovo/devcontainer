export default function NotFound() {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4'>
      <div className='w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl'>
        {/* Número 404 grande */}
        <h1 className='text-8xl font-extrabold text-indigo-600'>404</h1>

        {/* Título */}
        <h2 className='mt-4 text-2xl font-bold text-gray-800'>Página no encontrada</h2>

        {/* Descripción */}
        <p className='mt-3 text-gray-600'>
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>

        {/* Botones */}
        <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
          <button
            onClick={goHome}
            className='rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700'
          >
            Volver al inicio
          </button>

          <button
            onClick={() => window.history.back()}
            className='rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-100'
          >
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
