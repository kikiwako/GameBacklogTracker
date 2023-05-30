/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render } from "@testing-library/react";
import InputSection from "./inputSection";

test("Should add game properly", () => {
    const mockProps = {
        addNewGame: jest.fn(),
    };

    const view = render(<InputSection {...mockProps} />);

    const inputElement = view.container.querySelector("#new-game");
    const addButton = view.container.querySelector("#add-game");

    fireEvent.change(inputElement, {
        target: {
            value: "patate",
        },
    });

    fireEvent.click(addButton);

    expect(mockProps.addNewGame).toHaveBeenCalledWith("patate");
});
