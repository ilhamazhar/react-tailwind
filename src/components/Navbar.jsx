import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const menus = [
  { name: 'Home', url: '/' },
  { name: 'Our Product', url: '/our-product' },
  { name: 'About', url: '/about' },
];

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-6xl flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="flex flex-wrap font-bold text-sm sm:text-xl">
            <span className="text-slate-400">Azhar</span>
            <span className="text-slate-600">Estate</span>
          </h1>
        </Link>
        <form className="flex bg-slate-100 items-center rounded-lg p-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-24 sm:w-64 bg-transparent focus:outline-none"
          />
          <FaSearch className="text-slate-400" />
        </form>
        {currentUser ? (
          <>
            <ul className="flex gap-4">
              {menus.map((menu) => (
                <li
                  key={menu.name}
                  className="hidden sm:inline text-slate-700 hover:underline"
                >
                  <Link to={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="/profile">
              <div className="flex items-center gap-3">
                <img
                  className="h-8 w-8 object-cover rounded-full"
                  src={currentUser.photo}
                  title={currentUser.name}
                />
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-slate-900 hover:bg-slate-700 text-white hover:opacity-90 rounded-lg px-3 py-1.5">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
