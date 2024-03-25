import { render, screen } from "@testing-library/react";
import Home from "./page";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

describe("testing home page component", ()=>{
    it("test the loading of the component", async()=>{
        jest.mock("level");
        jest.mock('../../API/unspalsh'); // Mock the unsplash API module
        const mockGetImageByOffset = jest.fn(()=>[]);
        render(<ChakraProvider>
            <ToastContainer 
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            />
            <Home />
        </ChakraProvider>);
        //checking the existence of the pagination button
        const buttons = await screen.getAllByRole("button");
        expect(buttons.length).toBe(3);
    });
});