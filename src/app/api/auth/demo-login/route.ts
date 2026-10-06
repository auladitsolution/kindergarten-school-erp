import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { UserRole } from "@/types";

const roleProfiles: Record<UserRole, { name: string; email: string }> = {
  super_admin: { name: "Dr. Farhana Rahman (Super Admin)", email: "superadmin@bloomkindergarten.edu.bd" },
  school_admin: { name: "Tanvir Ahmed (School Admin)", email: "admin@bloomkindergarten.edu.bd" },
  principal: { name: "Begum Rashida Khan (Principal)", email: "principal@bloomkindergarten.edu.bd" },
  teacher: { name: "Nusrat Jahan (Class Teacher - Nursery)", email: "nusrat.teacher@bloomkindergarten.edu.bd" },
  accountant: { name: "Kamrul Hasan (Senior Accountant)", email: "accounts@bloomkindergarten.edu.bd" },
  parent: { name: "Mohammad Rafiqul Islam (Parent of Rayan)", email: "rafiqul.parent@gmail.com" },
  student: { name: "Rayan Islam (Play Group)", email: "rayan@bloomkindergarten.edu.bd" },
};

export async function POST(req: Request) {
  try {
    const { role } = await req.json();
    const targetRole = (role || "super_admin") as UserRole;
    const profile = roleProfiles[targetRole] || roleProfiles.super_admin;

    const cookieValue = `demo_session_:${targetRole}:${profile.email}:${encodeURIComponent(profile.name)}`;

    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: "demo-id",
        firebaseUid: "demo-uid",
        name: profile.name,
        email: profile.email,
        role: targetRole,
        status: "active",
      },
    });
  } catch (error) {
    console.error("Demo login error:", error);
    return NextResponse.json({ success: false, error: "Failed to login" }, { status: 500 });
  }
}
