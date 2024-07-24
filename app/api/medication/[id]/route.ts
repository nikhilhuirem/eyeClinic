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
    const medication = await prisma.medication.findMany({
      where: { patient_id: id },
    });
    
    if (!medication || medication.length === 0) {
      console.log("No glass prescription found for patient ID:", id);
      return NextResponse.json({ message: "Glass Prescription not found" }, { status: 404 });
    }

    console.log("Glass prescription found for patient ID:", id, medication);
    return NextResponse.json(medication, { status: 200 });
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

    const requiredFields = ["sl_no", "eye", "form", "medicine","dose","frequency","duration","remark"];

    for (const entry of body) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
    }

    const entries = body.map((entry: any) => ({
      patient_id: id,
      sl_no: entry.sl_no,
      eye: entry.eye,
      form: entry.form,
      medicine: entry.medicine,
      dose: entry.dose,
      frequency: entry.frequency,
      duration: entry.duration,
      remark: entry.remark,
    }));

    await prisma.medication.createMany({
      data: entries,
    });

    return NextResponse.json({ message: "Medications added" }, { status: 201 });
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
