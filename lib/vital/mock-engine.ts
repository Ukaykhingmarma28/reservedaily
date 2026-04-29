import type { Product } from "@/lib/data";
import type {
  ChatMessage,
  ConversationPhase,
  UserAction,
  WellnessPathId,
  ChatState,
} from "./types";
import {
  UPLOAD_INSTRUCTIONS,
  FREE_CHAT_WELCOME,
  BROWSE_TREATMENTS_WELCOME,
  ANALYSIS_SUMMARY,
  MOCK_BIOMARKERS,
  MOCK_SCORE_LABEL,
  MOCK_KEY_TAKEAWAYS,
  MOCK_TOP_RECOMMENDATION,
  MOCK_WELLNESS_PATHS,
  PRODUCTS_BY_PATH,
  MOCK_BOOKING_SLOTS,
  MOCK_NURSE_SLOTS,
  MOCK_DOCTOR_SLOTS,
  MOCK_RECOVERY_PHASES,
  MOCK_RECOVERY_CLOSING,
  QA_RESPONSES,
} from "./mock-data";

let counter = 0;
function msgId() {
  return `msg-${Date.now()}-${++counter}`;
}

function assistantText(text: string): ChatMessage {
  return {
    id: msgId(),
    role: "assistant",
    type: "text",
    timestamp: new Date(),
    payload: { kind: "text", text },
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function generateExplanation(product: Product, reason: string): string {
  const isBookable = product.type === "bookable";
  const price = product.variations?.[0]?.price ?? product.price ?? "";
  const meta = isBookable ? product.duration : product.size;

  let explanation = `Here's why ${product.name} is a strong match for your profile:\n\n`;
  explanation += `${reason}\n\n`;

  if (isBookable) {
    explanation += `This is a clinical treatment (${meta}) at ${product.provider}, ${product.location}. `;
    explanation += `Clinical treatments deliver nutrients directly into your bloodstream, bypassing digestive absorption for near-100% bioavailability — significantly faster results than oral supplements.\n\n`;
  } else {
    explanation += `This is a daily supplement (${meta}) that you take at home for ongoing maintenance. `;
    explanation += `While clinical treatments provide immediate correction, supplements maintain your levels long-term between sessions.\n\n`;
  }

  explanation += `Pricing starts at ${price}. `;
  if (product.rating >= 4.5) {
    explanation += `It's rated ${product.rating}/5 across ${product.reviews} verified reviews. `;
  }
  explanation += `Would you like to proceed with this, or would you prefer to see other options?`;

  return explanation;
}

function matchQA(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(QA_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return response;
  }
  return QA_RESPONSES.default;
}

export async function generateResponse(
  phase: ConversationPhase,
  action: UserAction,
  _state: ChatState,
): Promise<{ messages: ChatMessage[]; nextPhase: ConversationPhase }> {
  switch (phase) {
    case "greeting": {
      if (action.type === "start-upload") {
        await delay(800);
        return {
          messages: [assistantText(UPLOAD_INSTRUCTIONS)],
          nextPhase: "upload",
        };
      }
      if (action.type === "start-chat") {
        await delay(800);
        return {
          messages: [assistantText(FREE_CHAT_WELCOME)],
          nextPhase: "free-chat",
        };
      }
      if (action.type === "browse-treatments") {
        await delay(800);
        const pathsMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "wellness-paths",
          timestamp: new Date(),
          payload: {
            kind: "wellness-paths",
            prompt: BROWSE_TREATMENTS_WELCOME,
            paths: MOCK_WELLNESS_PATHS.map((p) => ({ ...p, recommended: false })),
          },
        };
        return {
          messages: [assistantText("Let me help you find the right treatment."), pathsMsg],
          nextPhase: "wellness-select",
        };
      }
      if (action.type === "book-nurse") {
        await delay(800);
        const bookingMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "booking-form",
          timestamp: new Date(),
          payload: {
            kind: "booking-form",
            prompt: "Select a convenient time and your nurse will come to your location.",
            productName: "On-Demand Nurse Visit",
            serviceInfo: {
              providerType: "nurse",
              description: "A certified nurse visits your home, hotel, or office to provide professional healthcare services.",
              includes: ["IV drip therapy & vitamin injections", "Blood draw & sample collection", "Wound care & basic treatments", "Health monitoring & vitals check"],
              price: "From RM 250",
              duration: "45–60 min",
            },
            slots: MOCK_NURSE_SLOTS,
          },
        };
        return {
          messages: [bookingMsg],
          nextPhase: "booking",
        };
      }
      if (action.type === "book-doctor") {
        await delay(800);
        const bookingMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "booking-form",
          timestamp: new Date(),
          payload: {
            kind: "booking-form",
            prompt: "Select a convenient time and your doctor will come to your location.",
            productName: "On-Demand Doctor Visit",
            serviceInfo: {
              providerType: "doctor",
              description: "A licensed doctor visits your home, hotel, or office for consultations, prescriptions, and treatments.",
              includes: ["General health consultation", "Prescription & medication management", "Blood panel review & health screening", "Specialist referrals if needed"],
              price: "From RM 350",
              duration: "30–45 min",
            },
            slots: MOCK_DOCTOR_SLOTS,
          },
        };
        return {
          messages: [bookingMsg],
          nextPhase: "booking",
        };
      }
      break;
    }

    case "upload": {
      if (action.type === "upload-file") {
        await delay(3500);
        const analysisMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "analysis",
          timestamp: new Date(),
          payload: {
            kind: "analysis",
            summary: ANALYSIS_SUMMARY,
            biomarkers: MOCK_BIOMARKERS,
            deficiencies: ["High LDL Cholesterol", "Elevated Total Cholesterol", "High Non-HDL Cholesterol", "Borderline Uric Acid"],
            overallScore: 72,
            scoreLabel: MOCK_SCORE_LABEL,
            keyTakeaways: MOCK_KEY_TAKEAWAYS,
            topRecommendation: MOCK_TOP_RECOMMENDATION,
          },
        };
        const pathsMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "wellness-paths",
          timestamp: new Date(),
          payload: {
            kind: "wellness-paths",
            prompt:
              "Based on your lipid panel, I'd recommend focusing on Health Check & Body Insights, Supplements, or Regen & Functional Care to address your elevated LDL and cardiovascular markers. Which wellness path interests you?",
            paths: MOCK_WELLNESS_PATHS,
          },
        };
        return {
          messages: [analysisMsg, pathsMsg],
          nextPhase: "wellness-select",
        };
      }
      if (action.type === "send-text") {
        await delay(1000);
        return {
          messages: [
            assistantText(
              "I'd love to help with that. But first, would you like to upload your blood report? It'll help me give you much more personalised recommendations.",
            ),
          ],
          nextPhase: "upload",
        };
      }
      break;
    }

    case "wellness-select": {
      if (action.type === "build-recovery-plan") {
        await delay(2000);
        const planMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "recovery-plan",
          timestamp: new Date(),
          payload: {
            kind: "recovery-plan",
            phases: MOCK_RECOVERY_PHASES,
            closingMessage: MOCK_RECOVERY_CLOSING,
          },
        };
        return {
          messages: [
            assistantText("I've built your personalized recovery plan based on your biomarker analysis. Here's your complete protocol:"),
            planMsg,
          ],
          nextPhase: "recommendations",
        };
      }
      if (action.type === "select-wellness-path") {
        const pathId = action.pathId;
        const path = MOCK_WELLNESS_PATHS.find((p) => p.id === pathId);
        const products = PRODUCTS_BY_PATH[pathId] ?? PRODUCTS_BY_PATH.supplements;
        await delay(1500);
        const recsMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "product-recommendations",
          timestamp: new Date(),
          payload: {
            kind: "product-recommendations",
            intro: `Here are personalised ${path?.label ?? "wellness"} treatments and products matched to your profile — including both clinical treatments and supplements:`,
            products,
            wellnessPath: pathId,
          },
        };
        return {
          messages: [recsMsg],
          nextPhase: "recommendations",
        };
      }
      if (action.type === "send-text") {
        await delay(1000);
        return {
          messages: [
            assistantText(
              "Please select a wellness path above so I can show you the most relevant treatments for your profile.",
            ),
          ],
          nextPhase: "wellness-select",
        };
      }
      break;
    }

    case "recommendations": {
      if (action.type === "explain-product") {
        const { product, reason } = action.product;
        await delay(1500);
        const explanation = generateExplanation(product, reason);
        return {
          messages: [assistantText(explanation)],
          nextPhase: "recommendations",
        };
      }
      if (action.type === "select-product") {
        const { product } = action.product;
        const price = parseFloat(product.price?.replace(/[^0-9.]/g, "") ?? "0");
        const serviceFee = Math.round(price * 0.05);
        await delay(1200);

        if (product.type === "bookable") {
          const bookingMsg: ChatMessage = {
            id: msgId(),
            role: "assistant",
            type: "booking-form",
            timestamp: new Date(),
            payload: {
              kind: "booking-form",
              prompt: `Let's book your ${product.name}. Select an available appointment slot:`,
              productName: product.name,
              slots: MOCK_BOOKING_SLOTS,
            },
          };
          return {
            messages: [bookingMsg],
            nextPhase: "booking",
          };
        }

        const paymentMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "payment-summary",
          timestamp: new Date(),
          payload: {
            kind: "payment-summary",
            product,
            reason: action.product.reason,
            subtotal: price,
            serviceFee,
            total: price + serviceFee,
            currency: "MYR",
          },
        };
        return {
          messages: [paymentMsg],
          nextPhase: "payment",
        };
      }
      if (action.type === "send-text") {
        await delay(1000);
        return {
          messages: [
            assistantText(
              "Select a treatment or product above to proceed, or ask me anything about the recommendations.",
            ),
          ],
          nextPhase: "recommendations",
        };
      }
      break;
    }

    case "booking": {
      if (action.type === "select-booking-slot") {
        const allSlots = [...MOCK_BOOKING_SLOTS, ...MOCK_NURSE_SLOTS, ...MOCK_DOCTOR_SLOTS];
        const slot = allSlots.find((s) => s.id === action.slotId);
        if (!slot || !slot.available) {
          return {
            messages: [
              assistantText("That slot is no longer available. Please select another time."),
            ],
            nextPhase: "booking",
          };
        }

        const isNurse = slot.id.startsWith("ns");
        const isDoctor = slot.id.startsWith("ds");

        const product: Product = _state.selectedProduct?.product ?? {
          id: isNurse ? "on-demand-nurse" : isDoctor ? "on-demand-doctor" : "treatment",
          type: "bookable" as const,
          tag: isNurse ? "Nurse Visit" : isDoctor ? "Doctor Visit" : "Treatment",
          name: isNurse ? "On-Demand Nurse Visit" : isDoctor ? "On-Demand Doctor Visit" : "Treatment",
          provider: slot.practitioner,
          location: "Your Location",
          rating: 4.8,
          reviews: 0,
          duration: isNurse ? "60 min" : "45 min",
          art: "cell" as const,
          color: "#4a7c6f",
          category: "Health Services",
          price: isNurse ? "RM 250" : "RM 450",
        };
        const reason = _state.selectedProduct?.reason ?? (isNurse
          ? "Professional nurse visit for wellness treatments at your convenience."
          : isDoctor
            ? "Doctor consultation and treatment at your preferred location."
            : "");

        const price = parseFloat(product.price?.replace(/[^0-9.]/g, "") ?? "0");
        const serviceFee = Math.round(price * 0.05);

        await delay(800);
        const paymentMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "payment-summary",
          timestamp: new Date(),
          payload: {
            kind: "payment-summary",
            product,
            reason,
            subtotal: price,
            serviceFee,
            total: price + serviceFee,
            currency: "MYR",
          },
        };
        return {
          messages: [
            assistantText(`Appointment selected: ${slot.date} at ${slot.time} with ${slot.practitioner}. Here's your order summary:`),
            paymentMsg,
          ],
          nextPhase: "payment",
        };
      }
      break;
    }

    case "payment": {
      if (action.type === "confirm-payment") {
        await delay(2000);

        const lastPaymentSummary = [..._state.messages].reverse().find(
          (m) => m.payload.kind === "payment-summary",
        );
        const summaryPayload = lastPaymentSummary?.payload.kind === "payment-summary" ? lastPaymentSummary.payload : null;

        const product = summaryPayload?.product ?? _state.selectedProduct?.product;
        const total = summaryPayload?.total ?? 0;
        const orderId = `RD-${Date.now().toString(36).toUpperCase().slice(-6)}`;

        const confirmMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "payment-confirmation",
          timestamp: new Date(),
          payload: {
            kind: "payment-confirmation",
            orderId,
            product: product!,
            amountPaid: total,
            currency: "MYR",
            paymentMethod: "Visa ending ····4242",
            message:
              product?.type === "bookable"
                ? "Your appointment is confirmed. You'll receive a confirmation email shortly with all the details. Is there anything else I can help with?"
                : "Your order is confirmed and will be shipped within 1-2 business days. Estimated delivery: 3-5 business days. Is there anything else I can help with?",
          },
        };
        return {
          messages: [confirmMsg],
          nextPhase: "free-chat",
        };
      }
      break;
    }

    case "analysis": {
      if (action.type === "send-text") {
        await delay(1000);
        return {
          messages: [assistantText(matchQA(action.text))],
          nextPhase: "analysis",
        };
      }
      break;
    }

    case "free-chat": {
      if (action.type === "send-text") {
        await delay(1200);
        return {
          messages: [assistantText(matchQA(action.text))],
          nextPhase: "free-chat",
        };
      }
      if (action.type === "start-upload") {
        await delay(800);
        return {
          messages: [assistantText(UPLOAD_INSTRUCTIONS)],
          nextPhase: "upload",
        };
      }
      break;
    }
  }

  await delay(800);
  return {
    messages: [assistantText("I'm here to help. Try uploading a blood report or ask me a question about our wellness treatments.")],
    nextPhase: phase,
  };
}
