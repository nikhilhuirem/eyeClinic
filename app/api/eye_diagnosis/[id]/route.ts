import { NextRequest, NextResponse } from "next/server";
import GetIdFromRequest from "@/components/getIDFromRequest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
  const id = GetIdFromRequest(req);
  console.log("Request received for patient ID:", id);
  
  if (!id) {
    console.log("No patient ID found in the URL.");
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const eye_diagnosis = await prisma.eye_diagnosis.findMany({
      where: { patient_id: id },
    });
    
    if (!eye_diagnosis || eye_diagnosis.length === 0) {
      console.log("No Eye Diagnosis found for patient ID:", id);
      return NextResponse.json({ message: "Eye Diagnosis not found" }, { status: 404 });
    }

    console.log("Eye Diagnosis found for patient ID:", id, eye_diagnosis);
    return NextResponse.json(eye_diagnosis, { status: 200 });
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    const requiredFields = ["sl_no", "eye",  "diagnosis"];

    for (const entry of body) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
    }

    for (const entry of body) {
      const existingEyeDiagnosis = await prisma.eye_diagnosis.findUnique({
        where: {
          patient_id_sl_no_eye: {
            patient_id: id,
            sl_no: entry.sl_no,
            eye:entry.eye,
          },
        },
      });

      if (existingEyeDiagnosis) {
        await prisma.eye_diagnosis.update({
          where: {
            patient_id_sl_no_eye: {
              patient_id: id,
              sl_no: entry.sl_no,
              eye:entry.eye,
            },
          },
          data: {
            sl_no:entry.sl_no,
            eye: entry.eye,
            diagnosis:entry.diagnosis,
          },
        });
        console.log("update");
        return NextResponse.json({ message: "Eye Diagnosis updated" }, { status: 200 });
      } else {
        await prisma.eye_diagnosis.create({
          data: {
            patient_id: id,
            sl_no: entry.sl_no,
            eye: entry.eye,
            diagnosis:entry.diagnosis,
          },
        });
        return NextResponse.json({ message: "Eye Diagnosis created" }, { status: 201 });
      }
    }

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
