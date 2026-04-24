"use client";

import { useReducer, useCallback, useState } from "react";
import type {
  ChatState,
  ChatAction,
  ChatMessage,
  ConversationPhase,
  WellnessPathId,
  UserAction,
  RecommendedProduct,
} from "@/lib/vital/types";
import { generateResponse } from "@/lib/vital/mock-engine";
import { Sparkle, PanelLeft, Home } from "@/components/ui/icons";
import { Sidebar } from "./Sidebar";
import { GreetingView } from "./GreetingView";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  uploadStatus: null,
  selectedWellnessPath: null,
  selectedProduct: null,
  hasUploadedReport: false,
  conversationPhase: "greeting",
};

function reducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "ADD_MESSAGES":
      return { ...state, messages: [...state.messages, ...action.messages] };
    case "SET_TYPING":
      return { ...state, isTyping: action.isTyping };
    case "SET_PHASE":
      return { ...state, conversationPhase: action.phase };
    case "SET_UPLOAD_STATUS":
      return { ...state, uploadStatus: action.status };
    case "SELECT_WELLNESS_PATH":
      return { ...state, selectedWellnessPath: action.pathId };
    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.product };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, payload: action.payload } : m,
        ),
      };
    case "RESET":
      return { ...initialState };
  }
}

let counter = 0;
function msgId() {
  return `u-${Date.now()}-${++counter}`;
}

export function ChatShell() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sendAction = useCallback(
    async (action: UserAction, phase?: ConversationPhase) => {
      dispatch({ type: "SET_TYPING", isTyping: true });
      try {
        const result = await generateResponse(
          phase ?? state.conversationPhase,
          action,
          state,
        );
        dispatch({ type: "SET_TYPING", isTyping: false });
        dispatch({ type: "ADD_MESSAGES", messages: result.messages });
        dispatch({ type: "SET_PHASE", phase: result.nextPhase });
      } catch {
        dispatch({ type: "SET_TYPING", isTyping: false });
      }
    },
    [state],
  );

  function handleNewChat() {
    dispatch({ type: "RESET" });
  }

  function handleStartUpload() {
    dispatch({ type: "SET_PHASE", phase: "upload" });
    sendAction({ type: "start-upload" }, "greeting");
  }

  function handleStartChat() {
    dispatch({ type: "SET_PHASE", phase: "free-chat" });
    sendAction({ type: "start-chat" }, "greeting");
  }

  function handleBrowseTreatments() {
    dispatch({ type: "SET_PHASE", phase: "wellness-select" });
    sendAction({ type: "browse-treatments" }, "greeting");
  }

  function handleGreetingSend(text: string) {
    dispatch({ type: "SET_PHASE", phase: "free-chat" });
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: { kind: "text", text },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    sendAction({ type: "send-text", text }, "free-chat");
  }

  function handleSend(text: string) {
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: { kind: "text", text },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    sendAction({ type: "send-text", text });
  }

  function handleFileUpload(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const fileType = ext === "pdf" ? "pdf" : "image";
    const fileSize =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(0)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    const uploadMsgId = msgId();
    const uploadMsg: ChatMessage = {
      id: uploadMsgId,
      role: "user",
      type: "file-upload",
      timestamp: new Date(),
      payload: {
        kind: "file-upload",
        fileName: file.name,
        fileSize,
        fileType: fileType as "pdf" | "image",
        status: "uploading",
        progress: 0,
      },
    };
    dispatch({ type: "ADD_MESSAGE", message: uploadMsg });
    dispatch({ type: "SET_UPLOAD_STATUS", status: "uploading" });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      dispatch({
        type: "UPDATE_MESSAGE",
        id: uploadMsgId,
        payload: {
          kind: "file-upload",
          fileName: file.name,
          fileSize,
          fileType: fileType as "pdf" | "image",
          status: progress >= 100 ? "parsing" : "uploading",
          progress: Math.min(progress, 100),
        },
      });
      if (progress >= 100) {
        clearInterval(interval);
        dispatch({ type: "SET_UPLOAD_STATUS", status: "parsing" });

        setTimeout(() => {
          dispatch({
            type: "UPDATE_MESSAGE",
            id: uploadMsgId,
            payload: {
              kind: "file-upload",
              fileName: file.name,
              fileSize,
              fileType: fileType as "pdf" | "image",
              status: "complete",
              progress: 100,
            },
          });
          dispatch({ type: "SET_UPLOAD_STATUS", status: "complete" });

          sendAction(
            { type: "upload-file", fileName: file.name, fileSize, fileType: fileType as "pdf" | "image" },
            "upload",
          );
        }, 2000);
      }
    }, 300);
  }

  function handleSelectWellnessPath(pathId: WellnessPathId) {
    const path =
      pathId.charAt(0).toUpperCase() + pathId.slice(1).replace(/-/g, " ");
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: { kind: "text", text: `I'd like to explore ${path}` },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    dispatch({ type: "SELECT_WELLNESS_PATH", pathId });
    sendAction({ type: "select-wellness-path", pathId }, "wellness-select");
  }

  function handleSelectProduct(rec: RecommendedProduct) {
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: {
        kind: "text",
        text: rec.product.type === "bookable"
          ? `I'd like to book ${rec.product.name}`
          : `I'd like to order ${rec.product.name}`,
      },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    dispatch({ type: "SELECT_PRODUCT", product: rec });
    sendAction({ type: "select-product", product: rec }, "recommendations");
  }

  function handleSelectBookingSlot(slotId: string) {
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: { kind: "text", text: "I'll take this slot" },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    sendAction({ type: "select-booking-slot", slotId }, "booking");
  }

  function handleConfirmPayment() {
    const msg: ChatMessage = {
      id: msgId(),
      role: "user",
      type: "text",
      timestamp: new Date(),
      payload: { kind: "text", text: "Confirm payment" },
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
    sendAction({ type: "confirm-payment" }, "payment");
  }

  const isGreeting = state.conversationPhase === "greeting";

  return (
    <div className="flex h-dvh bg-[#f8f7f4]">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-4 h-12 border-b border-line/30 bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-[6px] text-muted hover:text-ink hover:bg-paper transition-colors lg:hidden"
          >
            <PanelLeft size={18} />
          </button>

          <div className="flex items-center gap-2 lg:ml-3">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center shadow-sm lg:hidden">
              <Sparkle size={10} className="text-cream" />
            </span>
            <span className="ff font-semibold text-[14px] text-ink tracking-[-0.01em] lg:text-[15px]">
              {isGreeting ? "New chat" : "Vital AI"}
            </span>
            <span className="relative flex h-1.5 w-1.5 ml-0.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-moss opacity-60 animate-[rd-vital-pulse_2.5s_ease-in-out_infinite]" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-moss" />
            </span>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 no-underline text-[11px] font-semibold tracking-[0.04em] uppercase text-muted hover:text-ink transition-colors"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </a>
        </header>

        {/* Content */}
        {isGreeting ? (
          <GreetingView
            onStartUpload={handleStartUpload}
            onStartChat={handleStartChat}
            onBrowseTreatments={handleBrowseTreatments}
            onSend={handleGreetingSend}
          />
        ) : (
          <>
            <MessageList
              messages={state.messages}
              isTyping={state.isTyping}
              onSelectWellnessPath={handleSelectWellnessPath}
              onSelectProduct={handleSelectProduct}
              onSelectBookingSlot={handleSelectBookingSlot}
              onConfirmPayment={handleConfirmPayment}
            />
            <ChatInput
              onSend={handleSend}
              onFileUpload={handleFileUpload}
              disabled={state.isTyping}
            />
          </>
        )}
      </div>
    </div>
  );
}
