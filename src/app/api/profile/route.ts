import connect from "@/app/dbConfig/dbConfig";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/Models/user";

export async function GET(request: NextRequest) {
  try {
    await connect();
    console.log("we are in profile")

    const session = await getServerSession(authOptions);

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Please login again" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    console.error("User Profile Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
