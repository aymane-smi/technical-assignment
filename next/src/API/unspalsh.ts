import axios from "axios";

export const getImageByOffset = (offset:number)=>{
    return axios.get(`/api/unsplash?offset=${offset}`);
}