import React from "react";
import { useState, useRef, useEffect } from "react";

const WouldYouRatherModal = (props) => {
    // const [gameToCompare, setGameToCompare] = useState();
    const [middleIndex, setMiddleIndex] = useState(0);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);

    const modalRef = useRef();

    useEffect(() => {
        setMaxIndex(props.gameList.length);
        modalRef.current.openModal();
    }, []);

    useEffect(() => {
        const diff = maxIndex - minIndex;
        setMiddleIndex(minIndex + Math.floor(diff / 2));
    }, [minIndex, maxIndex]);

    const handleChoice = (currentGameIsBetter) => {};

    return (
        <dialog ref={modalRef} className="modal">
            <div>Would you rather play...</div>
            <div className="games">
                <button
                    onClick={() => {
                        handleChoice(true);
                    }}
                >
                    {props.newGameName}
                </button>
                or
                <button
                    onClick={() => {
                        handleChoice(false);
                    }}
                >
                    {props.gameList[middleIndex].name}
                </button>
            </div>
            {/* <div>
                <small>{compareList.length} games to filter...</small>
            </div> */}
        </dialog>
    );
};

export default WouldYouRatherModal;
