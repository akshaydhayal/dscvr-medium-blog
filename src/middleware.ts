// middleware.ts
import { NextRequest,NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import * as jwt from "jose";

export async function middleware(req: NextRequest) {
  let token = "";
    console.log("Incoming request path:", req.nextUrl.pathname);


  // Extract token from request headers
  if (typeof req.headers.get("jwttoken") === "string") {
    token = req.headers.get("jwttoken") || "";
  }
  console.log(token);
  const jwtSecret = process.env.JWT_SECRET;
  let decodedToken = null;
  
  console.log(jwtSecret);
  if (jwtSecret && token) {
    // decodedToken = jwt.verify(token, jwtSecret);
    decodedToken = await jwt.jwtVerify(token,jwt.base64url.decode(jwtSecret));
    console.log(decodedToken);
  }

  if (!decodedToken) {
    return NextResponse.json({ msg: "Invalid JWT Token" }, { status: 401 });
  }

  // If the token is valid and decoded, attach userId to request headers
  if (typeof decodedToken.payload.id=== "string") {
    const response = NextResponse.next();
    response.headers.set("userId", decodedToken.payload.id); // Set the userId in the response headers for later use
    return response;
  }

  // If the token is missing or not valid, deny access
  return NextResponse.json({ msg: "Unauthorized " }, { status: 401 });
}

// Export middleware configuration
export const config = {
  // matcher: ["/api/v1/blogs/create","/api/v1/blogs/update/:blogId*"], // Apply this middleware to API routes, adjust as necessary
  matcher: ["/api/v1/blogs/create", "/api/v1/blogs/update/:blogId*"], // Apply this middleware to API routes, adjust as necessary
};
