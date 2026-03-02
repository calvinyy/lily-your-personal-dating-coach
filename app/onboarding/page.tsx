"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";

const datingApps = [
  "Tinder",
  "Bumble",
  "Hinge",
  "探探",
  "Soul",
  "她说",
  "Coffee Meets Bagel",
  "OkCupid",
  "其他",
];

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "free";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bio: "",
    datingApps: [] as string[],
    preferences: {
      ageRange: [18, 35],
      lookingFor: "relationship",
    },
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit and redirect
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleApp = (app: string) => {
    setFormData((prev) => ({
      ...prev,
      datingApps: prev.datingApps.includes(app)
        ? prev.datingApps.filter((a) => a !== app)
        : [...prev.datingApps, app],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            <span className="text-3xl font-bold text-gray-900">Lily</span>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-2 rounded-full ${
                  i <= step ? "bg-rose-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About you (optional)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 h-24 resize-none"
                  placeholder="I enjoy hiking, coffee, and good conversations..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Which apps do you use?</h2>
              <p className="text-gray-600">Select all that apply</p>

              <div className="grid grid-cols-2 gap-3">
                {datingApps.map((app) => (
                  <button
                    key={app}
                    onClick={() => toggleApp(app)}
                    className={`p-3 rounded-xl border-2 transition text-left ${
                      formData.datingApps.includes(app)
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">What are you looking for?</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship type
                </label>
                <select
                  value={formData.preferences.lookingFor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        lookingFor: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="relationship">Long-term relationship</option>
                  <option value="casual">Casual dating</option>
                  <option value="friends">Friends first</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              <div className="bg-rose-50 p-4 rounded-xl">
                <p className="text-sm text-rose-700">
                  You're all set! Click finish to start using Lily.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition flex items-center justify-center gap-2"
            >
              {step === 3 ? "Finish" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
