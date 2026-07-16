import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

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

    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === `production`,
      path: `/`,
    };

    if (rememberMe) {
      cookieStore.set(`auth-token`, user.id.toString(), { 
        ...cookieOptions, 
        maxAge: 30 * 24 * 60 * 60 
      });
    } else {
      cookieStore.set(`auth-token`, user.id.toString(), cookieOptions);
    }

    return NextResponse.json(
      { message: `Authentication successful`, user: { id: user.id, email: user.email, name: user.name, role: user.role } }, 
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