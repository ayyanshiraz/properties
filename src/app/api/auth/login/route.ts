import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: `Email and password are required` }, 
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: `Account not found` }, 
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: `Invalid credentials` }, 
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: `Authentication successful`, user: { id: user.id, email: user.email } }, 
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal server error` }, 
      { status: 500 }
    );
  }
}