import type { Product } from "@/lib/data";

export type MessageRole = "user" | "assistant" | "system";

export type MessageType =
  | "text"
  | "file-upload"
  | "analysis"
  | "wellness-paths"
  | "recovery-plan"
  | "product-recommendations"
  | "booking-form"
  | "booking-confirmation"
  | "payment-summary"
  | "payment-confirmation"
  | "typing";

export type ConversationPhase =
  | "greeting"
  | "upload"
  | "parsing"
  | "analysis"
  | "wellness-select"
  | "recommendations"
  | "booking"
  | "payment"
  | "payment-complete"
  | "free-chat";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  type: MessageType;
  timestamp: Date;
  payload: MessagePayload;
}

export type MessagePayload =
  | TextPayload
  | FileUploadPayload
  | AnalysisPayload
  | WellnessPathsPayload
  | RecoveryPlanPayload
  | ProductRecsPayload
  | BookingFormPayload
  | BookingConfirmationPayload
  | PaymentSummaryPayload
  | PaymentConfirmationPayload
  | TypingPayload;

export interface TextPayload {
  kind: "text";
  text: string;
}

export interface FileUploadPayload {
  kind: "file-upload";
  fileName: string;
  fileSize: string;
  fileType: "pdf" | "image";
  status: "uploading" | "parsing" | "complete" | "error";
  progress: number;
}

export type HealthCategory = "cardiovascular" | "metabolic" | "renal" | "nutritional" | "hormonal" | "overall";

export type TakeawayStatus = "good" | "needs-attention" | "borderline" | "critical";

export interface KeyTakeaway {
  category: HealthCategory;
  title: string;
  description: string;
  status: TakeawayStatus;
  icon: "heart" | "droplet" | "shield" | "leaf" | "zap" | "bolt";
}

export interface BiomarkerResult {
  name: string;
  value: number;
  unit: string;
  referenceRange: { low: number; high: number };
  status: "low" | "normal" | "high" | "critical";
  explanation: string;
  category?: HealthCategory;
}

export interface AnalysisPayload {
  kind: "analysis";
  summary: string;
  biomarkers: BiomarkerResult[];
  deficiencies: string[];
  overallScore: number;
  scoreLabel?: "Needs Attention" | "Fair" | "Good" | "Excellent";
  keyTakeaways?: KeyTakeaway[];
  topRecommendation?: string;
}

export type WellnessPathId =
  | "anti-aging"
  | "health-check"
  | "supplements"
  | "mind-mood"
  | "pain-recovery"
  | "regen";

export interface WellnessPath {
  id: WellnessPathId;
  label: string;
  description: string;
  iconKey: "leaf" | "droplet" | "bolt" | "brain" | "heart" | "dna";
  recommended: boolean;
}

export interface WellnessPathsPayload {
  kind: "wellness-paths";
  prompt: string;
  paths: WellnessPath[];
}

export interface RecommendedProduct {
  product: Product;
  reason: string;
}

export interface ProductRecsPayload {
  kind: "product-recommendations";
  intro: string;
  products: RecommendedProduct[];
  wellnessPath: WellnessPathId;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  practitioner: string;
  specialty: string;
  available: boolean;
}

export interface BookingServiceInfo {
  providerType: "nurse" | "doctor";
  description: string;
  includes: string[];
  price: string;
  duration: string;
}

export interface BookingFormPayload {
  kind: "booking-form";
  prompt: string;
  productName: string;
  serviceInfo?: BookingServiceInfo;
  slots: BookingSlot[];
}

export interface BookingConfirmationPayload {
  kind: "booking-confirmation";
  slot: BookingSlot;
  productName: string;
  confirmationCode: string;
  message: string;
}

export interface PaymentSummaryPayload {
  kind: "payment-summary";
  product: Product;
  reason: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
}

export interface PaymentConfirmationPayload {
  kind: "payment-confirmation";
  orderId: string;
  product: Product;
  amountPaid: number;
  currency: string;
  paymentMethod: string;
  slot?: BookingSlot;
  message: string;
}

export interface RecoveryTreatment {
  productId?: string;
  name: string;
  frequency: string;
  bullets: string[];
}

export interface SupplementItem {
  name: string;
  dosage: string;
}

export interface RecoveryPlanPhase {
  phaseNumber: number;
  title: string;
  weekRange: string;
  goal: string;
  treatments: RecoveryTreatment[];
  expectedBenefits: { label: string; timeline: string }[];
  supplementStack: {
    morning: SupplementItem[];
    night: SupplementItem[];
  };
  lifestyleGuidance: string[];
  monitoring: string[];
}

export interface RecoveryPlanPayload {
  kind: "recovery-plan";
  phases: RecoveryPlanPhase[];
  closingMessage: string;
}

export interface TypingPayload {
  kind: "typing";
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  uploadStatus: FileUploadPayload["status"] | null;
  selectedWellnessPath: WellnessPathId | null;
  selectedBookingPurpose: string | null;
  hasUploadedReport: boolean;
  conversationPhase: ConversationPhase;
  selectedProduct: RecommendedProduct | null;
}

export type UserAction =
  | { type: "upload-file"; fileName: string; fileSize: string; fileType: "pdf" | "image" }
  | { type: "select-wellness-path"; pathId: WellnessPathId }
  | { type: "select-product"; product: RecommendedProduct }
  | { type: "explain-product"; product: RecommendedProduct }
  | { type: "select-booking-slot"; slotId: string }
  | { type: "confirm-payment" }
  | { type: "send-text"; text: string }
  | { type: "start-upload" }
  | { type: "start-chat" }
  | { type: "browse-treatments" }
  | { type: "build-recovery-plan" }
  | { type: "book-nurse" }
  | { type: "book-doctor" };

export type ChatAction =
  | { type: "ADD_MESSAGE"; message: ChatMessage }
  | { type: "ADD_MESSAGES"; messages: ChatMessage[] }
  | { type: "SET_TYPING"; isTyping: boolean }
  | { type: "SET_PHASE"; phase: ConversationPhase }
  | { type: "SET_UPLOAD_STATUS"; status: FileUploadPayload["status"] | null }
  | { type: "SELECT_WELLNESS_PATH"; pathId: WellnessPathId }
  | { type: "SELECT_PRODUCT"; product: RecommendedProduct }
  | { type: "SELECT_BOOKING_PURPOSE"; purposeId: string }
  | { type: "UPDATE_MESSAGE"; id: string; payload: MessagePayload }
  | { type: "RESET" };
