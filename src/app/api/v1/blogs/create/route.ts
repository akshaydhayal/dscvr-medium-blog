import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, content, topicProfileImage, subtitle, topicTags } = await req.json();
    let userId = "";
    const userIdHeader=req.headers.get("userid");
    if(userIdHeader){
        userId=userIdHeader;
    }
  
    console.log("userId in create : ",userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        likes: 0,
        authorId: userId,
        topicProfileImage,
        subtitle,
        topicTags,
      },
    });
    console.log(post);
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    console.log("error in createBlog controller", e);
    return NextResponse.json("Internal server error", { status: 501 });
  }
}