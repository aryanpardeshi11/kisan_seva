import { NextRequest, NextResponse } from "next/server";

const DEFAULT_DISTRICT_WEATHER: Record<string, { temp: number; humidity: number; condition: string }> = {
  pune: { temp: 28, humidity: 65, condition: "Partly Cloudy" },
  nashik: { temp: 27, humidity: 72, condition: "Rain" },
  nagpur: { temp: 32, humidity: 60, condition: "Clear" },
  ahmednagar: { temp: 29, humidity: 68, condition: "Cloudy" },
  ahilyanagar: { temp: 29, humidity: 68, condition: "Cloudy" },
  aurangabad: { temp: 30, humidity: 62, condition: "Clear" },
  sambhajinagar: { temp: 30, humidity: 62, condition: "Clear" },
  solapur: { temp: 33, humidity: 55, condition: "Clear" },
  kolhapur: { temp: 27, humidity: 78, condition: "Rain" },
  amravati: { temp: 31, humidity: 64, condition: "Cloudy" },
  jalgaon: { temp: 32, humidity: 58, condition: "Clear" },
  satara: { temp: 26, humidity: 74, condition: "Rain" },
};

export async function GET(req: NextRequest) {
  const district = req.nextUrl.searchParams.get("district") || "Pune";
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  const normalized = district.trim().toLowerCase();

  try {
    let temp = 28;
    let humidity = 65;
    let condition = "Clear";
    let cityName = district;

    if (process.env.OPENWEATHER_API_KEY) {
      let weatherUrl = "";
      if (lat && lon) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
      } else {
        const cityCorrections: Record<string, string> = {
          ahilyanagar: "Ahmednagar",
          dharashiv: "Osmanabad",
          sambhajinagar: "Aurangabad",
        };
        const correctedName = cityCorrections[normalized] || district;
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          correctedName
        )},IN&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
      }

      const weatherRes = await fetch(weatherUrl);
      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        temp = Math.round(weatherData.main.temp);
        humidity = weatherData.main.humidity;
        condition = weatherData.weather?.[0]?.main || condition;
        cityName = weatherData.name || district;
      }
    } else {
      // Graceful fallback based on district averages
      const fallback = DEFAULT_DISTRICT_WEATHER[normalized] || { temp: 28, humidity: 65, condition: "Clear" };
      temp = fallback.temp;
      humidity = fallback.humidity;
      condition = fallback.condition;
      cityName = district.charAt(0).toUpperCase() + district.slice(1);
    }

    let riskScore = 20;
    if (humidity >= 70) riskScore += 30;
    if (temp >= 20 && temp <= 32) riskScore += 25;
    if (condition === "Rain" || condition === "Drizzle") riskScore += 15;
    riskScore = Math.min(riskScore, 95);

    const riskLevel = riskScore >= 70 ? "high" : riskScore >= 45 ? "medium" : "low";

    return NextResponse.json({
      district: cityName,
      temp,
      humidity,
      condition,
      riskScore,
      riskLevel,
    });
  } catch (error) {
    console.error("Risk score error:", error);
    return NextResponse.json(
      {
        district,
        temp: 28,
        humidity: 65,
        condition: "Normal",
        riskScore: 40,
        riskLevel: "medium",
      },
      { status: 200 }
    );
  }
}