import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { StudentModel } from "@/models/Student";
import { generateStudentId } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const query = classId ? { classId } : {};

    const students = await StudentModel.find(query).sort({ rollNo: 1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      nameBn,
      classId,
      className,
      sectionId,
      sectionName,
      rollNo,
      dob,
      gender,
      bloodGroup,
      address,
      guardianName,
      guardianPhone,
      emergencyContact,
    } = body;

    if (!name || !classId || !rollNo || !dob || !gender || !emergencyContact) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const count = await StudentModel.countDocuments();
    const studentId = generateStudentId(count + 1);
    const admissionNo = `ADM-2026-${String(count + 101)}`;

    const newStudent = await StudentModel.create({
      studentId,
      admissionNo,
      name,
      nameBn,
      classId,
      className: className || classId,
      sectionId: sectionId || "Rose",
      sectionName: sectionName || "Rose",
      rollNo: Number(rollNo),
      dob,
      gender,
      bloodGroup: bloodGroup || "A+",
      address: address || "Uttara, Dhaka",
      guardianId: "guard-temp-id",
      guardianName: guardianName || "Parent",
      guardianPhone: guardianPhone || emergencyContact,
      admissionDate: new Date().toISOString().split("T")[0],
      academicYear: "2026",
      enrollmentStatus: "active",
      emergencyContact,
      photoUrl:
        gender === "Female"
          ? "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=400&auto=format&fit=crop&q=80",
    });

    return NextResponse.json({ success: true, data: newStudent });
  } catch (error: any) {
    console.error("POST /api/students error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
