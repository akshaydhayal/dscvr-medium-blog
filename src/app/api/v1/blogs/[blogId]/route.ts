import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient();
export async function GET(req: NextRequest,{params}:{params:{blogId:string}}) {
    try {
        const { blogId } = params;
        const blog = await prisma.post.findUnique({
            where: { id: blogId },
            include: {
                user: {
          select: {
              email: true,
              username: true,
            },
        },
    },
});
if (!blog) {
    return NextResponse.json("Blog not found", { status: 404 });
}
return NextResponse.json(blog, { status: 200 });
} catch (e) {
    console.log("error in getBlog controller", e);
    return NextResponse.json("Internal server error", { status: 501 });
}
}


