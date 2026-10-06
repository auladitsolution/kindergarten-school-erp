import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdmissionModel } from "@/models/Admission";
import { StudentModel } from "@/models/Student";
import { generateStudentId } from "@/lib/utils";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, reviewNotes, enrollNow } = await req.json();

    await connectDB();
    const admission = await AdmissionModel.findById(id);
    if (!admission) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    admission.status = status;
    if (reviewNotes !== undefined) {
      admission.reviewNotes = reviewNotes;
    }
    await admission.save();

    // If enrolling now, create official Student record
    if (enrollNow && status === "approved") {
      const studentCount = await StudentModel.countDocuments();
      const studentId = generateStudentId(studentCount + 1);

      await StudentModel.create({
        studentId,
        admissionNo: admission.applicationNo,
        name: admission.childName,
        nameBn: admission.childNameBn,
        classId: admission.appliedClass,
        className: admission.appliedClass,
        sectionId: "Rose",
        sectionName: "Rose",
        rollNo: studentCount + 1,
        dob: admission.dob,
        gender: admission.gender,
        bloodGroup: admission.bloodGroup || "O+",
        address: admission.presentAddress,
        guardianId: "guard-temp",
        guardianName: admission.fatherName,
        guardianPhone: admission.fatherPhone,
        admissionDate: new Date().toISOString().split("T")[0],
        academicYear: admission.session,
        enrollmentStatus: "active",
        emergencyContact: admission.fatherPhone,
      });

      admission.status = "enrolled";
      await admission.save();
    }

    return NextResponse.json({ success: true, data: admission });
  } catch (error: any) {
    console.error("Admission update error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
