// ✅ FIXED VERSION
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { scrapeMetadata } from "../meta/route";
import LinkModel from "@/Models/link";
import connect from "@/app/dbConfig/dbConfig";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  try {
    await connect();
    console.log("we are in /link")

    const session = await getServerSession(authOptions);
    console.log("Session:",session)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ success: false, message: "Please login again" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log("userId:",userId)

    const body = await request.json();
    console.log("body:",body)

    const { url, slug, hashtags, title } = body;

    if (!url || !slug) {
      return NextResponse.json({ success: false, message: "Invalid or Incomplete Details Given" }, { status: 400 });
    }

    const metaData = await scrapeMetadata(url);

    if (!metaData.success || !metaData.data?.url) {
      return NextResponse.json({ success: false, message: metaData.message || "Metadata issue" }, { status: 400 });
    }

    const link = await LinkModel.create({
      userId,
      url: metaData.data.url,
      title: title ||  metaData.data.title,
      description: metaData.data.description,
      favicon: metaData.data.favicon,
      image: metaData.data.image || "https://www.shutterstock.com/shutterstock/videos/1054933562/thumb/7.jpg?ip=x480",
      hashtags: hashtags || [],
      slug,
    });

    return NextResponse.json({ success: true, message: "Link Saved Successfully", link });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Please login again" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const allLinks = await LinkModel.find({ userId });

    return NextResponse.json({ success: true, allLinks });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
