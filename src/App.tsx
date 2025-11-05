import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import MovieDetail from "./pages/MovieDetail.tsx";



export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

