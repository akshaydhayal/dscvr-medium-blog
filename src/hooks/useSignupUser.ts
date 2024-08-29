import { useRouter } from 'next/navigation';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../store/authUserStore";
import { toggleSignMethod } from "../store/signMethodStore";

export function useSignupUser(username:String,email:String,password:String){
    const dispatch=useDispatch();
    const router=useRouter();

    async function signupUser(){
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/users/signup`,
          {
            username,
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data);
        if(response.data.user){
            router.push("/feeds");
            dispatch(authUser({username:response.data.user,token:response.data.token}));
            dispatch(toggleSignMethod(null));
        }
    }
    return signupUser;
}