import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = `force-dynamic`;

export async function GET() {
  try {
    const pendingProperties = await prisma.property.findMany({
      where: { status: `PENDING` },
      include: { user: true },
      orderBy: { createdAt: `desc` }
    });
    return NextResponse.json({ success: true, data: pendingProperties }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedProperty = await prisma.property.update({
      where: { id: body.id },
      data: { status: `APPROVED` }
    });
    return NextResponse.json({ success: true, data: updatedProperty }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}