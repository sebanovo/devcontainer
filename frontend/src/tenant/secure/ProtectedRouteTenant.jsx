import { Navigate } from 'react-router-dom';
import { getToken, isTokenValid } from '../../utils/auth';

function ProtectedRouteTenant({ children }) {
  const token = getToken();
  const isValid = isTokenValid(token);

  if (!token || !isValid) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

export default ProtectedRouteTenant;
