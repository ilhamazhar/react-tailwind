import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const apiUrl = '/api/users';
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (response.status === 500) throw new Error(response.statusText);

      const userData = await response.json();

      if (!response.ok) throw new Error(userData.errors);

      setUsers(userData.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="shadow-md sm:rounded-lg">
      <span className="flex flex-col text-slate-500">
        {loading ? (
          <div className="max-w-xs p-0.5 font-medium text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            Loading...
          </div>
        ) : error ? (
          <small className="text-red-500">{error}</small>
        ) : null}
      </span>
      <Link
        to="/register"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-sm shadow-blue-500/50 dark:shadow-lg font-medium rounded text-sm py-2 px-5 my-5 text-centerp-2"
      >
        Register
      </Link>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3"
            >
              no
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              name
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              username
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              email
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              role
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              is active
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              total visit
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              last visited
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={user.id}
            >
              <td className="px-6 py-4">{i + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                {user.isActive ? (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                    Inactive
                  </span>
                )}
              </td>
              <div className="flex items-center justify-center">
                <td className="px-6 py-4">{user.visited}</td>
              </div>
              <td className="px-6 py-4">
                {user.visitedAt ? moment(user.visitedAt).format('lll') : null}
              </td>
              <td className="flex items-center px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
