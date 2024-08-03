import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
};

export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);
  console.log("Request received for patient ID:", id);
  
  if (!id) {
    console.log("No patient ID found in the URL.");
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const glass_perscription = await prisma.glass_perscription.findMany({
      where: { patient_id: id },
    });
    
    if (!glass_perscription || glass_perscription.length === 0) {
      console.log("No glass prescription found for patient ID:", id);
      return NextResponse.json({ message: "Glass Prescription not found" }, { status: 404 });
    }

    console.log("Glass prescription found for patient ID:", id, glass_perscription);
    return NextResponse.json(glass_perscription, { status: 200 });
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

    const requiredFields = ["eye", "glass_type", "lens_type"];

    for (const entry of body) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
    }

    for (const entry of body) {
      const existingPrescription = await prisma.glass_perscription.findUnique({
        where: {
          patient_id_eye: {
            patient_id: id,
            eye: entry.eye,
          },
        },
      });

      if (existingPrescription) {
        await prisma.glass_perscription.update({
          where: {
            patient_id_eye: {
              patient_id: id,
              eye: entry.eye,
            },
          },
          data: {
            glass_type: entry.glass_type,
            lens_type: entry.lens_type,
          },
        });
      } else {
        await prisma.glass_perscription.create({
          data: {
            patient_id: id,
            eye: entry.eye,
            glass_type: entry.glass_type,
            lens_type: entry.lens_type,
          },
        });
      }
    }

    return NextResponse.json({ message: "Glass prescriptions processed" }, { status: 201 });
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
