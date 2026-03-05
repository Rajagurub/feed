import { apiOptions,apiRequest } from "../utils";
import { baseURL } from "../../constants";
const posturl=`${baseURL}/posts`;
interface payloadtype{
    title:string;
    body:string;
}
export const postServices={
    getAllPost: async()=>{
        const options = await apiOptions({
            url:posturl,
            method:"get", 
        });
        return apiRequest(options);
    },
    createPost:async(params:payloadtype)=>{
        const options = await apiOptions({
            url:posturl,
             data:params,
            method:"post", 
        });
        return apiRequest(options);
    },
    updatePost:async(id:number,params:payloadtype)=>{
        const options = await apiOptions({
            url:`${posturl}/${id}`,
             data:params,
            method:"put", 
        });
        return apiRequest(options);
    },
    deletePost:async(id:number)=>{
        const options = await apiOptions({
            url:`${posturl}/${id}`,
            method:'delete', 
        });
        return apiRequest(options);
    }
}