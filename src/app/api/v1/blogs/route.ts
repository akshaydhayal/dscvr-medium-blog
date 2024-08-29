import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, resp: NextResponse) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { username: true, email: true },
        },
      },
    });
    return NextResponse.json(posts,{status:200});
} catch (e) {
    console.log("error in getAll Blogs controller", e);
    return NextResponse.json("Internal server error",{status:501});
  }
}

