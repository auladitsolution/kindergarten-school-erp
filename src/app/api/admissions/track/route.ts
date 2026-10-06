import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdmissionModel } from "@/models/Admission";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");

    if (!ref) {
      return NextResponse.json({ success: false, error: "Reference number is required" }, { status: 400 });
    }

    await connectDB();
    const admission = await AdmissionModel.findOne({
      applicationNo: { $regex: new RegExp(`^${ref.trim()}$`, "i") },
    });

    if (!admission) {
      return NextResponse.json(
        { success: false, error: "No admission application found with this reference number." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        applicationNo: admission.applicationNo,
        childName: admission.childName,
        appliedClass: admission.appliedClass,
        session: admission.session,
        status: admission.status,
        submittedAt: admission.submittedAt,
        reviewNotes: admission.reviewNotes,
      },
    });
  } catch (error: any) {
    console.error("Admission track error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
