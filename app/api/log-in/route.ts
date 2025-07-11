import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1) Look up the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // 2) Verify password
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // 3) Create JWT
    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      tokenPayload,
      process.env.TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    // 4) Return response & set cookie
    const response = NextResponse.json(
      { user: {
        id: user.id,      
        name: user.username,
        email: user.email,
      }, token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
