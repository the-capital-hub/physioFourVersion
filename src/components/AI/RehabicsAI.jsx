
import { useState } from "react";
import { Bot, Send, LoaderCircle } from "lucide-react";
import "./RehabicsAI.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RehabicsAI({ role = "patient" }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = {
    admin: "Summarize the key metrics I should monitor in a physiotherapy platform.",
    physiotherapist: "Explain general principles of safe rehabilitation exercise education.",
    patient: "What should I expect during a physiotherapy appointment?",
  };

  async function sendMessage(event) {
    event?.preventDefault();

    const text = message.trim();
    if (!text || loading) return;

    setMessages((old) => [...old, { role: "user", text }]);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token =
        localStorage.getItem("rehabics_token") ||
        sessionStorage.getItem("rehabics_token");

      if (!token) {
        throw new Error("Please log in again to use Rehabics AI.");
      }

      const response = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI request failed.");
      }

      setMessages((old) => [
        ...old,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err) {
      setError(err.message || "Unable to contact Rehabics AI.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rehabics-ai">
      <header className="rehabics-ai__header">
        <span className="rehabics-ai__icon">
          <Bot size={23} />
        </span>
        <div>
          <h2>Rehabics AI</h2>
          <p>Your {role} assistant</p>
        </div>
        <span className="rehabics-ai__status">AI Assistant</span>
      </header>

      <div className="rehabics-ai__messages" aria-live="polite">
        {messages.length === 0 && (
          <div className="rehabics-ai__welcome">
            <Bot size={34} />
            <h3>How can I help you today?</h3>
            <p>Ask a question to get started.</p>
            <button
              type="button"
              onClick={() => setMessage(suggestions[role] || suggestions.patient)}
            >
              Try a suggested question
            </button>
          </div>
        )}

        {messages.map((item, index) => (
          <div
            key={`${index}-${item.role}`}
            className={`rehabics-ai__message rehabics-ai__message--${item.role}`}
          >
            <strong>{item.role === "user" ? "You" : "Rehabics AI"}</strong>
            <p>{item.text}</p>
          </div>
        ))}

        {loading && (
          <p className="rehabics-ai__loading">
            <LoaderCircle className="rehabics-ai__spinner" size={17} />
            Thinking...
          </p>
        )}
      </div>

      {error && <p className="rehabics-ai__error">{error}</p>}

      <form className="rehabics-ai__form" onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask Rehabics AI..."
          maxLength={2000}
          aria-label="Message Rehabics AI"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>

      <p className="rehabics-ai__disclaimer">
        AI can make mistakes. Do not share passwords or unnecessary
        personal health information.
      </p>
    </section>
  );
}
