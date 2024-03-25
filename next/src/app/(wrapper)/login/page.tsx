"use client"
import { login } from "@/models/login";
import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "@/API/login";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const {register, handleSubmit, formState: {errors, isLoading}} = useForm<login>();
    const router = useRouter();
    useEffect(()=>{
        (async()=>{
            const result = await Cookies.get("token");
            if(result != undefined)
                router.push("/");
        })();
    }, []);
    const onSubmit:SubmitHandler<login> = async (credentils:login)=>{
        try{
            const result = (await Login(credentils)).data;
            console.log(result.token);
            document.cookie = `token=${result.token}; path=/`
            router.push("/");
        }catch(error:any){
            toast.error(error?.response.data.message);
        }
    }
    return <main className="flex justify-center items-center w-screen w-max-screen pt-10">
        <form className="py-4 h-fit gap-4 flex justify-center items-center flex-col w-[300px] shadow-lg rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[300px] p-3">
                <label htmlFor="username">Username</label>
                <Input id="username" placeholder="username" {...register("username", {required: "username is required"})} className="w-full"/>
                {errors.username && <p className="text-red-500 text-[12px]">{errors.username?.message}</p>}
            </div>
            <div className="w-[300px] p-3">
                <label htmlFor="password">Password</label>
                <Input id="password" placeholder="password" {...register("password", {required: "password is required"})} className="w-full" type="password"/>
                {errors.password && <p className="text-red-500 text-[12px]">{errors.password?.message}</p>}
            </div>
            <Button colorScheme="blue" size="md" type="submit">login</Button>
        </form>
    </main>;
}