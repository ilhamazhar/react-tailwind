import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../redux/UserSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/api/login';

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      dispatch(loginStart());

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.errors);
        dispatch(loginFailure(data.errors));
        return;
      }

      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
      // setError(err.message);
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold uppercase my-7">
        login
      </h1>
      {error && <small className="text-red-500">{error}</small>}
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'LOGIN'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Don&apos;t have an account?</p>
        <Link to="/register">
          <span className="text-blue-600">Register </span>
          <span>here!</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
