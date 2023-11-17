import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold uppercase my-7">
        login
      </h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 disabled:opacity-80">
          Login
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
