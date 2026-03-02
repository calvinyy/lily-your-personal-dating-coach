import Link from "next/link";
import { Heart, MessageCircle, Sparkles, Upload, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span className="text-2xl font-bold text-gray-900">Lily</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Your Personal
          <br />
          <span className="text-rose-500">Dating Coach</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Stuck on what to say? Not sure what they mean? Lily analyzes your
          conversations and helps you navigate dating with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition"
          >
            Start Free Trial
          </Link>
          <Link
            href="#how-it-works"
            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-300 transition"
          >
            See How It Works
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">3 days free, no credit card required</p>
      </section>

      {/* Features */}
      <section id="how-it-works" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            How Lily Helps You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Upload className="w-6 h-6" />}
              title="Upload Screenshots"
              description="Simply screenshot your chats and upload them. Lily reads and understands the conversation."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Get Insights"
              description="Understand their tone, intentions, and what they really mean behind the words."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Reply Smarter"
              description="Stuck on what to say? Get personalized suggestions that match your style."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Stay Safe"
              description="Spot red flags early and make informed decisions about your matches."
            />
          </div>
        </div>
      </section>

      {/* Supported Apps */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Works With Your Favorite Apps
          </h2>
          <p className="text-gray-600 mb-12">
            Screenshot from any dating app. Lily handles the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <AppBadge name="Tinder" />
            <AppBadge name="Bumble" />
            <AppBadge name="Hinge" />
            <AppBadge name="探探" />
            <AppBadge name="Soul" />
            <AppBadge name="她说" />
            <AppBadge name="Coffee Meets Bagel" />
            <AppBadge name="OkCupid" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Simple Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Start free, upgrade when you're ready
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Free"
              price="$0"
              period="forever"
              features={[
                "3 analyses per day",
                "Basic tone analysis",
                "Text input only",
              ]}
              cta="Get Started"
              href="/signup"
            />
            <PricingCard
              name="Pro"
              price="$9.99"
              period="month"
              features={[
                "Unlimited analyses",
                "Screenshot upload",
                "Reply suggestions",
                "Conversation history",
              ]}
              cta="Start Free Trial"
              href="/signup?plan=pro"
              highlighted
            />
            <PricingCard
              name="Max"
              price="$19.99"
              period="month"
              features={[
                "Everything in Pro",
                "Compatibility analysis",
                "Priority support",
                "Advanced insights",
              ]}
              cta="Start Free Trial"
              href="/signup?plan=max"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-rose-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Dating Game?
          </h2>
          <p className="text-rose-100 text-lg mb-8">
            Join thousands of people who are dating smarter with Lily.
          </p>
          <Link
            href="/signup"
            className="bg-white text-rose-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span className="text-white font-semibold">Lily</span>
          </div>
          <p>© 2024 Lily. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
      <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function AppBadge({ name }: { name: string }) {
  return (
    <div className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 font-medium">
      {name}
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  href,
  highlighted = false,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-2xl ${
        highlighted
          ? "bg-rose-500 text-white ring-4 ring-rose-200"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={highlighted ? "text-rose-100" : "text-gray-500"}>
          /{period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${highlighted ? "text-rose-200" : "text-rose-500"}`} />
            <span className={highlighted ? "text-rose-50" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`block text-center py-3 rounded-full font-semibold transition ${
          highlighted
            ? "bg-white text-rose-500 hover:bg-gray-100"
            : "bg-rose-500 text-white hover:bg-rose-600"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
