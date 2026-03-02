import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import Tesseract from "tesseract.js";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    });

    // Run OCR
    const {
      data: { text },
    } = await Tesseract.recognize(blob.url, "eng+chi_sim");

    // Save screenshot record
    await prisma.screenshot.create({
      data: {
        userId: user.id,
        url: blob.url,
        text,
        processed: true,
      },
    });

    return NextResponse.json({
      url: blob.url,
      text,
    });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
