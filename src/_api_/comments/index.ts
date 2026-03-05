import { apiOptions,apiRequest } from "../utils";
import { baseURL } from "../../constants";
const commentsUrl=`${baseURL}/comments`;
interface commetstype{
    name:string;
    email:string;
    body:string,
    postId:number
}
export const commentsServices={
    getAllComments: async()=>{
        const options = await apiOptions({
            url:commentsUrl,
            method:"get", 
        });
        return apiRequest(options);
    },
    createComments:async(params:commetstype)=>{
        const options = await apiOptions({
            url:commentsUrl,
             data:params,
            method:"post", 
        });
        return apiRequest(options);
    },
    updateComments:async(id:number,params:commetstype)=>{
        const options = await apiOptions({
            url:`${commentsUrl}/${id}`,
             data:params,
            method:"put", 
        });
        return apiRequest(options);
    },
    deleteComments:async(id:number)=>{
        const options = await apiOptions({
            url:`${commentsUrl}/${id}`,
            method:'delete', 
        });
        return apiRequest(options);
    }
}