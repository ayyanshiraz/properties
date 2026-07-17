import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const propertyId = parseInt(resolvedParams.id);
    
    await prisma.property.delete({
      where: { id: propertyId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const propertyId = parseInt(resolvedParams.id);
    const body = await request.json();
    
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title: body.title,
        type: body.type,
        category: body.category,
        price: body.price,
        location: body.location,
        description: body.description,
        images: body.images,
        videos: body.videos,
        featuresList: body.featuresList || [],
        floorRates: body.floorRates || null,
        paymentPlans: body.paymentPlans || null
      }
    });
    
    return NextResponse.json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const propertyId = parseInt(resolvedParams.id);

    if (isNaN(propertyId)) {
      return NextResponse.json({ success: false, message: `Invalid ID` }, { status: 400 });
    }

    const singleProperty = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!singleProperty) {
      return NextResponse.json({ success: false, message: `Property nahi mili` }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: singleProperty });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: `System Error` }, { status: 500 });
  }
}