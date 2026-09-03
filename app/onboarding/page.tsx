"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import adviceDb from "../../data/advice_db.json";
import { Lang } from "../../lib/i18n";
import { useLanguage } from "../../components/LanguageContext";

const uniqueCrops = Array.from(
  new Set(Object.values(adviceDb).map((e: any) => e.crop.english))
);

export default function OnboardingPage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const [step, setStep] = useState(0);

  const [selectedLang, setSelectedLang] = useState<Lang>("english");
  const [primaryCrop, setPrimaryCrop] = useState("");

  const finish = () => {
    localStorage.setItem("kisanscan_onboarded", "true");
    localStorage.setItem(
      "kisanscan_profile",
      JSON.stringify({ primaryCrop })
    );
    setLang(selectedLang);
    router.push("/");
  };

  const skip = () => {
    localStorage.setItem("kisanscan_onboarded", "true");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress Bar (2 Steps) */}
        <div className="flex gap-2 mb-8">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-green-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Choose Language */}
        {step === 0 && (
          <div>
            <span className="text-4xl">🌐</span>
            <h1 className="text-2xl font-extrabold text-gray-800 mt-4">
              Choose Your Language
            </h1>
            <p className="text-gray-500 text-sm mt-2 mb-8">
              Poora app isi bhasha mein chalega.
            </p>
            <div className="space-y-3 mb-6">
              {[
                { value: "english", label: "English" },
                { value: "hindi", label: "हिंदी (Hindi)" },
                { value: "marathi", label: "मराठी (Marathi)" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedLang(opt.value as Lang)}
                  className={`w-full p-4 rounded-2xl text-left font-semibold transition-all ${
                    selectedLang === opt.value
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-4 font-bold shadow-lg mb-3"
            >
              Continue →
            </button>
            <button onClick={skip} className="w-full text-gray-400 text-sm font-medium">
              Skip for now
            </button>
          </div>
        )}

        {/* Step 1: Primary Crop */}
        {step === 1 && (
          <div>
            <span className="text-4xl">🌾</span>
            <h1 className="text-2xl font-extrabold text-gray-800 mt-4">
              Aap Zyada Konsi Crop Lete Ho?
            </h1>
            <p className="text-gray-500 text-sm mt-2 mb-8">
              Isse hum tumhe relevant tips denge.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {uniqueCrops.map((c) => (
                <button
                  key={c}
                  onClick={() => setPrimaryCrop(c)}
                  className={`p-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    primaryCrop === c
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={finish}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-4 font-bold shadow-lg mb-3"
            >
              Let's Start 🚀
            </button>
            <button onClick={skip} className="w-full text-gray-400 text-sm font-medium">
              Skip for now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}