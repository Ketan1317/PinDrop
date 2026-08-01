/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/app/dbConfig/dbConfig";
import LinkModel from "@/Models/link";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const { slug } = body;

    console.log("slug:", slug);

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    const deleted = await LinkModel.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
