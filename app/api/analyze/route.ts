import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { analyzeChat } from "@/lib/openai";

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

    const { text, matchName, platform } = await req.json();

    if (!text || !matchName || !platform) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check usage limits for free users
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAnalyses = await prisma.analysis.count({
      where: {
        conversation: {
          userId: user.id,
        },
        createdAt: {
          gte: today,
        },
      },
    });

    const isPro = user.subscription?.status === "active";
    if (!isPro && todayAnalyses >= 3) {
      return NextResponse.json(
        { error: "Daily limit reached. Upgrade to Pro for unlimited analyses." },
        { status: 429 }
      );
    }

    // Create or get conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        userId: user.id,
        matchName,
        platform,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          title: `Chat with ${matchName}`,
          matchName,
          platform,
        },
      });
    }

    // Save messages
    const lines = text.split("\n").filter((line: string) => line.trim());
    for (const line of lines) {
      // Simple heuristic: lines starting with "You:" or "Me:" are from user
      const isUser = line.match(/^(You|Me):/i);
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: isUser ? "user" : "assistant",
          content: line.replace(/^(You|Me):\s*/i, ""),
        },
      });
    }

    // Analyze with AI
    const profile = user.bio
      ? `About me: ${user.bio}`
      : undefined;
    const analysis = await analyzeChat(text, profile);

    // Save analysis
    await prisma.analysis.create({
      data: {
        conversationId: conversation.id,
        type: "tone",
        content: analysis || "",
      },
    });

    return NextResponse.json({
      conversationId: conversation.id,
      analysis,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze conversation" },
      { status: 500 }
    );
  }
}
