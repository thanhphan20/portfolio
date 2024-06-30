import { getTechnologyOptions } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTechnologyOptions();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
