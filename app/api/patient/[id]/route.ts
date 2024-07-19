import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to extract ID from the URL
const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
};

export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { patient_id: id },
    });

    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
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
    const { name, age, sex, address, mobile, date, time, patient_type, consultancy_fee, payment_status } = body;

    if (!age || !sex || !address || !mobile || !date || !time || !name || !patient_type || !consultancy_fee || !payment_status) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await prisma.patient.create({
      data: {
        patient_id: id,
        name: name,
        age: age,
        sex: sex,
        address: address,
        mobile: mobile,
        date: new Date(date), // Ensure date is stored correctly
        time: new Date(`1970-01-01T${time}Z`), // Convert time to Date object
        patient_type: patient_type,
        consultancy_fee: consultancy_fee,
        payment_status: payment_status,
      },
    });

    return NextResponse.json({ message: "Patient added" }, { status: 201 });
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
