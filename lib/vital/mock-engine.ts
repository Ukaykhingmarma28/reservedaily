import type { Product } from "@/lib/data";
import type {
  ChatMessage,
  ConversationPhase,
  UserAction,
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
  MOCK_RECOVERY_PHASES,
  MOCK_RECOVERY_CLOSING,
  MOCK_RECOVERY_OVERVIEW,
  getRecoveryPlanProducts,
  QA_RESPONSES,
} from "./mock-data";
import { SERVICE_CONFIG } from "./booking-data";

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

  if (product.rating >= 4.5) {
    explanation += `It's rated ${product.rating}/5 across ${product.reviews} verified reviews. `;
  }
  explanation += `You can view full details on the product page, or ask me anything else about this recommendation.`;

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
  // On-Demand booking can be launched from any phase (quick actions / free chat).
  if (action.type === "start-booking") {
    const cfg = SERVICE_CONFIG[action.service];
    await delay(700);
    const bookingMsg: ChatMessage = {
      id: msgId(),
      role: "assistant",
      type: "booking",
      timestamp: new Date(),
      payload: { kind: "booking", service: action.service },
    };
    return {
      messages: [assistantText(cfg.intro), bookingMsg],
      nextPhase: "booking",
    };
  }

  if (phase === "booking") {
    await delay(900);
    return {
      messages: [
        assistantText(
          "I'll keep your booking right here — carry on with the steps in the card above. You can ask me anything mid-flow and I'll answer without losing your progress.",
        ),
      ],
      nextPhase: "booking",
    };
  }

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
        const planProducts = getRecoveryPlanProducts(MOCK_RECOVERY_PHASES);
        const planMsg: ChatMessage = {
          id: msgId(),
          role: "assistant",
          type: "recovery-plan",
          timestamp: new Date(),
          payload: {
            kind: "recovery-plan",
            overview: MOCK_RECOVERY_OVERVIEW,
            phases: MOCK_RECOVERY_PHASES,
            closingMessage: MOCK_RECOVERY_CLOSING,
            products: planProducts,
            productsIntro:
              "Treatments and products matched to this protocol — tap Ask VitalNow AI on any card to learn why it fits your profile.",
          },
        };
        return {
          messages: [
            assistantText(
              "I've built your personalised recovery plan from your biomarker analysis. Review your phased planning below, then the matched treatments and products.",
            ),
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
      if (action.type === "send-text") {
        await delay(1000);
        return {
          messages: [
            assistantText(
              "Tap \"Ask VitalNow AI\" on any recommendation to learn more, or ask me anything about the treatments shown.",
            ),
          ],
          nextPhase: "recommendations",
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
