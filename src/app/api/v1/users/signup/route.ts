import { PrismaClient } from "@prisma/client";
import { generateJwtToken } from "@/lib/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    console.log(username, password);
    const hashedPassword=await bcrypt.hash(password,10);
    // const hashedPassword = password;
    console.log(hashedPassword);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const token = await generateJwtToken({ id: user.id });
    console.log(user);
    return NextResponse.json({ user: user.email, token },{status:200});
  } catch (e) {
    console.log("error in signUpUser Controller", e);
    return NextResponse.json("Internal server error",{status:501});
  }
}

