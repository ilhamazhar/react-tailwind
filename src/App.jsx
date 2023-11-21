import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Home, Login, OurProduct, Profile, Register } from './pages';
import { Navbar, PrivateRoute } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
            path="/about"
            element={<About />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
