import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
};

export async function GET(req:NextRequest) {
     const id=getIdFromRequest(req);
    if(!id){
        return NextResponse.json({message:"Patient ID is required"},{status:400});
    }
    try {
        const eye_perscription = await prisma.eye_perscription.findMany({
          where: { patient_id: id },
        });
        if (!eye_perscription||eye_perscription.length===0) {
          return NextResponse.json({ message: "Eye Perscription not found" }, { status: 404 });
        }
        return NextResponse.json(eye_perscription, { status: 200 });
      } catch (error) {
        console.error("Error executing query", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
}


export async function POST(req: NextRequest) {
   const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    const requiredFields = ["eye", "vision_type", "sphere", "cylinder", "axis", "va"];

    for (const entry of body) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
    }

    const entries = body.map((entry: any) => ({
      patient_id: id,
      eye: entry.eye,
      vision_type: entry.vision_type,
      sphere: entry.sphere,
      cylinder: entry.cylinder,
      axis: entry.axis,
      va: entry.va,
    }));

    await prisma.eye_perscription.createMany({
      data: entries,
    });

    return NextResponse.json({ message: "Eye perscriptions added" }, { status: 201 });
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export function methods() {
  return ["GET", "POST"];
}

export async function OPTIONS() {
  return NextResponse.json(null, { headers: { Allow: "GET, POST" } });
}