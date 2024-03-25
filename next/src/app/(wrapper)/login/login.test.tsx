import LoginPage from "./page";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import {render, screen} from "@testing-library/react"
//import { useRouter } from "next/navigation";
import mockRouter from "next-router-mock";

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe("test login page", ()=>{
    it("check the page is loaded", async()=>{
        //mockRouter.replace("/");
        render(
            <ChakraProvider>
                <ToastContainer 
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                />
                <LoginPage />
            </ChakraProvider>);
        const username = await screen.findByLabelText("Username");
        const password = await screen.findByLabelText("Password");
        expect(username.id).toBe("username");
        expect(password.id).toBe("password");
    });
});