import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prismadb";
import { sendEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // 1) Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 2) Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    // 3) Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // 4) Send verification email
    await sendEmail({
      email: newUser.email,
      emailType: "VERIFY",
      userId: newUser.id,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
