import { NextApiRequest, NextApiResponse } from "next";
import connection from "@/lib/db";
import { RowDataPacket } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const [rows]: [RowDataPacket[], any] = await connection.execute(
        "SELECT * FROM patient WHERE patient_id = ?",
        [id]
      );
      if (rows.length === 0) {
        res.status(404).json({ message: "Patient not found" });
      } else {
        res.status(200).json(rows[0]);
      }
    } else if (req.method === "POST") {
      const { age, sex, address, mobile, date, time } = req.body;

      if (!age || !sex || !address || !mobile || !date || !time) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      await connection.execute(
        "INSERT INTO patient (patient_id, age, sex, address, mobile, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, age, sex, address, mobile, date, time]
      );
      res.status(201).json({ message: "Patient added" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
