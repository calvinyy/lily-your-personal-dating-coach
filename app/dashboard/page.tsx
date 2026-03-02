import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, MessageSquare, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      conversations: {
        orderBy: { updatedAt: "desc" },
        take: 5,
      },
      subscription: true,
    },
  });

  if (!user) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">Lily</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-gray-600">
            {user.conversations.length === 0
              ? "Start by analyzing your first conversation"
              : `You have ${user.conversations.length} conversation${
                  user.conversations.length === 1 ? "" : "s"
                }`}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/analyze"
            className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:shadow-lg transition group"
          >
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-4 group-hover:bg-rose-500 group-hover:text-white transition">
              <Plus className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analyze New Chat
            </h2>
            <p className="text-gray-600">
              Upload a screenshot or paste text to get insights
            </p>
          </Link>

          <Link
            href="/compatibility"
            className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:shadow-lg transition group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mb-4 group-hover:bg-purple-500 group-hover:text-white transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Check Compatibility
            </h2>
            <p className="text-gray-600">
              Compare profiles to see if you're a good match
            </p>
          </Link>
        </div>

        {/* Recent Conversations */}
        {user.conversations.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Conversations
              </h2>
              <Link
                href="/conversations"
                className="text-sm text-rose-500 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {user.conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/conversations/${conv.id}`}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{conv.matchName}</p>
                    <p className="text-sm text-gray-500">{conv.platform}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(conv.updatedAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
