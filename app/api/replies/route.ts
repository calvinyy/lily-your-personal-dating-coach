import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { generateReplySuggestions } from "@/lib/openai";

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

    const { conversationId, tone = "casual" } = await req.json();

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: user.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const chatHistory = conversation.messages
      .map((m) => `${m.role === "user" ? "Them" : "You"}: ${m.content}`)
      .join("\n");

    const lastMessage = conversation.messages
      .filter((m) => m.role !== "user")
      .pop()?.content || "";

    const suggestions = await generateReplySuggestions(
      chatHistory,
      lastMessage,
      tone as any
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Reply generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate replies" },
      { status: 500 }
    );
  }
}
