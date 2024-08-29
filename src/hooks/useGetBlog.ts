import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../store/store";
import { Blog } from "../store/blogCache";

export function useGetBlog(blogId:String){
    const blogCache=useSelector((store:RootState)=>store.blogCache.cache);
    const [blogExists,setBlogExists]=useState<Blog>();

    useEffect(()=>{
        let blogFound=blogCache.find((blog)=>blog.id==blogId);
        setBlogExists(blogFound)
        console.log('blogFound : ',blogFound);
        async function getBlog(){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/blogs/${blogId}`);
            console.log(response.data);
            setBlogExists(response.data);
        }
        if(!blogFound){
            getBlog();
        }    
    },[blogId])
    return blogExists;
}