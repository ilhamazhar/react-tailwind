import { useDispatch } from 'react-redux';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from '../../redux/UserSlice';

const Delete = () => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const apiUrl = '/api/users/current';

    try {
      dispatch(deleteUserStart());

      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.status === 500) throw new Error(response.statusText);

      const deleteData = await response.json();

      if (!response.ok) {
        dispatch(deleteUserFailure(deleteData.errors));
        return;
      }

      dispatch(deleteUserSuccess(deleteData));
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  return (
    <span
      className="text-red-700 cursor-pointer font-bold hover:opacity-70 p-2"
      onClick={handleDelete}
    >
      Delete Account
    </span>
  );
};

export default Delete;
