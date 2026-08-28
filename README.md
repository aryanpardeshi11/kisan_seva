# 🌾 AgriTech Nexus — Smart Farmer & APMC Mandi Portal

> **Created & Maintained by:** [Aryan Pardeshi](https://github.com/aryanpardeshi11)  
> **Tech Stack:** React 18, Vite, Capacitor Android, Vanilla CSS Design System, Google Gemini AI REST API  

---

## 🚀 Overview

**AgriTech Nexus** is a next-generation, high-performance agricultural portal and mobile application designed to empower Indian farmers, traders, and agricultural experts with real-time APMC Mandi commodity rates, AI plant disease diagnosis, custom soil NPK fertilizer calculators, soil testing lab finders, crop growth monitoring, and a vibrant community network.

---

## ✨ Key Features

### 1. 🤖 AI Hub & Smart Advisory (Tab 1)
- **24/7 AI Chatbot Console**: Answers farmer questions on crop diseases, fertilizers, subsidies, and weather.
- **Google Gemini 1.5 Flash Live Integration**: Integrated REST API service for real-time generative AI advice.
- **25 Quick AI Prompts**: One-tap quick queries for instant agronomy recommendations.
- **5 Smart Service Tool Launchers**:
  - 🩺 **Plant AI Doctor**: 28 crop disease models + AI leaf diagnosis scanner simulation.
  - 🧪 **Soil NPK Recommender**: 25 crop target ratios + custom fertilizer bag calculator.
  - 💰 **APMC Mandi Rates**: 28 real-time market commodity prices + user rate reporting form.
  - 📍 **Soil Labs & Cold Storage**: 25 testing labs & cold storages + slot reservation form.
  - 📈 **Crop Growth Monitor**: 25 field inspection logs + log entry recorder.

### 2. 👥 Farmer Community Network (Tab 2)
- **30 Feed Posts**: Interactive posts with like, comment, and share capabilities.
- **8 Community Groups**: Specialized clubs (Soybean, Cotton Pest, Mandi Trackers, Organic Farming).
- **Search & Create Modals**: Filter posts or create new community questions.

### 3. 🌗 Global Dark Mode & Auth Credentials Sync
- **Forest Emerald Theme System**: Soft beige canvas (`#F4F1EA`) & Forest Emerald (`#1B4D3E`).
- **Dynamic Dark Theme**: Deep dark emerald charcoal (`#12181B`).
- **Auth Credentials Sync**: Local user registration and login validation.

---

## 🛠️ Quick Start & Local Development

### Web App (React 18 + Vite)
```bash
# Navigate to react project directory
cd agritech_react

# Install dependencies
npm install

# Start local dev server (60fps native DOM)
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Android APK Build (Capacitor)
```bash
# Build production web bundle
npm run build

# Sync web assets with native Android project
npx cap sync

# Open project in Android Studio to build APK
npx cap open android
```

---

## 📁 Repository Structure

```
AgriTech-Nexus/
├── agritech_react/
│   ├── android/              # Native Android Studio project (Capacitor)
│   ├── src/
│   │   ├── components/       # Header, BottomNav, AuthModal, SettingsModal & Tool Modals
│   │   ├── config/           # Central developer Gemini API Key configuration
│   │   ├── context/          # ThemeContext & AuthContext state providers
│   │   ├── data/             # Complete datasets (Diseases, NPK, Mandi Rates, Soil Labs, Logs)
│   │   ├── services/         # Live Gemini AI REST service
│   │   └── views/            # AiHubView & CommunityView
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 👤 Author & License

Developed with ❤️ by **Aryan Pardeshi** for smart farming empowerment.
