import { Route, Routes, BrowserRouter  } from "react-router-dom";

// Importe das paginas
import Home from "./pages/Home/home";
import Filme from "./pages/Filme/filme";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/filme/:id" element={ <Filme /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;

