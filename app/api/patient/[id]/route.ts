import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import GetIdFromRequest from "@/components/getIDFromRequest";

const prisma = new PrismaClient();

// Helper function to extract ID from the URL

export async function GET(req: NextRequest) {
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }
  //console.log(id);
  try {
    const patient = await prisma.patient.findUnique({
      where: { patient_id: id },
      select:{
        patient_id:true,
        age:true,
        name:true,
        sex:true,
        address:true,
        mobile:true,
      }
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
  const id = GetIdFromRequest(req);
  if (!id) {
    return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const requiredFieldsForCreation= ["name", "age", "sex", "address", "mobile", "date", "time", "patient_type", "consultancy_fee", "payment_status" ];
    const requiredFieldsForUpdation= ["name", "age", "sex", "address", "mobile" ];

    
    const existingPatient= await prisma.patient.findUnique({
      where:{
        patient_id:id
      }
    });
    if(existingPatient)
    {
      for (const field of requiredFieldsForUpdation) {
        if (!body[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
      await prisma.patient.update({
        where:{
          patient_id:id,
        },
        data:{
          age:body.age,
          name:body.name,
          sex:body.sex,
          address:body.address,
          mobile: body.mobile,
        }
      });
      return NextResponse.json({message: "Patient details updated"},{status:200});
      }else{
        for (const field of requiredFieldsForCreation) {
        if (!body[field]) {
          return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
        }
      }
      await prisma.patient.create({
        data: {
          patient_id: id,
          name: body.name,
          age: body.age,
          sex: body.sex,
          address: body.address,
          mobile: body.mobile,
          date: new Date(body.date), // Ensure date is stored correctly
          time: new Date(`1970-01-01T${body.time}Z`), // Convert time to Date object
          patient_type: body.patient_type,
          consultancy_fee: body.consultancy_fee,
          payment_status: body.payment_status,
        },
      });

      return NextResponse.json({ message: "Patient added" }, { status: 201 });}
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
