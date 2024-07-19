import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";
import { RowDataPacket } from "mysql2";

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
    const [rows]: [RowDataPacket[], any] = await connection.execute(
      "SELECT * FROM patient WHERE patient_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
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
    const { patient_id, name, age, sex, address, mobile, date, time } = body;

    if (!age || !sex || !address || !mobile || !date || !time || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connection.execute(
      "INSERT INTO patient (patient_id, name, age, sex, address, mobile, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, age, sex, address, mobile, date, time]
    );

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
