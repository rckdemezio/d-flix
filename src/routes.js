import { Route, Routes, BrowserRouter  } from "react-router-dom";

// Importe das paginas
import Home from "./pages/Home/home";
import Filme from "./pages/Filme/filme";

import Header from "./components/Header";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/filme/:id" element={ <Filme /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;

