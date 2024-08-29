import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import jwt from "jsonwebtoken";
import * as jwt from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



// export function generateJwtToken(payload: { id: string }) {
//   const jwtSecret = process.env.JWT_SECRET;
//   let token = "";
//   if (jwtSecret) {
//     token = jwt.sign(payload, jwtSecret);
//   }
//   return token;
// }

export async function generateJwtToken(payload: { id: string }) {
  const jwtSecret = process.env.JWT_SECRET;
  let token = "";
  if(jwtSecret){
    const secret=jwt.base64url.decode(jwtSecret);
    token=await new jwt.SignJWT(payload).setProtectedHeader({alg:'HS256'}).sign(secret)
    console.log(token);
  }
  return token;
}