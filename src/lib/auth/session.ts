import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { UserModel, IUserDocument } from "@/models/User";
import { UserRole } from "@/types";

export const SESSION_COOKIE_NAME = "kg_session_token";

export interface SessionUser {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  role: UserRole;
  status: "pending" | "active" | "suspended";
  avatar?: string;
  linkedEntityId?: string;
}

/**
 * Server-side session verification
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return null;
    }

    // In demo/dev mode with a mock token:
    if (sessionToken.startsWith("demo_session_")) {
      const parts = sessionToken.split(":");
      const role = (parts[1] || "super_admin") as UserRole;
      const email = parts[2] || "admin@bloomkindergarten.edu.bd";
      const name = parts[3] || "Administrator";

      return {
        id: "demo-user-id",
        firebaseUid: "demo-firebase-uid",
        email,
        name: decodeURIComponent(name),
        role,
        status: "active",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      };
    }

    // Real session verification with MongoDB
    await connectDB();
    const user = await UserModel.findOne({ firebaseUid: sessionToken }).lean<IUserDocument>();

    if (!user) {
      return null;
    }

    // Security check: User must be active to proceed
    if (user.status !== "active") {
      return null;
    }

    return {
      id: user._id.toString(),
      firebaseUid: user.firebaseUid,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
      avatar: user.avatar,
      linkedEntityId: user.linkedEntityId,
    };
  } catch (error) {
    console.error("Error retrieving session user:", error);
    return null;
  }
}

/**
 * Permission guard for API handlers and server components
 */
export function isAuthorized(user: SessionUser | null, allowedRoles: UserRole[]): boolean {
  if (!user || user.status !== "active") return false;
  if (user.role === "super_admin") return true;
  return allowedRoles.includes(user.role);
}
