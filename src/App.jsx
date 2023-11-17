import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Home, Login, OurProduct, Register } from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
