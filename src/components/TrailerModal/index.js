import {
    X
} from "lucide-react";

import "./trailermodal.css";

function TrailerModal({

    videoKey,
    closeModal

}) {

    if (!videoKey) return null;

    return (

        <div
            className="trailer-overlay"
            onClick={closeModal}
        >

            <div
                className="trailer-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* FECHAR */}
                <button
                    className="close-modal"
                    onClick={closeModal}
                >

                    <X size={22} />

                </button>

                {/* VIDEO */}
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                    title="Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />

            </div>

        </div>
    );
}

export default TrailerModal;

