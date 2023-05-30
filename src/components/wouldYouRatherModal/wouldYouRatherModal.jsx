import React from "react";
import { useState, useRef, useEffect } from "react";

const WouldYouRatherModal = (props) => {
    const [gameToCompare, setGameToCompare] = useState();
    const [middleIndex, setMiddleIndex] = useState(0);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const modalRef = useRef();

    useEffect(() => {
        setGameToCompare(props.);
        modalRef.current.openModal();
    }, []);

    const handleChoice = (currentGameIsBetter) => {

    };

    return (
        <dialog ref={modalRef} className="modal">
            <div>Would you rather play...</div>
            <div className="games">
                <button
                    onClick={() => {
                        handleChoice(true);
                    }}
                >
                    {props.newGame}
                </button>
                or
                <button
                    onClick={() => {
                        handleChoice(false);
                    }}
                >
                    {gameToCompare || getGameToCompare()}
                </button>
            </div>
            {/* <div>
                <small>{compareList.length} games to filter...</small>
            </div> */}
        </dialog>
    );
};

export default WouldYouRatherModal;