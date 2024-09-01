import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import GetIdFromRequest from "@/components/getIDFromRequest";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json(
      { message: "Patient ID is required" },
      { status: 400 }
    );
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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json(
      { message: "Patient ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { complaint, clinical_comment, action_plan, review_date } = body;

    // Create an empty data object
    const data: any = {};

    // Add fields only if they are valid
    if (complaint !== null && complaint !== undefined) {
      data.complaint = complaint;
    }
    if (clinical_comment !== null && clinical_comment !== undefined) {
      data.clinical_comment = clinical_comment;
    }
    if (action_plan !== null && action_plan !== undefined) {
      data.action_plan = action_plan;
    }
    if (review_date && review_date.trim() !== "") {
      const validDate = new Date(review_date);
      if (!isNaN(validDate.getTime())) {
        data.review_date = validDate;
      } else {
        return NextResponse.json(
          { message: "Invalid review date" },
          { status: 400 }
        );
      }
    }

    const existingDiagnosis = await prisma.diagnosis.findUnique({
      where: { patient_id: id },
    });

    if (existingDiagnosis) {
      // Update only if data is not empty
      if (Object.keys(data).length > 0) {
        await prisma.diagnosis.update({
          where: { patient_id: id },
          data,
        });
        return NextResponse.json(
          { message: "Diagnosis updated" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "No fields to update" },
          { status: 400 }
        );
      }
    } else {
      if (Object.keys(data).length > 0) {
        data.patient_id = id; // Set patient_id for the create operation
        console.log(data);
        await prisma.diagnosis.create({
          data,
        });
        return NextResponse.json(
          { message: "Diagnosis added" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "No data to create" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export function methods() {
  return ["GET", "POST"];
}

export async function OPTIONS() {
  return NextResponse.json(null, { headers: { Allow: "GET, POST" } });
}