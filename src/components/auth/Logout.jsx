import { useDispatch } from 'react-redux';
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from '../../redux/AuthSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const apiUrl = '/api/auth/logout';

    try {
      dispatch(logoutStart());

      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(logoutFailure(data.errors));
        return;
      }

      dispatch(logoutSuccess(data));
    } catch (err) {
      dispatch(logoutFailure(err.message));
    }
  };

  return (
    <span
      className="text-red-700 cursor-pointer font-bold hover:opacity-70 p-2"
      onClick={handleLogout}
    >
      Logout
    </span>
  );
};

export default Logout;
