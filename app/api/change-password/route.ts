import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    const { token, confirmpassword } = user;

    // 1) Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(confirmpassword, salt);

    // 2) Look up the user by token & expiry
    const userRecord = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!userRecord) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 3) Update the password (and optionally clear the token fields)
    await prisma.user.update({
      where: { id: userRecord.id },
      data: {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
