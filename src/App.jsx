import { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputSection from "./components/inputSection/inputSection";
import GameLine from "./components/gameLine/gameLine";

const App = () => {
    const [gameList, setGameList] = useState([]);
    const [gameName, setNewGameName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        const newGame = {
            name,
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

    const handleAddNewGame = (name) => {
        if (!name) return alert("Name cannot be empty");

        if (isDuplicate(name)) return alert("This game already exist");

        if (gameList.length > 0) return setModalIsOpen(true);

        addNewGame(name);
    };

    const handleGameUpdate = (update) => {
        const index = gameList.findIndex((g) => g.name === update.name);

        gameList[index].released = update.released;
        gameList[index].owned = update.owned;
        gameList[index].progress = update.progress;
        gameList[index].objective = update.objective;
        setGameList(gameList.slice());
    };

    return (
        <div className="App">
            <InputSection addNewGame={handleAddNewGame} />

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
                        gameList.map((game, index) => (
                            <GameLine
                                key={index}
                                game={game}
                                updateGame={handleGameUpdate}
                            />
                        ))}
                </tbody>
            </table>

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;
