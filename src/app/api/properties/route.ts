import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newProperty = await prisma.property.create({
      data: {
        title: body.title,
        type: body.type,
        category: body.category,
        area: body.area, // Yeh line area ko database mein save karegi
        price: body.price,
        location: body.location,
        description: body.description,
        images: body.images,
        videos: body.videos,
        userId: body.userId
      }
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: `desc`
      }
    })
    return NextResponse.json({ success: true, data: properties }, { status: 200 })
  } catch (error) {
    console.error(`Fetch Error:`, error)
    return NextResponse.json({ success: false, error: `Properties nahi milin` }, { status: 500 })
  }
}