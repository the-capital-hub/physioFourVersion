
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  HeartPulse,
  CalendarDays,
  Send,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./Contact.css";

// Replace this with the actual WhatsApp number.
// Include the country code without + or spaces.
const WHATSAPP_NUMBER = "919999999999";

const Contact = () => {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formError, setFormError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, phone, service, message } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !service ||
      !message.trim()
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (WHATSAPP_NUMBER === "919999999999") {
      setFormError(
        "Please add your actual WhatsApp number in Contact.jsx first."
      );
      return;
    }

    const whatsappMessage = [
      "Hello Rehabics Team!",
      "",
      "I would like to enquire about your physiotherapy services.",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service}`,
      "",
      "Message:",
      message.trim(),
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call our team",
      description: "Speak with our team about your enquiry.",
      value: "Add your phone number",
      href: "",
    },
    {
      icon: Mail,
      title: "Email us",
      description: "Send us your questions and enquiries.",
      value: "Add your email address",
      href: "",
    },
    {
      icon: MapPin,
      title: "Visit our clinic",
      description: "Find the right care for your movement goals.",
      value: "Add your clinic address",
      href: "",
    },
  ];

  return (
    <main className="rv3ContactPage">
      <HeroSection
        eyebrow="WE ARE HERE FOR YOU"
        title="Let’s Start Your"
        highlight="Recovery Journey"
        secondLine="Together"
        description="Have a question about physiotherapy or need help choosing the right care? Connect with our team and take your next step towards better movement."
        primaryText="Send an Enquiry"
        primaryLink="#contact-form"
        secondaryText="Chat on WhatsApp"
        secondaryLink={`https://wa.me/${WHATSAPP_NUMBER}`}
        showSecondary
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
      />

      <section className="rv3ContactIntro">
        <div className="rv3ContactContainer">
          <motion.div
            className="rv3ContactIntroContent"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="rv3ContactEyebrow">
              <HeartPulse size={15} />
              PERSONAL SUPPORT
            </span>

            <h2>
              Your questions matter.
              <span> Let’s talk.</span>
            </h2>

            <p>
              Every recovery journey is different. Tell us what
              you need, and our team will help you understand
              the next steps.
            </p>
          </motion.div>

          <div className="rv3ContactCards">
            {contactCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  className="rv3ContactInfoCard"
                  key={card.title}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <span className="rv3ContactInfoIcon">
                    <Icon size={21} />
                  </span>

                  <h3>{card.title}</h3>
                  <p>{card.description}</p>

                  {card.href ? (
                    <a href={card.href}>{card.value}</a>
                  ) : (
                    <span className="rv3ContactInfoValue">
                      {card.value}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="rv3ContactMain"
        id="contact-form"
      >
        <div className="rv3ContactContainer">
          <div className="rv3ContactMainGrid">
            <motion.div
              className="rv3ContactAside"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="rv3ContactEyebrow">
                <MessageCircle size={15} />
                GET IN TOUCH
              </span>

              <h2>
                Tell us how we can
                <span> help you.</span>
              </h2>

              <p className="rv3ContactAsideDescription">
                Fill in the form with a few details. We will
                prepare your enquiry and open WhatsApp so you
                can send it directly to our team.
              </p>

              <div className="rv3ContactBenefit">
                <span>
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <h3>Simple enquiry process</h3>
                  <p>Share your details in a few easy steps.</p>
                </div>
              </div>

              <div className="rv3ContactBenefit">
                <span>
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <h3>Personalised guidance</h3>
                  <p>Tell us about the support you are seeking.</p>
                </div>
              </div>

              <div className="rv3ContactBenefit">
                <span>
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <h3>Direct WhatsApp connection</h3>
                  <p>Review your message before sending it.</p>
                </div>
              </div>

              <div className="rv3ContactHours">
                <Clock size={20} />
                <div>
                  <h3>Need assistance?</h3>
                  <p>
                    Send your enquiry and our team can follow
                    up with you.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rv3ContactFormCard"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <div className="rv3ContactFormHeader">
                <div>
                  <span className="rv3ContactFormLabel">
                    CONTACT FORM
                  </span>
                  <h2>Send us an enquiry</h2>
                  <p>
                    Complete the details below to continue on
                    WhatsApp.
                  </p>
                </div>

                <span className="rv3ContactFormHeaderIcon">
                  <CalendarDays size={23} />
                </span>
              </div>

              <form
                className="rv3ContactForm"
                onSubmit={handleSubmit}
              >
                <div className="rv3ContactField">
                  <label htmlFor="contactName">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={updateField}
                    required
                  />
                </div>

                <div className="rv3ContactFormRow">
                  <div className="rv3ContactField">
                    <label htmlFor="contactEmail">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="contactEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={updateField}
                      required
                    />
                  </div>

                  <div className="rv3ContactField">
                    <label htmlFor="contactPhone">
                      Phone number <span>*</span>
                    </label>
                    <input
                      id="contactPhone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>

                <div className="rv3ContactField">
                  <label htmlFor="contactService">
                    What do you need help with? <span>*</span>
                  </label>
                  <select
                    id="contactService"
                    name="service"
                    value={formData.service}
                    onChange={updateField}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="Physiotherapy Consultation">
                      Physiotherapy consultation
                    </option>
                    <option value="Pain Management">
                      Pain management
                    </option>
                    <option value="Mobility and Rehabilitation">
                      Mobility and rehabilitation
                    </option>
                    <option value="Online Physiotherapy">
                      Online physiotherapy
                    </option>
                    <option value="General Enquiry">
                      General enquiry
                    </option>
                  </select>
                </div>

                <div className="rv3ContactField">
                  <label htmlFor="contactMessage">
                    Your message <span>*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows="4"
                    placeholder="Tell us how we can help you"
                    value={formData.message}
                    onChange={updateField}
                    required
                  />
                </div>

                {formError && (
                  <p
                    className="rv3ContactFormError"
                    role="alert"
                  >
                    {formError}
                  </p>
                )}

                <button
                  className="rv3ContactSubmitButton"
                  type="submit"
                >
                  <MessageCircle size={18} />
                  Continue on WhatsApp
                  <ArrowUpRight size={18} />
                </button>

                <p className="rv3ContactPrivacy">
                  WhatsApp will open with your enquiry ready
                  to review. You must press send in WhatsApp
                  to deliver the message.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="rv3ContactBottom">
        <div className="rv3ContactContainer">
          <div className="rv3ContactBottomInner">
            <span className="rv3ContactBottomIcon">
              <HeartPulse size={25} />
            </span>

            <div>
              <h2>Every step towards better movement counts.</h2>
              <p>
                Reach out today and let us help you explore
                your next step.
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="rv3ContactBottomLink"
            >
              <MessageCircle size={17} />
              Chat with us
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Contact;
