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
  MOCK_WELLNESS_PATHS,
  PRODUCTS_BY_PATH,
  MOCK_BOOKING_SLOTS,
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
            deficiencies: ["Vitamin D", "Iron (Ferritin)", "Vitamin B12"],
            overallScore: 68,
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
              "Based on your results, I'd recommend focusing on Energy & Vitality or Immune Boost. Which wellness path interests you?",
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
        const slot = MOCK_BOOKING_SLOTS.find((s) => s.id === action.slotId);
        if (!slot || !slot.available) {
          return {
            messages: [
              assistantText("That slot is no longer available. Please select another time."),
            ],
            nextPhase: "booking",
          };
        }

        const product = _state.selectedProduct?.product;
        const price = parseFloat(product?.price?.replace(/[^0-9.]/g, "") ?? "0");
        const serviceFee = Math.round(price * 0.05);

        await delay(800);
        const paymentMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "payment-summary",
          timestamp: new Date(),
          payload: {
            kind: "payment-summary",
            product: product!,
            reason: _state.selectedProduct?.reason ?? "",
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
        const product = _state.selectedProduct?.product;
        const price = parseFloat(product?.price?.replace(/[^0-9.]/g, "") ?? "0");
        const serviceFee = Math.round(price * 0.05);
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
            amountPaid: price + serviceFee,
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
