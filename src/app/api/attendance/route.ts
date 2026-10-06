import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AttendanceModel, IAttendanceDocument } from "@/models/Attendance";
import { AnyBulkWriteOperation } from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const classId = searchParams.get("classId");

    const query: Record<string, any> = { date };
    if (classId && classId !== "all") {
      query.classId = classId;
    }

    const records = await AttendanceModel.find(query);
    return NextResponse.json({ success: true, data: records, date });
  } catch (error: any) {
    console.error("GET /api/attendance error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { date, attendanceList, recordedBy } = await req.json();

    if (!date || !attendanceList || !Array.isArray(attendanceList)) {
      return NextResponse.json(
        { success: false, error: "Invalid attendance payload." },
        { status: 400 }
      );
    }

    const operations: AnyBulkWriteOperation<IAttendanceDocument>[] = attendanceList.map((item: any) => ({
      updateOne: {
        filter: {
          targetType: "student" as const,
          targetId: item.studentId,
          date,
        },
        update: {
          $set: {
            studentName: item.studentName,
            classId: item.classId,
            sectionId: item.sectionId,
            status: item.status as "present" | "absent" | "late" | "excused",
            remarks: item.remarks,
            recordedBy: recordedBy || "Teacher",
          },
        },
        upsert: true,
      },
    }));

    await AttendanceModel.bulkWrite(operations);

    return NextResponse.json({
      success: true,
      message: "Attendance recorded successfully!",
      updatedCount: operations.length,
    });
  } catch (error: any) {
    console.error("POST /api/attendance error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
