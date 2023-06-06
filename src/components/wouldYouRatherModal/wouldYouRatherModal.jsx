import React from "react";
import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";

const WouldYouRatherModal = (props) => {
    // const [gameToCompare, setGameToCompare] = useState();
    const [middleIndex, setMiddleIndex] = useState(0);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(props.isOpen || false);

    useEffect(() => {
        const diff = maxIndex - minIndex;
        setMiddleIndex(minIndex + Math.floor(diff / 2));
    }, [minIndex, maxIndex]);

    useEffect(() => {
        setIsOpen(props.isOpen);
    }, [props.isOpen]);

    const onOpen = () => {
        setMaxIndex(props.gameList.length - 1);
    };

    const handleChoice = (currentGameIsBetter) => {
        if (minIndex === maxIndex) {
            if (currentGameIsBetter) {
                props.addNewGame(props.newGameName, minIndex);
            } else {
                props.addNewGame(props.newGameName, minIndex + 1);
            }
            closeModal();
            return;
        }

        if (currentGameIsBetter) {
            let newMax = middleIndex - 1;
            setMaxIndex(newMax < minIndex ? minIndex : newMax);
        } else {
            // if (minIndex === middleIndex) {
            //     setMinIndex(minIndex + 1);
            // } else {
            let newMin = middleIndex + 1;
            setMinIndex(newMin > maxIndex ? maxIndex : newMin);
            // }
        }
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const closeModal = () => {
        props.closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={onOpen}
            shouldCloseOnEsc={true}
            style={customStyles}
            onRequestClose={closeModal}
        >
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
                <div>
                    {minIndex} - {middleIndex} - {maxIndex}
                </div>
            </div>
        </Modal>
    );
};

export default WouldYouRatherModal;
