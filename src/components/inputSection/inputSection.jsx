import { useEffect, useState } from "react";

const InputSection = (props) => {
    const [newNameEntry, setNewNameEntry] = useState("");

    const addNewGame = () => {
        if (newNameEntry.length > 0) {
            props.addNewGame(newNameEntry);
        }

        setNewNameEntry("");
    };

    const downloadJsonFile = (data, filename) => {
        // Creating a blob object from non-blob data using the Blob constructor
        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        // Create a new anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "download";
        a.click();
        a.remove();
    };

    const importFile = () => {
        var importedFile = document.getElementById("gamesImport").files[0];

        if (!importedFile) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function () {
            var fileContent = JSON.parse(reader.result);

            props.importGames(fileContent);
        };
        reader.readAsText(importedFile);
    };

    return (
        <div id="input-section">
            <div>
                <input
                    type="text"
                    id="new-game"
                    onChange={(e) => {
                        setNewNameEntry(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        e.key === "Enter" && addNewGame();
                    }}
                    value={newNameEntry}
                />
                <button id="add-game" onClick={addNewGame}>
                    Add Game
                </button>
                <button
                    id="save-list"
                    onClick={() => {
                        downloadJsonFile(props.gameList, "GameList");
                    }}
                >
                    Save Games
                </button>
                <input type="file" id="gamesImport" />
                <button onClick={importFile}>Import Games</button>
            </div>
        </div>
    );
};

export default InputSection;
