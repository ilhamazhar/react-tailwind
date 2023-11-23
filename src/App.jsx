import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, OurProduct, Profile, Register } from './pages';
import { Navbar, PrivateRoute } from './components';
import Users from './pages/Users';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mx-20 my-10">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/our-product"
              element={<OurProduct />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
