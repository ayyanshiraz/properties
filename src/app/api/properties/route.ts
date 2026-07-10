import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

// Yeh POST function pehle wala hi hai (Add property ke liye)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, type, category, price, location, description } = body

    const newProperty = await prisma.property.create({
      data: {
        title,
        type,
        category: category || ``, 
        price,
        location,
        description,
      }
    })

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 })
  } catch (error) {
    console.error(`Database Error:`, error)
    return NextResponse.json({ success: false, error: `Property save karte waqt masla aaya` }, { status: 500 })
  }
}

// Yeh naya GET function Dashboard par data bhejne ke liye hai
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: `desc` // Taza tareen property sab se pehle aaye gi
      }
    })
    return NextResponse.json({ success: true, data: properties }, { status: 200 })
  } catch (error) {
    console.error(`Fetch Error:`, error)
    return NextResponse.json({ success: false, error: `Properties nahi milin` }, { status: 500 })
  }
}