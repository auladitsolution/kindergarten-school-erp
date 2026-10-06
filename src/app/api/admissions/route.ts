import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdmissionModel } from "@/models/Admission";
import { generateAdmissionRef } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      childName,
      childNameBn,
      dob,
      gender,
      appliedClass,
      bloodGroup,
      previousSchool,
      fatherName,
      fatherPhone,
      fatherOccupation,
      motherName,
      motherPhone,
      motherOccupation,
      presentAddress,
      email,
    } = body;

    if (!childName || !dob || !gender || !appliedClass || !fatherName || !fatherPhone || !presentAddress || !email) {
      return NextResponse.json(
        { success: false, error: "Please fill in all mandatory fields." },
        { status: 400 }
      );
    }

    await connectDB();
    const count = await AdmissionModel.countDocuments();
    const applicationNo = generateAdmissionRef(count + 1);

    const admission = await AdmissionModel.create({
      applicationNo,
      appliedClass,
      session: "2026",
      childName,
      childNameBn,
      dob,
      gender,
      bloodGroup,
      previousSchool,
      fatherName,
      fatherPhone,
      fatherOccupation,
      motherName,
      motherPhone,
      motherOccupation,
      presentAddress,
      email,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      applicationNo,
      data: admission,
    });
  } catch (error: any) {
    console.error("Admission submission error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit admission application" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: Record<string, any> = status ? { status } : {};
    const admissions = await AdmissionModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: admissions });
  } catch (error: any) {
    console.error("Admissions fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
