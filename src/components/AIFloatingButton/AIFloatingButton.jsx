
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./AIFloatingButton.css";

const quickQuestions = [
  { label: "Sports injury", message: "Tell me about sports injury" },
  { label: "Pain management", message: "I need help with pain management" },
  { label: "Book appointment", message: "How can I book an appointment?" },
];

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Welcome to Rehabics. I can help you explore our physiotherapy services and find your next step toward better movement.",
  time: "Just now",
};

const getAnswer = (message) => {
  const text = message.toLowerCase();

  if (/sport|athlete|gym|muscle injury/.test(text)) {
    return {
      text: "Our sports rehabilitation approach focuses on mobility, progressive strengthening, and a gradual return to activity. Explore our services to learn more.",
      link: "/services",
      linkLabel: "Explore services",
    };
  }

  if (/pain|ache|back|neck|knee/.test(text)) {
    return {
      text: "Pain can have different causes, and the right care depends on your symptoms and history. Our team can help you explore suitable physiotherapy options. Seek urgent medical care for severe or sudden symptoms.",
      link: "/conditions",
      linkLabel: "Explore conditions",
    };
  }

  if (/book|appointment|consult|schedule/.test(text)) {
    return {
      text: "You can visit our appointment page to explore the next steps. Have your preferred day and consultation type ready.",
      link: "/appointment",
      linkLabel: "Go to appointments",
    };
  }

  if (/rehab|injury|recover|recovery/.test(text)) {
    return {
      text: "Recovery plans can include guided movement, strengthening, and gradual progression based on individual goals. Explore our services to understand the available options.",
      link: "/services",
      linkLabel: "Explore rehabilitation",
    };
  }

  if (/strength|mobility|movement|flexibility/.test(text)) {
    return {
      text: "Strength and mobility work can support everyday movement and physical confidence. The right exercises depend on your needs and abilities.",
      link: "/services",
      linkLabel: "View our services",
    };
  }

  return {
    text: "Thanks for reaching out. I am the Rehabics demo assistant. I can help you explore services, conditions, and appointments, but I cannot diagnose symptoms or replace professional medical advice.",
    link: "/appointment",
    linkLabel: "Explore appointments",
  };
};

export default function AIFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const reducedMotion = useReducedMotion();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const messageIdRef = useRef(0);

  const clearPendingResponse = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    setShowWelcome(false);

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    list.scrollTo({
      top: list.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, isOpen, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const sendMessage = useCallback(
    (value = input) => {
      const text = value.trim();

      if (!text || isTyping) return;

      const userMessage = {
        id: `user-${++messageIdRef.current}`,
        role: "user",
        text,
        time: "Just now",
      };

      setMessages((current) => [...current, userMessage]);
      setInput("");
      setIsTyping(true);

      timerRef.current = window.setTimeout(() => {
        const answer = getAnswer(text);

        setMessages((current) => [
          ...current,
          {
            id: `assistant-${++messageIdRef.current}`,
            role: "assistant",
            text: answer.text,
            link: answer.link,
            linkLabel: answer.linkLabel,
            time: "Just now",
          },
        ]);

        setIsTyping(false);
        timerRef.current = null;
      }, reducedMotion ? 200 : 650);
    },
    [input, isTyping, reducedMotion]
  );

  const resetChat = () => {
    clearPendingResponse();
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `welcome-${++messageIdRef.current}`,
      },
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="rehabics-ai">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="rehabics-ai__panel"
            role="dialog"
            aria-label="Rehabics assistant"
            aria-modal="false"
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <header className="rehabics-ai__header">
              <div className="rehabics-ai__identity">
                <div className="rehabics-ai__avatar">
                  <Sparkles size={20} />
                  <span className="rehabics-ai__avatar-dot" />
                </div>

                <div className="rehabics-ai__heading">
                  <div className="rehabics-ai__title-line">
                    <h2>Rehabics AI</h2>
                    <span className="rehabics-ai__beta">DEMO</span>
                  </div>
                  <p>
                    <span className="rehabics-ai__online-dot" />
                    Here to help you move better
                  </p>
                </div>
              </div>

              <div className="rehabics-ai__header-actions">
                <button
                  type="button"
                  className="rehabics-ai__icon-button"
                  onClick={resetChat}
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <Plus size={18} />
                </button>

                <button
                  type="button"
                  className="rehabics-ai__icon-button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chat"
                  title="Minimize chat"
                >
                  <ChevronDown size={19} />
                </button>

                <button
                  type="button"
                  className="rehabics-ai__icon-button rehabics-ai__close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="rehabics-ai__trust-strip">
              <ShieldCheck size={15} />
              <span>Support for your movement journey</span>
            </div>

            <div
              className="rehabics-ai__messages"
              ref={listRef}
              aria-live="polite"
              aria-relevant="additions text"
            >
              <div className="rehabics-ai__day-label">
                <span />
                TODAY
                <span />
              </div>

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`rehabics-ai__message-row rehabics-ai__message-row--${message.role}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {message.role === "assistant" && (
                    <div className="rehabics-ai__mini-avatar">
                      <Sparkles size={13} />
                    </div>
                  )}

                  <div className="rehabics-ai__message-content">
                    <div className="rehabics-ai__bubble">{message.text}</div>

                    {message.link && (
                      <Link
                        className="rehabics-ai__action-link"
                        to={message.link}
                        onClick={() => setIsOpen(false)}
                      >
                        {message.linkLabel}
                        <ArrowUpRight size={15} />
                      </Link>
                    )}

                    <span className="rehabics-ai__time">
                      {message.role === "user" && <Check size={12} />}
                      {message.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div
                  className="rehabics-ai__message-row rehabics-ai__message-row--assistant"
                  role="status"
                  aria-label="Assistant is responding"
                >
                  <div className="rehabics-ai__mini-avatar">
                    <Sparkles size={13} />
                  </div>
                  <div className="rehabics-ai__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="rehabics-ai__quick-section">
                  <p className="rehabics-ai__quick-title">
                    WHAT CAN I HELP WITH?
                  </p>

                  <div className="rehabics-ai__quick-list">
                    {quickQuestions.map((question) => (
                      <button
                        type="button"
                        className="rehabics-ai__quick-button"
                        key={question.label}
                        onClick={() => sendMessage(question.message)}
                        disabled={isTyping}
                      >
                        <span>{question.label}</span>
                        <ArrowUpRight size={15} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="rehabics-ai__composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <label
                className="rehabics-ai__sr-only"
                htmlFor="rehabics-ai-input"
              >
                Write your message
              </label>

              <input
                id="rehabics-ai-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask us anything..."
                maxLength={500}
                autoComplete="off"
                disabled={isTyping}
              />

              <button
                type="submit"
                className="rehabics-ai__send"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>

            <footer className="rehabics-ai__footer">
              <span>
                Powered by <strong>Rehabics</strong>
              </span>
              <span className="rehabics-ai__footer-dot">•</span>
              <span>Demo assistant</span>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && showWelcome && (
          <motion.div
            className="rehabics-ai__tooltip"
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span>Need help finding the right care?</span>
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              aria-label="Dismiss welcome message"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`rehabics-ai__launcher ${
          isOpen ? "rehabics-ai__launcher--open" : ""
        }`}
        onClick={() => setIsOpen((open) => !open)}
        whileHover={reducedMotion ? undefined : { scale: 1.04 }}
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
        aria-label={isOpen ? "Close Rehabics AI chat" : "Open Rehabics AI chat"}
        aria-expanded={isOpen}
      >
        <span className="rehabics-ai__launcher-glow" />

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              className="rehabics-ai__launcher-icon"
              initial={reducedMotion ? false : { rotate: -35, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 35, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown size={25} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              className="rehabics-ai__launcher-icon"
              initial={reducedMotion ? false : { rotate: 25, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -25, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={25} />
            </motion.span>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="rehabics-ai__launcher-spark">
            <Sparkles size={13} />
          </span>
        )}
      </motion.button>
    </div>
  );
}
