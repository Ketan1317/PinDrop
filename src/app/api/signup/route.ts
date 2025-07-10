import connect from "@/app/dbConfig/dbConfig";
import User from "@/Models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import uploadOnCloudinary from "@/Services/cloudinary";

import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const formData = await req.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const file = formData.get("avatar") as File | null;

    if (!email || !password || !username) {
      return NextResponse.json({
        success: false,
        message: "Incomplete credentials",
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists with this email",
        status: 409,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let avatarUrl = "";

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = os.tmpdir();
      const tempPath = path.join(tempDir, `${Date.now()}-${file.name}`);
      await writeFile(tempPath, buffer);

      avatarUrl = await uploadOnCloudinary(tempPath);
    }

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      avatar: avatarUrl || undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      status: 201,
      newUser,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
}
