import { NextRequest, NextResponse } from "next/server";

const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
};

export default getIdFromRequest;
