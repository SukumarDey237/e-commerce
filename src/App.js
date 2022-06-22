import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Bag" element={<Bag />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}
