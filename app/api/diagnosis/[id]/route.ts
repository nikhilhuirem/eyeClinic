import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import GetIdFromRequest from "@/components/getIDFromRequest";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }
  try {
    const diagnosis = await prisma.diagnosis.findUnique({
      where: { patient_id: id },
    });
    if (!diagnosis) {
      return NextResponse.json({ message: "Diagnosis not found" }, { status: 404 });
    }
    return NextResponse.json(diagnosis, { status: 200 });
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
    const {   complaint, clinical_comment, action_plan, review_date } = body;

    /*if (!complaint || !clinical_comment || !action_plan || !review_date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }*/

    const existingDiagnosis = await prisma.diagnosis.findUnique({
      where: { patient_id: id },
    });

    if (existingDiagnosis) {
      await prisma.diagnosis.update({
        where: { patient_id: id },
        data: {
          complaint: complaint,
          clinical_comment: clinical_comment,
          action_plan: action_plan,
          review_date: new Date(review_date),
        },
      });
      return NextResponse.json({ message: "Diagnosis updated" }, { status: 200 });
    } else {
      await prisma.diagnosis.create({
        data: {
          patient_id: id,
          complaint: complaint,
          clinical_comment: clinical_comment,
          action_plan: action_plan,
          review_date: new Date(review_date),
        },
      });
      return NextResponse.json({ message: "Diagnosis added" }, { status: 201 });
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
