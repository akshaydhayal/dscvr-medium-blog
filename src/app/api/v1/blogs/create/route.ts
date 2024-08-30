import { authUser } from "@/store/authUserStore";
import { RootState } from "@/store/store";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, content, topicProfileImage, subtitle, topicTags } = await req.json();
    let userId = "";
    const userIdHeader=req.headers.get("userid");
    const userEmail=req.headers.get("email");
    if(userIdHeader){
        userId=userIdHeader;
    }
  
    console.log("userId in create : ",userId);
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    // });
    let user=null;
    if(userEmail){
      user = await prisma.user.findUnique({
        where: { email:userEmail },
      });
    }
    console.log("user : ",user, " userEmail : ",userEmail);
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        likes: 0,
        authorId: user.id,
        // authorId: "3bb85932-a9ff-46bc-9c4f-b25702c6c440",
        topicProfileImage,
        subtitle,
        topicTags,
      },
    });
    console.log(post);
    return NextResponse.json(post, { status: 200 });
  } catch (e) {
    console.log("error in createBlog controller", e);
    return NextResponse.json("Internal server error", { status: 501 });
  }
}