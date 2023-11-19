import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/api/users';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiRDNsNG1ldDQiLCJyb2xlIjoic3VwZXItYWRtaW4ifSwiaWF0IjoxNzAwMjI2ODUyLCJleHAiOjE3MDAzMTMyNTJ9.IhZfPI20b8saekqN4alzYlDT6glnxQZVUAT4fAV-VqM';

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      }).then(setLoading(true));

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors);
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold uppercase my-7">
        registration
      </h1>
      {error && <small className="text-red-500">{error}</small>}
      <form
        className="flex flex-col gap-3 my-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'REGISTER'}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-600 up">login </span>
          <span>here!</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
