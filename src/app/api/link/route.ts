/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { scrapeMetadata } from "../meta/route";
import LinkModel from "@/Models/link";
import connect from "@/app/dbConfig/dbConfig";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login again",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await request.json();

    const { url, slug, hashtags, title } = body;

    if (!url || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or Incomplete Details Given",
        },
        { status: 400 }
      );
    }

    const metaData = await scrapeMetadata(url);

    if (!metaData.success || !metaData.data) {
      return NextResponse.json(
        {
          success: false,
          message: metaData.message,
        },
        { status: 400 }
      );
    }

    const {
      url: finalUrl,
      title: scrapedTitle,
      description,
      favicon,
      image,
    } = metaData.data;

    const link = await LinkModel.create({
      userId,
      url: finalUrl,
      title: title || scrapedTitle,
      description,
      favicon,
      image:
        image ||
        "https://www.shutterstock.com/shutterstock/videos/1054933562/thumb/7.jpg",
      hashtags: hashtags || [],
      slug,
    });

    return NextResponse.json({
      success: true,
      message: "Link Saved Successfully",
      link,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login again",
        },
        { status: 401 }
      );
    }

    const allLinks = await LinkModel.find({
      userId: session.user.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      allLinks,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}