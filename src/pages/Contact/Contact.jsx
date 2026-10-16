
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Contact.css";

const contactDetails = [
  {
    icon: MessageCircle,
    label: "Start a conversation",
    value: "Tell us what brings you here",
    note: "Share your concerns and goals",
  },
  {
    icon: Clock3,
    label: "A thoughtful first step",
    value: "Personalised guidance",
    note: "We will help you understand the next step",
  },
  {
    icon: ShieldCheck,
    label: "Your comfort matters",
    value: "Care built around you",
    note: "Your goals remain central to the process",
  },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    concern: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.65 },
    },
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status) setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus(
      "Your form has been validated. Connect your backend or email service to deliver enquiries to the Rehabics team."
    );
  };

  return (
    <main className="rh-contact">
      <section className="rh-contact-hero">
        <div className="rh-contact-hero-image" />

        <div className="rh-contact-hero-shade" />

        <div className="rh-contact-hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="rh-contact-eyebrow"
          >
            <span className="rh-contact-eyebrow-line" />
            YOUR NEXT CHAPTER STARTS HERE
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.1 }}
          >
            Let’s move
            <br />
            <span>you forward.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.2 }}
          >
            Every recovery journey starts with a conversation.
            Tell us where you are today, and let’s explore
            what moving better could look like for you.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ delay: 0.3 }}
            className="rh-contact-hero-actions"
          >
            <a href="#contact-form" className="rh-contact-primary-btn">
              Start a conversation
              <ArrowUpRight size={18} />
            </a>

            <Link to="/services" className="rh-contact-text-link">
              Explore our services
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="rh-contact-hero-index">
            <span>01</span>
            <span className="rh-contact-index-line" />
            <span>LET’S BEGIN</span>
          </div>
        </div>

        <div className="rh-contact-hero-caption">
          <span>REHABICS</span>
          <span>CARE IN MOTION</span>
        </div>
      </section>

      <section className="rh-contact-main section-anchor" id="contact-form">
        <div className="rh-contact-main-grid">
          <motion.div
            className="rh-contact-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
          >
            <div className="rh-contact-section-label">
              <Sparkles size={15} />
              LET’S CONNECT
            </div>

            <h2>
              Good care
              <br />
              begins with
              <br />
              <span>being heard.</span>
            </h2>

            <p className="rh-contact-intro-copy">
              Whether you are navigating discomfort, returning
              to movement or looking for a clearer path forward,
              we are here to help you take the next step.
            </p>

            <div className="rh-contact-detail-list">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    className="rh-contact-detail"
                    key={item.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={reveal}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="rh-contact-detail-icon">
                      <Icon size={19} strokeWidth={1.6} />
                    </div>

                    <div>
                      <span className="rh-contact-detail-label">
                        {item.label}
                      </span>

                      <h3>{item.value}</h3>

                      <p>{item.note}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="rh-contact-note">
              <span className="rh-contact-note-mark">“</span>
              <p>
                Your journey is personal. Your care should be too.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="rh-contact-form-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
          >
            <div className="rh-contact-form-heading">
              <div>
                <span className="rh-contact-form-kicker">
                  THE FIRST STEP
                </span>
                <h2>Tell us a little about you.</h2>
              </div>

              <span className="rh-contact-form-number">01 / 03</span>
            </div>

            <p className="rh-contact-form-description">
              Fill in the details below and share what you would
              like help with.
            </p>

            <form onSubmit={handleSubmit} className="rh-contact-form">
              <div className="rh-contact-fields-two">
                <label className="rh-contact-field">
                  <span>Full name <b>*</b></span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="rh-contact-field">
                  <span>Email address <b>*</b></span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <div className="rh-contact-fields-two">
                <label className="rh-contact-field">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your contact number"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </label>

                <label className="rh-contact-field">
                  <span>Area of concern <b>*</b></span>
                  <select
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a concern
                    </option>
                    <option value="Back and neck">Back and neck</option>
                    <option value="Joint and muscle pain">
                      Joint and muscle pain
                    </option>
                    <option value="Sports rehabilitation">
                      Sports rehabilitation
                    </option>
                    <option value="Post surgery recovery">
                      Post surgery recovery
                    </option>
                    <option value="Movement and mobility">
                      Movement and mobility
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <label className="rh-contact-field">
                <span>How can we help? <b>*</b></span>
                <textarea
                  name="message"
                  placeholder="Tell us about your goals or concerns..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </label>

              <div className="rh-contact-form-footer">
                <p>
                  <ShieldCheck size={15} />
                  Your information should be handled securely.
                </p>

                <button
                  type="submit"
                  className="rh-contact-submit"
                >
                  Submit enquiry
                  <ArrowRight size={17} />
                </button>
              </div>

              {status && (
                <div
                  className="rh-contact-status"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </div>
              )}
            </form>

            <div className="rh-contact-form-bottom">
              <span>REHABICS</span>
              <span>MADE FOR YOUR MOVEMENT</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="rh-contact-bottom-cta">
        <div className="rh-contact-bottom-inner">
          <div>
            <span className="rh-contact-section-label">
              THE WAY FORWARD
            </span>
            <h2>
              Movement is more
              <br />
              than a destination.
            </h2>
            <p>
              Discover a more considered approach to
              physiotherapy and recovery.
            </p>
          </div>

          <Link to="/approach" className="rh-contact-cta-link">
            Discover our approach
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Contact;
