
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import "./AIFloatingButton.css";

const suggestions = [
  "How can physiotherapy help me?",
  "I have back pain",
  "Book an appointment",
];

export default function AIFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi there! I am your Rehabics virtual assistant. How can I help you today?",
    },
  ]);

  const sendMessage = (value = message) => {
    const text = value.trim();

    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text },
      {
        role: "assistant",
        text:
          "Thanks for reaching out! I can help you explore physiotherapy services and appointment options. For personalised medical advice, please consult a qualified physiotherapist.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="rv3AIWidget">
      {/* <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="rv3AIHint"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25 }}
          >
            <span className="rv3AIHintDot" />
            Need help? Ask Rehabics AI
          </motion.div>
        )}
      </AnimatePresence> */}

      <motion.button
        type="button"
        className={`rv3AITrigger ${isOpen ? "isOpen" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <Sparkles size={21} />
            <span>Ask AI</span>
          </>
        )}
        {!isOpen && <span className="rv3AIOnlineDot" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="rv3AIChat"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            aria-label="Rehabics AI assistant"
            aria-live="polite"
          >
            <div className="rv3AIChatHeader">
              <div className="rv3AIAvatar">
                <Bot size={23} />
                <span />
              </div>

              <div className="rv3AIHeaderCopy">
                <h3>Rehabics AI</h3>
                <p>
                  <span /> Your virtual care assistant
                </p>
              </div>

              <button
                type="button"
                className="rv3AIHeaderClose"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={19} />
              </button>
            </div>

            <div className="rv3AIWelcome">
              <span className="rv3AIWelcomeIcon">
                <Sparkles size={18} />
              </span>
              <p>Personalised guidance starts with a conversation.</p>
            </div>

            <div className="rv3AIMessages">
              {messages.map((item, index) => (
                <div
                  key={`${index}-${item.role}`}
                  className={`rv3AIMessage ${item.role}`}
                >
                  {item.role === "assistant" && (
                    <span className="rv3AIMiniAvatar">
                      <Bot size={15} />
                    </span>
                  )}

                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {messages.length === 1 && (
              <div className="rv3AISuggestions">
                <span className="rv3AISuggestionLabel">
                  QUICK QUESTIONS
                </span>

                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            )}

            <form
              className="rv3AIInputArea"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask us anything..."
                aria-label="Type your message"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>

            <p className="rv3AIDisclaimer">
              AI responses are informational and are not a substitute
              for professional medical advice.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
