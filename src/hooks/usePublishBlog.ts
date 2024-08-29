import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";

export function usePublishBlog(title:String,subtitle:String,topicProfileImage:String,
                content:{id:Number,content:String}[],topicTags:String[]){

    const router=useRouter();
    const authUser=useSelector((store:RootState)=>store.authUser);

    async function publishBlog(){
        const modifiedContent=content.map((c)=>c.content);
        console.log("modified content : ",modifiedContent);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/blogs/create`,
          { title, subtitle, content: modifiedContent, topicProfileImage, topicTags },
          {
            headers: {
              "Content-Type": "application/json",
              jwtToken: authUser.token,
            },
          }
        );
        if(response.data.id){
            router.push(`/${response.data.id}`);
        }
        console.log(response.data);
    }
    return publishBlog;
}