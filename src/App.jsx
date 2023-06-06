import { useState, useRef, useEffect } from "react";
import "./App.css";
import InputSection from "./components/inputSection/inputSection";
import GameLine from "./components/gameLine/gameLine";
import WouldYouRatherModal from "./components/wouldYouRatherModal/wouldYouRatherModal";

const App = () => {
    const [gameList, setGameList] = useState([]);
    const [newGameName, setNewGameName] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const isDuplicate = (gameName) => {
        if (gameList.length === 0) return false;

        let duplicate = false;

        gameList.forEach((game) => {
            if (
                game.name &&
                game.name.toLowerCase() === gameName.toLowerCase()
            ) {
                duplicate = true;
                return false;
            }

            return true;
        });

        return duplicate;
    };

    const addNewGame = (name, index) => {
        setNewGameName(name);

        const newGame = {
            name: name,
            released: false,
            owned: false,
            progress: "None",
            objective: "",
        };

        if (index !== undefined) {
            gameList.splice(index, 0, newGame);
            setGameList(gameList.slice());
        } else {
            gameList.push(newGame);
            setGameList(gameList.slice());
        }
    };

    const handleAddNewGameButton = (name) => {
        if (!name) return alert("Name cannot be empty");

        if (isDuplicate(name)) return alert("This game already exist");

        setNewGameName(name);

        if (gameList.length > 0) return setModalIsOpen(true);

        addNewGame(name);
    };

    const handleGameUpdate = (update) => {
        // console.log(update);
        // const index = gameList.findIndex((g) => g.name === update.name);
        //     // gameList[index].released = update.released;
        //     // gameList[index].owned = update.owned;
        //     // gameList[index].progress = update.progress;
        //     // gameList[index].objective = update.objective;
        // setGameList(gameList.slice(index, 1, update));
    };

    return (
        <div className="App">
            <InputSection
                addNewGame={handleAddNewGameButton}
                updateName={setNewGameName}
                gameList={gameList}
                importGames={(games) => {
                    setGameList(games);
                }}
            />

            <table id="game-list">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Released</td>
                        <td>Owned</td>
                        <td>Progress</td>
                        <td>Objective</td>
                    </tr>
                </thead>
                <tbody>
                    {gameList.length > 0 &&
                        gameList.map((game) => {
                            return (
                                <GameLine
                                    key={game.name}
                                    game={game}
                                    updateGame={handleGameUpdate}
                                />
                            );
                        })}
                </tbody>
            </table>

            {modalIsOpen && (
                <WouldYouRatherModal
                    newGameName={newGameName}
                    gameList={gameList}
                    addNewGame={addNewGame}
                    isOpen={modalIsOpen}
                    closeModal={() => {
                        setModalIsOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default App;
