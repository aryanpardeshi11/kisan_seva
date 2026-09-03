# CropMind (KisanScan) 🌾

AI-Powered Crop Advisory & Disease Diagnosis Platform for Indian Farmers.

---

## 📁 Unified Project Structure

```text
SIH/
└── CropMind/                      # Unified project root
    ├── app/                       # Next.js 16 App Router (UI Pages & API Routes)
    │   ├── api/
    │   │   ├── chat/              # AI Assistant API (Groq Llama-3.3 + Offline Knowledge Base)
    │   │   └── risk-score/        # Regional Weather & Disease Risk Assessment API
    │   ├── assistant/             # Interactive KisanScan AI Voice & Text Chatbot
    │   ├── input/                 # Plant Disease Diagnosis (Photo Upload + Voice)
    │   ├── result/                # Diagnosis Result, Severity, Audio Advice & KVK Links
    │   ├── outbreak/              # Live Community Disease Outbreak Map & Reports
    │   ├── risk/                  # District-level Weather & Crop Health Risk Dashboard
    │   ├── my-crops/              # Farmer Crop Tracking & Growth Schedules
    │   ├── community/             # Farmer Discussion Feed & Direct Messaging
    │   ├── shop/                  # Verified Agricultural Inputs & Equipment Store
    │   ├── trends/                # APMC Mandi Price Trends & Advisory
    │   └── page.tsx               # Application Home Dashboard
    ├── components/                # Modular UI Components (Navbar, Audio, Toast, Gate)
    ├── data/                      # Agricultural Databases
    │   ├── advice_db.json         # Multilingual Treatment & Prevention Advice (EN, HI, MR)
    │   ├── labels.json            # 13 Disease & Crop Classes
    │   └── farmingKnowledge.ts    # ICAR/CICR Maharashtra Guides (Cotton, Onion, Soybean, Tomato, Wheat)
    ├── lib/                       # Utilities & Typed Helpers (adviceLookup.ts, i18n.ts)
    ├── ml/                        # AI & Machine Learning Module
    │   ├── Model/                 # TFLite model, weights, labels, and advice database
    │   ├── guides/                # Maharashtra Agricultural Research Station Guides
    │   └── predictor.py           # Standalone Python inference engine (with LiteRT/TF fallback)
    ├── public/                    # Static Web Assets & Browser Model Weights
    │   └── model/                 # cropmind_model.tflite (served for client inference)
    ├── android/                   # Capacitor 8 Android Native App (Gradle, APK build)
    ├── capacitor.config.ts        # Mobile App Configuration
    ├── next.config.ts             # Next.js 16 Configuration
    ├── package.json               # Node.js Dependencies & NPM Scripts
    └── .env.example               # Environment Variables Template
```

---

## 🚀 Quick Start: Running the App

### 1. Start the Web Application

From the `CropMind` directory:

```bash
npm run dev
```

Open your browser at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Testing All Features

### 1. Leaf Disease Diagnosis (Photo & Voice)

- **Path**: Click **"Analyze Photo / Sawaal Poocho"** on the home screen or navigate to `/input`.
- **Photo Upload**: Upload a crop leaf photo (e.g. Tomato Early Blight, Healthy Leaf, Cotton, etc.).
- **Voice Input**: Click the 🎤 microphone button to speak in Hindi, Marathi, or English.
- **Inference & Results** (`/result`):
  - High confidence diagnosis displays crop name, disease, severity level, symptoms, and treatment.
  - Listen to audio instructions using the **"🔊 Sunein / Listen"** button.
  - Low confidence / unclear photo triggers safety guidance ("Photo Unclear - retake in good lighting").

### 2. KisanScan AI Chat Assistant

- **Path**: Navigate to `/assistant`.
- **Query Types**:
  - Ask in English: *"What is the best sowing time for cotton in Maharashtra?"*
  - Ask in Marathi: *"सोयाबीन पेरणी कधी करावी आणि खत कोणते द्यावे?"*
  - Ask in Hindi: *"टमाटर में झुलसा रोग से बचाव के उपाय बताएं"*
- **Offline / Local Fallback**: Even without an external API key, the chatbot answers using embedded ICAR research guides!
- **Audio Output**: Tap the audio icon next to any message to hear spoken answers.

### 3. Weather & Crop Disease Risk Radar

- **Path**: Navigate to `/risk`.
- **Features**: Select or search any Maharashtra district (e.g. Nashik, Pune, Nagpur, Ahmednagar) to view real-time humidity, temperature, and calculated fungal/bacterial risk levels.

### 4. Community Disease Outbreak Tracker

- **Path**: Navigate to `/outbreak`.
- **Features**: View recently reported crop diseases from nearby farmers with district locations and severity alerts.

### 5. My Crops & APMC Trends

- **Path**: Navigate to `/my-crops` and `/trends`.
- **Features**: Track planted crops, harvesting countdowns, and Mandi price updates.

---

## 🤖 Standalone Python AI Model (`ml/predictor.py`)

To run the offline Python inference script:

```bash
cd ml
python predictor.py your_leaf_image.jpg
```

The script uses Google LiteRT (`ai-edge-litert`) for fast CPU inference and outputs diagnosis in English, Marathi, and Hindi.

---

## 📱 Building the Android APK

### Option A: Via Android Studio (Recommended)

1. Launch **Android Studio**.
2. Click **Open** and select:
   `SIH/CropMind/android`
3. Android Studio will synchronize dependencies automatically using its embedded Java runtime.
4. Select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate `app-debug.apk`.

### Option B: Via Command Line

1. Ensure JDK 17 or JDK 21 is installed with `JAVA_HOME` configured.
2. In `CropMind/android`:

```powershell
.\gradlew.bat assembleDebug
```

The APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## ⚙️ Environment Configuration (Optional)

Copy `.env.example` to `.env.local` to configure live external APIs:

```bash
# Optional: Groq API Key for Llama-3.3 LLM Chat
GROQ_API_KEY=your_groq_api_key_here

# Optional: OpenWeatherMap API Key for live weather metrics
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

*(The app is fully functional with smart built-in fallbacks even without these keys).*
