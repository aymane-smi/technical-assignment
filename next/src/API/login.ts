import { login } from "@/models/login"
import { loginResponse } from "@/models/loginReposne";
import axios from "axios"

export const Login = (credientls:login)=>{
    return axios.post<loginResponse>("/api/login", credientls);
}