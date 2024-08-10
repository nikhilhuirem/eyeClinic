import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const complaints = await prisma.complaints_list.findMany({
      select:{
        complaintOptions:true
      }
    });
    if (!complaints) {
      return NextResponse.json({ message: "Diagnosis not found" }, { status: 404 });
    }
    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const {  complaintOptions } = body;

    if (!complaintOptions ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingComplaints = await prisma.complaints_list.findUnique({
      where: { complaintOptions:complaintOptions },
    });

    if (existingComplaints) {
      await prisma.complaints_list.update({
        where: { complaintOptions: complaintOptions },
        data: {
          complaintOptions: complaintOptions,
        },
      });
      return NextResponse.json({ message: "Complaint updated" }, { status: 200 });
    } else {
      await prisma.complaints_list.create({
        data: {
          complaintOptions: complaintOptions,
        },
      });
      return NextResponse.json({ message: "Complaint added" }, { status: 201 });
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
