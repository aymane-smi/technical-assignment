import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Level } from "level";


export const Post = ({image, id, alt_description, description, data, username}:
    {image:string, id:string, alt_description:string, description: string, data:any[], username: string|undefined})=>{
    const [clicked, setClicked] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false);
    const db = new Level<string, any>("./db", {valueEncoding: "json"});
    useEffect(()=>{
        (async()=>{
            if(username != undefined){
            setClicked(true);
            data.forEach((item:any)=>{
                if(item.id === id && item.likedBy.includes(username))
                    setLiked(true);
            });
        }})();
    }, []);
    const onLike = async()=>{
        const result = data.map((item:any)=>{
            if(item.id === id && item.likedBy.includes(username)){
               setLiked(false);
               item.likedBy = item.likedBy.filter((user:string)=>user !== username)
            }else if(item.id === id && !item.likedBy.includes(username)){
                setLiked(true);
                item.likedBy.push(username);
            }
            return item;
            });
        await db.put("images", result);
    }
    return <Card className="w-[300px] h-[400px]">
        <CardHeader className="relative">
            {liked ? <FaHeart className="absolute top-[23px] left-[23px]" size={25} color="red" onClick={onLike}/>
                   : <CiHeart className="absolute top-[23px] left-[23px]" size={25} color="red" onClick={onLike}/>
            }
            <img src={image} alt={alt_description} className="h-[250px] w-[300px]"/>
        </CardHeader>
        <CardBody>
            {description == null ? 
                <p className="w-full text-[15px] font-semibold text-center">pas de description disponible</p>
                : 
                <p className="w-full text-[15px] font-semibold text-center">{(description && description.length > 100) ? description.substring(0, 100)+"..." : description}</p>
                }
            <button />
        </CardBody>
    </Card>
}