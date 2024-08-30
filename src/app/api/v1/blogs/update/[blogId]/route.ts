import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient();
export async function PUT(req: NextRequest, { params }: { params: { blogId: string } }) {
  try {
    // const { blogId } = req.params;
    const { blogId } = params;
    const { title, subtitle, content, topicProfileImage, topicTags, likes } = await req.json();
    let userId = "";
    console.log(req.headers);
    const useridHeader = req.headers.get("userid");
    const userEmail = req.headers.get("email");

    if (useridHeader) {
      userId = useridHeader;
    }
    console.log("userId in put : ", userId);

    const blogExists = await prisma.post.findUnique({
      where: { id: blogId },
    });
    if (!blogExists) {
      return NextResponse.json("Blog not found", { status: 404 });
    }
    console.log("x", blogExists.authorId, userId);
    // if (blogExists.authorId != userId) {
    if (blogExists.user.email != userEmail) {
      return NextResponse.json("You are not the author of this blog", { status: 403 });
    }
    console.log("likes in updateblog controller : ", likes);
    const post = await prisma.post.update({
      where: { id: blogId },
      data: {
        title,
        content,
        likes,
        subtitle,
        topicProfileImage,
        topicTags,
      },
    });
    console.log(post);
    return NextResponse.json(post, { status: 200 });
  } catch (e) {
    console.log("error in updateBlog controller", e);
    return NextResponse.json("Internal server error", { status: 501 });
  }
}
