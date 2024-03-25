"use client";
import { getImageByOffset } from "@/API/unspalsh";
import { Post } from "@/components/post";
import { Button } from "@chakra-ui/react";
import {Level} from "level";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { Spinner } from '@chakra-ui/react'
import Cookies from "js-cookie";
import { JwtPayload, decode } from "jsonwebtoken";

export default function Home(){
    const db = new Level<string, any>("./db", {valueEncoding: "json"});
    const [offset, setOffset] = useState<number>(1);
    const [data, setData] = useState<any[]>([]);
    const [leveldb, setDb] = useState<any[]>([]);
    const [username, setUsername] = useState<string|undefined>();
    //db.put("images", []);
    //first render
    useEffect(()=>{
       async function init() {
        let images:{
                id:string,
                description: string,
                alt_description: string,
                image: string,
                likedBy: string[]
            }[];
        try{
            images = await db.get("images");
        }catch(error){
            images = [];
        }
           if(images.length < 30){
            setData((await getImageByOffset(offset)).data);
            (await getImageByOffset(offset)).data.forEach((item:any)=>{
                images.push({
                    id: item.id,
                    description: item.description,
                    alt_description: item.alt_description,
                    image: item.urls.thumb,
                    likedBy: []
                });
            });
            await db.put("images", images);
            setDb(images);
           }else{
            setData(images.slice((offset-1)*10, 10*offset));
           }
       }
       init();
    },[]);
    //after pagination firing
    useEffect(()=>{
        async function init() {
            let images:{
                id:string,
                description: string,
                alt_description: string,
                image: string,
                likedBy: string[]
            }[];
        try{
            images = await db.get("images");
        }catch(error){
            images = [];
        }
            if(images.length < 30){
             setData((await getImageByOffset(offset)).data);
             (await getImageByOffset(offset)).data.forEach((item:any)=>{
                 images.push({
                     id: item.id,
                     description: item.description,
                     alt_description: item.alt_description,
                     image: item.urls.thumb,
                     likedBy: []
                 });
             });
             await db.put("images", images);
             setDb(images);
            }else{
                setData(images.slice((offset-1)*10, 10*offset));
            }
        }
        init();
     },[offset]);

     useEffect(()=>{
        (async()=>{
            const token = await Cookies.get("token") as string;
            setUsername(await decode(token)?.username);
        })();
     },[username]);

    return <div className="w-screen flex justify-center items-center flex-wrap gap-3 pt-6">
        {(leveldb.length || data.length) ? data.map((item:any)=><Post id={item.id}
                                    username={username}
                                    data={leveldb}
                                    description={item.description}
                                    image={item?.urls?.thumb || item.image}
                                    alt_description={item.alt_description} 
                                    key={uuidv4()}
                              />
        ) : <Spinner />}
        <div className="w-full flex justify-center items-center gap-4">
            <Button colorScheme="blue" size="sm" onClick={()=>setOffset(1)}>1</Button>
            <Button colorScheme="blue" size="sm" onClick={()=>setOffset(2)}>2</Button>
            <Button colorScheme="blue" size="sm" onClick={()=>setOffset(3)}>3</Button>
        </div>
    </div>;
}