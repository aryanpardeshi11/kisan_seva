import json
import os
import sys
import numpy as np
from PIL import Image

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

try:
    from ai_edge_litert.interpreter import Interpreter
except ImportError:
    try:
        # pyrefly: ignore [missing-import]
        from tflite_runtime.interpreter import Interpreter
    except ImportError:
        import tensorflow as tf
        Interpreter = tf.lite.Interpreter

# ─────────────────────────────────────────
# PATHS — automatically resolves folder location
# ─────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "Model") if os.path.exists(os.path.join(BASE_DIR, "Model")) else os.path.join(BASE_DIR, "model")

MODEL_PATH  = os.path.join(MODEL_DIR, "cropmind_model.tflite")
LABELS_PATH = os.path.join(MODEL_DIR, "labels.json")
ADVICE_PATH = os.path.join(MODEL_DIR, "advice_db.json")

CONFIDENCE_THRESHOLD = 0.75  # Below this = "unclear photo"

# ─────────────────────────────────────────
# Load everything ONCE at startup
# ─────────────────────────────────────────
interpreter = Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details  = interpreter.get_input_details()
output_details = interpreter.get_output_details()

with open(LABELS_PATH, "r") as f:
    class_labels = json.load(f)

with open(ADVICE_PATH, "r", encoding="utf-8") as f:
    advice_db = json.load(f)

print("✅ Model loaded successfully")
print(f"✅ {len(class_labels)} disease classes ready")
print(f"✅ {len(advice_db)} advice entries loaded")


# ─────────────────────────────────────────
# Main predict function
# ─────────────────────────────────────────
def predict(image_path, language="english"):
    """
    Takes a photo path, returns disease + advice.

    language options: "english", "marathi", "hindi"
    """

    # Step 1 — Load and resize image to 224x224
    img = Image.open(image_path).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Step 2 — Run model
    interpreter.set_tensor(input_details[0]['index'], img_array)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])[0]

    confidence     = float(np.max(predictions))
    predicted_class = class_labels[np.argmax(predictions)]

    # Step 3 — Low confidence = unclear photo
    if confidence < CONFIDENCE_THRESHOLD:
        return {
            "predicted_class": "uncertain",
            "confidence": round(confidence * 100, 2),
            "crop":     {"english": "Unknown",           "marathi": "अज्ञात",                    "hindi": "अज्ञात"},
            "disease":  {"english": "Could not identify","marathi": "स्पष्ट ओळखता आले नाही",     "hindi": "पहचान नहीं हो सकी"},
            "severity": {"english": "Unknown",           "marathi": "अज्ञात",                    "hindi": "अज्ञात"},
            "symptoms": {"english": "Image unclear.",    "marathi": "फोटो अस्पष्ट आहे.",         "hindi": "फोटो अस्पष्ट है।"},
            "treatment":{"english": "Retake photo in good natural light. Keep leaf flat and in focus. Consult local KVK officer.",
                         "marathi": "चांगल्या नैसर्गिक प्रकाशात पुन्हा फोटो काढा. पान सपाट ठेवा. स्थानिक KVK अधिकाऱ्याशी संपर्क करा.",
                         "hindi":   "अच्छी रोशनी में दोबारा फोटो लें। पत्ती सपाट रखें। स्थानिक KVK अधिकारी से संपर्क करें।"},
            "prevention":{"english":"","marathi":"","hindi":""},
            "sowing":    {"english":"","marathi":"","hindi":""},
            "irrigation":{"english":"","marathi":"","hindi":""},
            "fertilizer":{"english":"","marathi":"","hindi":""}
        }

    # Step 4 — Look up advice (handles both _ and ___ formats)
    advice = (
        advice_db.get(predicted_class) or
        advice_db.get(predicted_class.replace("___", "_")) or
        advice_db.get(predicted_class.replace("_", "___"))
    )

    # Step 5 — If class not in JSON yet, return basic fallback
    if not advice:
        crop_name = predicted_class.split("_")[0]
        return {
            "predicted_class": predicted_class,
            "confidence": round(confidence * 100, 2),
            "crop":      {"english": crop_name, "marathi": crop_name, "hindi": crop_name},
            "disease":   {"english": predicted_class, "marathi": predicted_class, "hindi": predicted_class},
            "severity":  {"english": "Unknown", "marathi": "अज्ञात", "hindi": "अज्ञात"},
            "symptoms":  {"english": "", "marathi": "", "hindi": ""},
            "treatment": {"english": f"Consult KVK officer for {crop_name}.",
                          "marathi": f"{crop_name} साठी KVK अधिकाऱ्याशी संपर्क करा.",
                          "hindi":   f"{crop_name} के लिए KVK अधिकारी से संपर्क करें।"},
            "prevention":{"english":"","marathi":"","hindi":""},
            "sowing":    {"english":"","marathi":"","hindi":""},
            "irrigation":{"english":"","marathi":"","hindi":""},
            "fertilizer":{"english":"","marathi":"","hindi":""}
        }

    return {**advice, "predicted_class": predicted_class,
            "confidence": round(confidence * 100, 2)}


# ─────────────────────────────────────────
# TEST — runs when you do: python predictor.py
# ─────────────────────────────────────────
if __name__ == "__main__":
    import sys
    import os

    # Use image path from command line, or default test image
    image_path = sys.argv[1] if len(sys.argv) > 1 else "test_leaf.jpg"

    if not os.path.exists(image_path):
        print(f"\n❌ Image not found: {image_path}")
        print("Usage: python predictor.py your_leaf_photo.jpg")
        print("Or just put a leaf image named 'test_leaf.jpg' in this folder")
        exit()

    print(f"\n📸 Testing with: {image_path}")
    print("─" * 50)

    # Test all 3 languages
    for lang in ["english", "marathi", "hindi"]:
        result = predict(image_path, language=lang)
        print(f"\n🌐 Language: {lang.upper()}")
        print(f"   Crop      : {result['crop'][lang] if isinstance(result['crop'], dict) else result['crop']}")
        print(f"   Disease   : {result['disease'][lang] if isinstance(result['disease'], dict) else result['disease']}")
        print(f"   Confidence: {result['confidence']}%")
        print(f"   Treatment : {result['treatment'][lang] if isinstance(result['treatment'], dict) else result['treatment']}")

    print("\n" + "─" * 50)
    print("✅ predictor.py working correctly!")
    print("✅ Hand this file to Member 3")
