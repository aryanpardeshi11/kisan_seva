import adviceDbData from "../data/advice_db.json";
import labelsData from "../data/labels.json";

interface AdviceEntry {
  crop: Record<string, string>;
  disease: Record<string, string>;
  severity: Record<string, string>;
  symptoms: Record<string, string>;
  treatment: Record<string, string>;
  prevention: Record<string, string>;
  sowing: Record<string, string>;
  irrigation: Record<string, string>;
  fertilizer: Record<string, string>;
}

const adviceDb = adviceDbData as unknown as Record<string, AdviceEntry>;
const labels = labelsData as unknown as string[];

export interface AdviceResult {
  key: string;
  isUncertain: boolean;
  confidence: number | null;
  crop: string;
  disease: string;
  severity: string;
  symptoms: string;
  treatment: string;
  prevention: string;
  sowing: string;
  irrigation: string;
  fertilizer: string;
}

// predictedIndex = model output index (0, 1, 2...) or -2 for low confidence / uncertain
// language = "english" | "hindi" | "marathi"
export function getAdviceByIndex(
  predictedIndex: number,
  language = "english",
  confidence: number = 0
): AdviceResult | null {
  const roundedConfidence = confidence > 0 ? Math.round(confidence * 100) : null;

  if (predictedIndex === -2) {
    return {
      key: "uncertain",
      isUncertain: true,
      confidence: roundedConfidence,
      crop: language === "marathi" ? "अज्ञात" : language === "hindi" ? "अज्ञात" : "Unknown",
      disease: language === "marathi" ? "स्पष्ट ओळखता आले नाही" : language === "hindi" ? "पहचान नहीं हो सकी" : "Could not identify",
      severity: language === "marathi" ? "अज्ञात" : language === "hindi" ? "अज्ञात" : "Unknown",
      symptoms: language === "marathi" ? "फोटो अस्पष्ट आहे किंवा पानावर पुरेसा प्रकाश नाही." : language === "hindi" ? "फोटो अस्पष्ट है या पत्ती पर पर्याप्त प्रकाश नहीं है।" : "Image unclear or low confidence.",
      treatment: language === "marathi"
        ? "चांगल्या नैसर्गिक प्रकाशात पुन्हा फोटो काढा. पान सपाट आणि फोकसमध्ये ठेवा. किंवा स्थानिक KVK अधिकाऱ्याशी संपर्क करा."
        : language === "hindi"
        ? "अच्छी रोशनी में दोबारा फोटो लें। पत्ती को सपाट रखें। या स्थानिक KVK अधिकारी से संपर्क करें।"
        : "Retake photo in good natural light. Keep leaf flat and in focus. Consult local KVK officer.",
      prevention: "-",
      sowing: "-",
      irrigation: "-",
      fertilizer: "-",
    };
  }

  const key = labels[predictedIndex];
  if (!key) {
    return null;
  }

  // Handle both single and triple underscore formats (as in predictor.py)
  const entry =
    adviceDb[key] ||
    adviceDb[key.replace(/___/g, "_")] ||
    adviceDb[key.replace(/_/g, "___")];

  if (!entry) {
    const cropName = key.split("_")[0] || "Unknown";
    return {
      key,
      isUncertain: false,
      confidence: roundedConfidence,
      crop: cropName,
      disease: key,
      severity: "Moderate",
      symptoms: "Is disease ka detailed data database mein uplabdh nahi hai.",
      treatment: `Consult nearest KVK agricultural officer for ${cropName}.`,
      prevention: "-",
      sowing: "-",
      irrigation: "-",
      fertilizer: "-",
    };
  }

  return {
    key,
    isUncertain: false,
    confidence: roundedConfidence,
    crop: entry.crop?.[language] || entry.crop?.english || "Unknown",
    disease: entry.disease?.[language] || entry.disease?.english || key,
    severity: entry.severity?.[language] || entry.severity?.english || "-",
    symptoms: entry.symptoms?.[language] || entry.symptoms?.english || "-",
    treatment: entry.treatment?.[language] || entry.treatment?.english || "-",
    prevention: entry.prevention?.[language] || entry.prevention?.english || "-",
    sowing: entry.sowing?.[language] || entry.sowing?.english || "-",
    irrigation: entry.irrigation?.[language] || entry.irrigation?.english || "-",
    fertilizer: entry.fertilizer?.[language] || entry.fertilizer?.english || "-",
  };
}
