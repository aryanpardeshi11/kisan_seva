import { NextRequest, NextResponse } from "next/server";
import { farmingKnowledge } from "../../../data/farmingKnowledge";

function getLocalFallbackReply(message: string, lang: string): string {
  const query = message.toLowerCase();

  // Cotton
  if (query.includes("cotton") || query.includes("kapas") || query.includes("कापूस") || query.includes("कपास")) {
    if (lang === "marathi") {
      return "कापूस (CICR नागपूर): मे 15 ते जून 30 पेरणीची योग्य वेळ आहे. बोंडअळीसाठी एकरी 5 फेरोमोन ट्रॅप लावा. संसर्ग जास्त असल्यास इमामेक्टिन बेंझोएट 0.5 ग्रॅम/लिटर फवारणी करा.";
    }
    if (lang === "hindi") {
      return "कपास (CICR नागपुर): बुवाई का सही समय 15 मई से 30 जून है। गुलाबी सुंडी के लिए प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। प्रकोप अधिक होने पर एमामेक्टिन बेंजोएट 0.5 ग्राम/लीटर का छिड़काव करें।";
    }
    return "Cotton (CICR Nagpur): Optimal sowing window is May 15 - June 30. Use 5 pheromone traps/acre for Pink Bollworm. Spray Emamectin Benzoate 0.5g/L if trap catch exceeds threshold.";
  }

  // Onion
  if (query.includes("onion") || query.includes("pyaj") || query.includes("kanda") || query.includes("कांदा") || query.includes("प्याज")) {
    if (lang === "marathi") {
      return "कांदा (नाशिक NHRDF): रब्बी कांद्यासाठी ऑक्टोबर-नोव्हेंबरमध्ये रोपवाटिका तयार करा. करपा रोगासाठी मॅन्कोझेब 2.5 ग्रॅम/लिटर फवारा. गंधक (सल्फर) चा योग्य वापर करा.";
    }
    if (lang === "hindi") {
      return "प्याज (नासिक NHRDF): रबी प्याज के लिए अक्टूबर-नवंबर में नर्सरी तैयार करें। बैंगनी धब्बा (Purple Blotch) के लिए मैंकोजेब 2.5 ग्राम/लीटर का छिड़काव करें।";
    }
    return "Onion (Nashik NHRDF): Rabi onion nursery is best raised Oct-Nov. For purple blotch, spray Mancozeb 2.5g/L every 7-10 days. Ensure adequate sulphur for bulb firmness.";
  }

  // Soybean
  if (query.includes("soybean") || query.includes("soya") || query.includes("सोयाबीन")) {
    if (lang === "marathi") {
      return "सोयाबीन (KVK अहमदनगर): 15 जून ते 15 जुलै दरम्यान पेरणी करा. बियाण्याला रायझोबियम (10 ग्रॅम/किलो) चोळा. सोयाबीनला युरियाची गरज नसते कारण ते नायट्रोजन स्वतः तयार करते.";
    }
    if (lang === "hindi") {
      return "सोयाबीन (KVK अहमदनगर): 15 जून से 15 जुलाई के बीच बुवाई करें। राइजोबियम (10 ग्राम/किग्रा) से बीज उपचार करें। सोयाबीन में यूरिया डालने की आवश्यकता नहीं होती।";
    }
    return "Soybean (KVK Ahmednagar): Sow between June 15 and July 15. Treat seeds with Rhizobium (10g/kg). Do not apply urea as soybean naturally fixes nitrogen.";
  }

  // Tomato
  if (query.includes("tomato") || query.includes("tamatar") || query.includes("टोमॅटो") || query.includes("टमाटर")) {
    if (lang === "marathi") {
      return "टोमॅटो (MPKV राहुरी): ठिबक सिंचनाचा वापर करा. करपा रोगासाठी मॅन्कोझेब 2.5 ग्रॅम/लिटर फवारा. संध्याकाळी पाणी देणे टाळा जेणेकरून रोग पसरणार नाही.";
    }
    if (lang === "hindi") {
      return "टमाटर (MPKV राहुरी): ड्रिप सिंचाई का उपयोग करें। झुलसा रोग (Early Blight) से बचाव के लिए मैंकोजेब 2.5 ग्राम/लीटर का छिड़काव करें। शाम को सिंचाई से बचें।";
    }
    return "Tomato (MPKV Rahuri): Use drip irrigation. Spray Mancozeb 2.5g/L for Early Blight. Avoid evening irrigation to prevent late blight fungal spread.";
  }

  // Wheat
  if (query.includes("wheat") || query.includes("gehun") || query.includes("गहू") || query.includes("गेहूं")) {
    if (lang === "marathi") {
      return "गहू (MPKV राहुरी): 1 ते 30 नोव्हेंबर दरम्यान पेरणी करा. मुकुट मुळे फुटण्याच्या वेळी (20-25 दिवस) पाणी देणे अत्यंत आवश्यक आहे. तांबेरा रोगासाठी प्रोपिकोनाझोल 1 मिली/लिटर फवारा.";
    }
    if (lang === "hindi") {
      return "गेहूं (MPKV राहुरी): 1 से 30 नवंबर के मध्य बुवाई करें। सीआरआई अवस्था (20-25 दिन) पर सिंचाई सबसे जरूरी है। गेरुई/रस्ट के लिए प्रोपिकोनाजोल 1 मिली/लीटर स्प्रे करें।";
    }
    return "Wheat (MPKV Rahuri): Sow November 1-30. Crown Root Initiation (20-25 days) is the most critical irrigation stage. Spray Propiconazole 1ml/L for rust control.";
  }

  // Fertilizer / NPK
  if (query.includes("fertilizer") || query.includes("khad") || query.includes("khat") || query.includes("खत") || query.includes("खाद")) {
    if (lang === "marathi") {
      return "खत व्यवस्थापन: एनपीके (NPK) खते योग्य प्रमाणात द्या. पेरणीच्या वेळी डीएपी (DAP) आणि पोटॅश वापरा. युरियाचे प्रमाण विभागून द्या. दर 2-3 वर्षांनी माती परीक्षण जरूर करा.";
    }
    if (lang === "hindi") {
      return "उर्वरक प्रबंधन: बुवाई के समय डीएपी (DAP) व पोटाश दें। यूरिया की खुराक 2-3 बार में बांटकर दें। हर 2-3 साल में मृदा परीक्षण (Soil Health Card) अवश्य कराएं।";
    }
    return "Fertilizer Guide: Apply DAP and Potash at sowing as basal dose. Split Urea into 2-3 top dressings. Always test soil health every 2-3 years via KVK.";
  }

  // General default fallback
  if (lang === "marathi") {
    return "नमस्कार! मी किसानस्कॅन एआय आहे. आपण कापूस, कांदा, सोयाबीन, टोमॅटो किंवा गहू या पिकांबद्दल, खतांचे प्रमाण, रोग नियंत्रण किंवा सरकारी योजनांबद्दल प्रश्न विचारू शकता. अधिक माहितीसाठी किसान कॉल सेंटर 1800-180-1551 वर संपर्क साधा.";
  }
  if (lang === "hindi") {
    return "नमस्ते! मैं किसानस्कैन एआई हूँ। आप कपास, प्याज, सोयाबीन, टमाटर, गेहूं, खाद की मात्रा, कीट नियंत्रण या सरकारी योजनाओं के बारे में पूछ सकते हैं। नि:शुल्क परामर्श के लिए किसान कॉल सेंटर 1800-180-1551 पर कॉल करें।";
  }
  return "Welcome to KisanScan AI! You can ask questions about Cotton, Onion, Soybean, Tomato, Wheat, fertilizer schedules, disease treatments, or government schemes. For direct support, call Kisan Call Centre at 1800-180-1551.";
}

export async function POST(req: NextRequest) {
  try {
    const { message, lang } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please provide a valid question." }, { status: 400 });
    }

    const langInstruction =
      lang === "hindi"
        ? "Reply only in Hindi (Devanagari script)."
        : lang === "marathi"
        ? "Reply only in Marathi (Devanagari script)."
        : "Reply in English.";

    // If Groq API Key is configured, use fast Llama-3.3 or Llama-3.1 model
    if (process.env.GROQ_API_KEY) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are KisanScan AI, an expert farming assistant for Indian farmers, especially in Maharashtra. Use the following knowledge base as your primary reference when answering questions:

${farmingKnowledge}

Instructions:
- Give short, practical, actionable advice (under 100 words)
- Use the knowledge base above when relevant to the question
- If asked about government schemes, contacts, or market info, use the exact real details given above
- If a question is outside farming (unrelated topics), politely redirect to farming topics
- Be warm and encouraging, like a helpful local agricultural expert
- ${langInstruction}`,
              },
              {
                role: "user",
                content: message,
              },
            ],
            max_tokens: 350,
            temperature: 0.6,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (apiErr) {
        console.warn("Groq API request failed, falling back to local agricultural knowledge base:", apiErr);
      }
    }

    // Fallback: rule-based knowledge engine grounded in farmingKnowledge
    const localReply = getLocalFallbackReply(message, lang);
    return NextResponse.json({ reply: localReply });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { reply: "KisanScan AI offline: Krishi Salah Kendra 1800-180-1551 par call karein." },
      { status: 200 }
    );
  }
}