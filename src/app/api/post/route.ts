import { getPages } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPages();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
