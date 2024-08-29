import { PrismaClient } from "@prisma/client";
import { generateJwtToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json("Wrong email, user don't exist!!",{status:401});
    }
    const isValidPassword=await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return NextResponse.json("Wrong password!!",{status:401});
    }

    const token = await generateJwtToken({ id: user.id });
    return NextResponse.json({ user: user.email, token },{status:200});
  } catch (e) {
    console.log("error in signinUser Controller", e);
    return NextResponse.json("Internal Server error",{status:501});
  }
}
