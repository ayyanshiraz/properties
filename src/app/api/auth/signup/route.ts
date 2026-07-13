import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: `Name, email, and password are required` }, 
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: `Account already exists` }, 
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    return NextResponse.json(
      { message: `Registration successful`, user: { id: newUser.id, email: newUser.email } }, 
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal server error` }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}