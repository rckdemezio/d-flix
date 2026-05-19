import { Route, Routes, BrowserRouter } from "react-router-dom";

// Importe das paginas
import Home from "./pages/Home/home";
import Filme from "./pages/Filme/filme";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Favoritos from "./pages/Favoritos/favoritos";
import SearchPage from "./pages/Search/search";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Filme />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                theme="dark"
            />


        </BrowserRouter>
    );
}

export default RoutesApp;

