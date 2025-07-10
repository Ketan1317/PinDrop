import connect from "@/app/dbConfig/dbConfig";
import LinkModel from "@/Models/link";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

    try {
        await connect();

        const body = await request.json();
        const {url} = body;

        const link = await LinkModel.findOne({ url});
        if (!link) {
            return NextResponse.json({ success: false, message: "Link not found", status: 404 });
        }

        // Increment clicks
        link.clickCount = (link.clickCount || 0) + 1;
        console.log("cliccked")
        await link.save();

        return NextResponse.json({ success: true, message: "Clicks incremented", status: 200 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message, status: 500 });
    }
}