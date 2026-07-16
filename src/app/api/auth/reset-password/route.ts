import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, message: "Missing token or password" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid or expired reset link. Please try again." }, { status: 400 });
    }

    // Password ko database mein update karein aur token ko clear kar dein
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully! You can now log in." });

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}