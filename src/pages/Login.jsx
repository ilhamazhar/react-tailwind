import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../redux/AuthSlice';
import { GoogleAuth } from '../components';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(loginFailure(error.message));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/api/auth/login';
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
        dispatch(loginFailure(data.errors));
        return;
      }

      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
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
          className="flex items-center justify-center bg-slate-700 text-white rounded-lg p-3 disabled:opacity-80"
          disabled={loading}
        >
          <svg
            aria-hidden="true"
            className="w-10 h-3 me-2 -ms-1"
            viewBox="0 0 256 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z"
              fill="white"
            />
          </svg>
          <span>{loading ? 'Loading...' : 'LOGIN'}</span>
        </button>
        <GoogleAuth />
      </form>
      <div className="flex gap-2 justify-center mt-3">
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
