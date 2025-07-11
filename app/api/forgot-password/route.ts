import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { sendEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // 1) Look up the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 400 }
      );
    }

    // 2) Send reset email
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user.id,
    });

    // 3) Respond
    return NextResponse.json(
      { message: "Email sent", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
