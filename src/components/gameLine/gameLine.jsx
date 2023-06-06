/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const GameLine = (props) => {
    const [gameData, setGameData] = useState();

    useEffect(() => {
        setGameData(props.game);
    }, []);

    useEffect(() => {
        if (gameData) props.updateGame(gameData);
    }, [gameData]);

    return (
        gameData !== undefined && (
            <tr>
                <td>{gameData.name}</td>
                <td>
                    <input
                        type="checkbox"
                        checked={gameData.released}
                        onChange={(e) => {
                            gameData.released = e.target.checked;
                            setGameData(gameData);
                        }}
                    />
                    {!gameData.released && (
                        <input
                            type="date"
                            onChange={(e) => {
                                gameData.releaseDate = e.target.value;
                                setGameData(gameData);
                            }}
                        />
                    )}
                </td>
                <td>
                    <input
                        type="checkbox"
                        checked={gameData.owned}
                        onChange={(e) => {
                            gameData.owned = e.target.checked;
                            setGameData(gameData);
                        }}
                    />
                </td>
                <td>
                    <select
                        value={gameData.progress}
                        onChange={(e) => {
                            gameData.progress =
                                e.target.selectedOptions[0].innerText;
                            setGameData(gameData);
                        }}
                    >
                        <option value="None">None</option>
                        <option value="Tried">Tried</option>
                        <option value="Played">Played</option>
                        <option value="Playing">Playing</option>
                        <option value="Finished">Finished</option>
                        <option value="Completed">Completed</option>
                        <option value="Abandoned">Abandoned</option>
                    </select>
                </td>
                <td>
                    <input
                        type="text"
                        value={gameData.objective}
                        onChange={(e) => {
                            gameData.objective = e.target.innerText;
                            setGameData(gameData);
                        }}
                    />
                </td>
                <td>
                    <button disabled>Up</button>
                    <button disabled>Down</button>
                    <button disabled>Delete</button>
                </td>
            </tr>
        )
    );
};

export default GameLine;
