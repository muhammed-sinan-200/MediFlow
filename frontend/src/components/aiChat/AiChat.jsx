import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { X, Send, Loader2, Trash2, Bot, Sparkles } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const SESSION_ID = "default";

const suggestionPool = [
  "Fever and cough?",
  "Why take paracetamol?",
  "When to see a doctor?",
  "Sore throat relief?",
  "Why do I get headaches?",
  "Mild stomach pain?",
  "Headache with fever ok?",
  "Body pain what to do?",
  "COVID or flu symptoms?",
  "Dengue signs to watch?",
];

const getRandomSuggestions = (count = 2) => {
  const shuffled = [...suggestionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const TypingDots = () => {
  return (
    <div className="flex justify-start">
      <div className="rounded-[20px] rounded-bl-md border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-2 w-2 rounded-full bg-violet-500/80"
              style={{
                animation: `typingWave 1s ${dot * 0.16}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AIChatbot = () => {
  const { backendUrl, token, userData } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState(getRandomSuggestions(2));
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesContainerRef = useRef(null);
  const suggestionsTimerRef = useRef(null);
  const justOpenedRef = useRef(false);

  const userFirstName = useMemo(() => {
    if (!userData?.name) return "";
    return userData.name.trim().split(" ")[0];
  }, [userData]);

  const getWelcomeMessages = () => [
    {
      role: "assistant",
      message: userFirstName
        ? `Hi ${userFirstName} — I’m here to help.`
        : "Hi — I’m here to help.",
      riskLevel: "low",
      escalationType: "none",
      isWelcome: true,
    },
  ];

  const scrollToBottom = (smooth = true) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    });
  };

  const restoreSuggestionsWithDelay = (delay = 900) => {
    clearTimeout(suggestionsTimerRef.current);
    suggestionsTimerRef.current = setTimeout(() => {
      if (!input.trim()) {
        setSuggestions(getRandomSuggestions(2));
        setShowSuggestions(true);
      }
    }, delay);
  };

  const loadHistory = async () => {
    if (!token) {
      setMessages(getWelcomeMessages());
      setShowSuggestions(true);
      return;
    }

    try {
      setLoadingHistory(true);

      const response = await fetch(`${backendUrl}/api/ai/history`, {
        method: "GET",
        headers: { token },
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.messages) && data.messages.length) {
        setMessages(data.messages);
      } else {
        setMessages(getWelcomeMessages());
      }
    } catch (error) {
      console.error("History load error:", error);
      setMessages(getWelcomeMessages());
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleOpenChat = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!open) {
      justOpenedRef.current = true;
      setSuggestions(getRandomSuggestions(2));
      setShowSuggestions(!input.trim());
      await loadHistory();
    }
  };

  const handleSend = async (manualMessage) => {
    const finalMessage = (manualMessage ?? input).trim();
    if (!finalMessage || sending) return;

    clearTimeout(suggestionsTimerRef.current);
    setShowSuggestions(false);

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "Please log in to use the health assistant.",
          riskLevel: "low",
          escalationType: "none",
        },
      ]);
      return;
    }

    const userMessage = finalMessage;

    setMessages((prev) => [
      ...prev.filter((msg) => !msg.isWelcome),
      {
        role: "user",
        message: userMessage,
        riskLevel: "low",
        escalationType: "none",
      },
    ]);

    setInput("");
    setSending(true);

    try {
      const response = await fetch(`${backendUrl}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: SESSION_ID,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            message: data.reply,
            riskLevel: data.riskLevel,
            escalationType: data.escalationType,
            requiresDoctor: data.requiresDoctor,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            message: data.message || "Something went wrong. Please try again.",
            riskLevel: "low",
            escalationType: "none",
          },
        ]);
      }

      restoreSuggestionsWithDelay(1000);
    } catch (error) {
      console.error("Chat send error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: "Unable to reach the server right now. Please try again.",
          riskLevel: "low",
          escalationType: "none",
        },
      ]);
      restoreSuggestionsWithDelay(1000);
    } finally {
      setSending(false);
    }
  };

  const handleClearChat = async () => {
    clearTimeout(suggestionsTimerRef.current);

    try {
      if (token) {
        await fetch(`${backendUrl}/api/ai/clear`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ sessionId: SESSION_ID }),
        });
      }
    } catch (error) {
      console.error("Clear chat error:", error);
    } finally {
      setMessages(getWelcomeMessages());
      setInput("");
      setSuggestions(getRandomSuggestions(2));
      setShowSuggestions(true);
      setTimeout(() => scrollToBottom(false), 0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (!open) return;

    if (justOpenedRef.current) {
      scrollToBottom(false);
      justOpenedRef.current = false;
      return;
    }

    if (!loadingHistory) {
      scrollToBottom(true);
    }
  }, [messages, open, sending, loadingHistory]);

  useEffect(() => {
    if (input.trim()) {
      clearTimeout(suggestionsTimerRef.current);
      setShowSuggestions(false);
    } else if (!sending) {
      restoreSuggestionsWithDelay(250);
    }
  }, [input, sending]);

  useEffect(() => {
    return () => clearTimeout(suggestionsTimerRef.current);
  }, []);

  const onlyWelcome = messages.length === 1 && messages[0]?.isWelcome;

  return (
    <>
      <style>
        {`
          @keyframes typingWave {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.45;
            }
            30% {
              transform: translateY(-4px);
              opacity: 1;
            }
          }
        `}
      </style>

      <button
        onClick={handleOpenChat}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed right-4 bottom-24 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-violet-600 to-fuchsia-600 text-white ring-4 ring-white/70 shadow-[0_16px_40px_rgba(124,58,237,0.35)] transition-all duration-300 ease-out hover:scale-105 sm:right-5 sm:bottom-24 md:right-5 md:bottom-24 lg:bottom-5"
      >
        <span
          className={`absolute transition-all duration-300 ${
            open
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
        >
          <Bot size={22} />
        </span>

        <span
          className={`absolute transition-all duration-300 ${
            open
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        >
          <X size={22} />
        </span>
      </button>

      {open && (
        <div
          className="
            fixed right-3 bottom-[10.5rem] z-[90]
            flex flex-col overflow-hidden
            rounded-[24px] border border-white/50 bg-white/95 backdrop-blur-xl
            shadow-[0_28px_80px_rgba(88,28,135,0.18)]

            w-[calc(100vw-24px)]
            h-[min(64vh,620px)]

            sm:right-5 sm:bottom-[10.75rem]
            sm:w-[min(420px,calc(100vw-40px))]
            sm:h-[min(66vh,640px)]

            md:right-5 md:bottom-[10.75rem]
            md:w-[390px]
            md:h-[min(68vh,660px)]

            lg:bottom-[5.75rem]
            lg:w-[400px]
            lg:h-[74vh]
          "
        >
          <div className="relative flex items-start justify-between gap-3 bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-600 px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <Bot size={18} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold sm:text-[15px]">
                  MediFlow Assistant
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-violet-100 sm:text-xs">
                  Quick, trusted health guidance
                </p>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="shrink-0 rounded-xl bg-white/10 p-2 transition hover:bg-white/15"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(245,243,255,0.95)_0%,rgba(248,250,252,1)_100%)] px-3 py-3 sm:px-4 sm:py-4"
          >
            {loadingHistory ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                <Loader2 className="mr-2 animate-spin" size={18} />
                Loading chat...
              </div>
            ) : (
              <div className="space-y-3">
                {onlyWelcome && (
                  <div className="rounded-[22px] border border-violet-100 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                    <div className="mb-2 flex items-center gap-2 text-violet-700">
                      <Sparkles size={15} />
                      <p className="text-sm font-semibold">
                        {userFirstName ? `Hi ${userFirstName}` : "Hi there"}
                      </p>
                    </div>
                    <p className="text-xs leading-6 text-slate-600 sm:text-sm">
                      Ask about symptoms, medicines, or what to do next.
                    </p>
                  </div>
                )}

                {messages
                  .filter((msg) => !msg.isWelcome)
                  .map((msg, i) => (
                    <div key={i}>
                      <div
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[88%] break-words rounded-2xl px-3 py-2.5 text-[13px] leading-relaxed sm:max-w-[82%] sm:px-4 sm:py-3 sm:text-sm ${
                            msg.role === "user"
                              ? "rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_10px_24px_rgba(124,58,237,0.22)]"
                              : "rounded-bl-md border border-slate-200/80 bg-white/95 text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>

                      {msg.role === "assistant" &&
                        msg.riskLevel === "medium" &&
                        msg.requiresDoctor && (
                          <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow-sm">
                            <p className="font-medium">
                              It may be a good idea to speak with a doctor.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button className="rounded-full bg-amber-500 px-3.5 py-2 text-xs font-medium text-white shadow-sm">
                                Book Appointment
                              </button>
                              <button className="rounded-full border border-amber-300 px-3.5 py-2 text-xs font-medium text-amber-900">
                                Consult Doctor
                              </button>
                            </div>
                          </div>
                        )}

                      {msg.role === "assistant" &&
                        msg.riskLevel === "high" &&
                        msg.escalationType === "urgent_care" && (
                          <div className="mt-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-900 shadow-sm">
                            <p className="font-medium">
                              This may need urgent medical attention.
                            </p>
                            <div className="mt-3 flex gap-2">
                              <button className="rounded-full bg-red-600 px-3.5 py-2 text-xs font-medium text-white">
                                Get Help Now
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  ))}

                {sending && <TypingDots />}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/80 bg-white/95 p-3 backdrop-blur-md">
            {showSuggestions && !sending && !input.trim() && (
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestions.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInput(prompt);
                      setShowSuggestions(false);
                    }}
                    className="max-w-full rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[11px] text-violet-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 sm:text-xs"
                  >
                    <span className="block truncate">{prompt}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-[0_6px_24px_rgba(15,23,42,0.05)]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your health..."
                className="flex-1 bg-transparent px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={sending || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md transition hover:scale-105 hover:from-violet-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;