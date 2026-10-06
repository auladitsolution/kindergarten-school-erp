import { NextResponse } from "next/server";
import { seedDatabaseIfEmpty } from "@/lib/seedData";

export async function GET() {
  const result = await seedDatabaseIfEmpty();
  return NextResponse.json(result);
}

export async function POST() {
  const result = await seedDatabaseIfEmpty();
  return NextResponse.json(result);
}
