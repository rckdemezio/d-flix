import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import "./backbutton.css";

function BackButton() {

    /**
     * Hook de navegação
     */
    const navigate = useNavigate();

    /**
     * Volta para página anterior
     */
    function handleBack() {

        navigate(-1);
    }

    return (
        <button
            className="back-button"
            onClick={handleBack}
        >

            <span>
                <ArrowLeft size={20} /> 
            </span>

            Voltar

        </button>
    );
}

export default BackButton;