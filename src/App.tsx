// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import Header from "./components/header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import About from "./components/about";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/about" element={<About/>} />

            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
