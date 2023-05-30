/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import GameLine from "./gameLine";

test("Should Render correctly", () => {
    const mockProps = {
        game: {
            name: "test1234",
            released: false,
            owned: false,
            progress: "None",
            objective: "obj_patate",
        },
        updateGame: jest.fn(),
    };

    const view = render(
        <table>
            <tbody>
                <GameLine {...mockProps} />
            </tbody>
        </table>
    );

    const inputElements = view.container.querySelectorAll("td");

    expect(inputElements[0].innerHTML).toContain(mockProps.game.name);
    expect(inputElements[1].innerHTML).not.toContain("checked");
    expect(inputElements[2].innerHTML).not.toContain("checked");
    expect(inputElements[3].innerHTML).toContain('value="None"');
    expect(inputElements[4].innerHTML).toContain(mockProps.game.objective);
});

// it("Should update correctly", async () => {
//     const mockProps = {
//         game: {
//             name: "test1234",
//             released: false,
//             owned: false,
//             progress: "None",
//             objective: "obj_patate",
//         },
//         updateGame: jest.fn(),
//     };

//     const view = render(
//         <table>
//             <tbody>
//                 <GameLine {...mockProps} />
//             </tbody>
//         </table>
//     );

//     const inputElements = view.container.querySelectorAll("td");

//     fireEvent.change(inputElements[1].querySelector("input"), {
//         target: {
//             checked: true,
//         },
//     });

//     expect(inputElements[0].innerHTML).toContain(mockProps.game.name);
//     expect(inputElements[1].innerHTML).not.toContain("checked");
//     expect(inputElements[2].innerHTML).not.toContain("checked");
//     expect(inputElements[3].innerHTML).toContain('value="None"');
//     expect(inputElements[4].innerHTML).toContain(mockProps.game.objective);
// });
