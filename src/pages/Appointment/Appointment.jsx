
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Video,
  UserRound,
  Phone,
  Mail,
  HeartPulse,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
  ClipboardCheck,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./Appointment.css";

const WHATSAPP_NUMBER = "919999999999";

const getLocalDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Appointment = () => {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    appointmentType: "Online physiotherapy",
    service: "",
    date: "",
    time: "",
    concerns: "",
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

    const {
      name,
      phone,
      email,
      appointmentType,
      service,
      date,
      time,
      concerns,
    } = formData;

    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !service ||
      !date ||
      !time
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\s()]{7,20}$/.test(phone.trim())) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    if (date < getLocalDate()) {
      setFormError("Please choose today or a future date.");
      return;
    }

    if (WHATSAPP_NUMBER === "919999999999") {
      setFormError(
        "Please add the actual Rehabics WhatsApp number in Appointment.jsx."
      );
      return;
    }

    const appointmentMessage = [
      "Hello Rehabics Team!",
      "",
      "I would like to request a physiotherapy appointment.",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      `Appointment type: ${appointmentType}`,
      `Service: ${service}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      `Additional details: ${concerns.trim() || "Not provided"}`,
      "",
      "Please confirm availability for my requested appointment.",
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(appointmentMessage);

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

  const appointmentTypes = [
    {
      value: "Online physiotherapy",
      title: "Online session",
      description: "Connect with a physiotherapist remotely.",
      icon: Video,
    },
    {
      value: "Clinic visit",
      title: "Clinic visit",
      description: "Request an in person appointment.",
      icon: MapPin,
    },
  ];

  const benefits = [
    "Choose your preferred appointment type",
    "Share your availability with our team",
    "Receive confirmation directly from Rehabics",
  ];

  return (
    <main className="rv3AppointmentPage">
      <HeroSection
        eyebrow="YOUR RECOVERY STARTS HERE"
        title="Book Your"
        highlight="Physiotherapy"
        secondLine="Appointment"
        description="Take the next step towards better movement. Request an online session or a clinic visit with the Rehabics team."
        primaryText="Book an Appointment"
        primaryLink="#appointment-form"
        secondaryText="Chat on WhatsApp"
        secondaryLink={`https://wa.me/${WHATSAPP_NUMBER}`}
        showSecondary
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
      />

      <section className="rv3AppointmentIntro">
        <div className="rv3AppointmentContainer">
          <motion.div
            className="rv3AppointmentIntroText"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="rv3AppointmentEyebrow">
              <HeartPulse size={16} />
              PERSONALISED PHYSIOTHERAPY
            </span>

            <h2>
              A better way to
              <span> begin your recovery.</span>
            </h2>

            <p>
              Tell us what you need and when you would like
              to visit. Our team can review your request and
              confirm the available appointment.
            </p>
          </motion.div>

          <div className="rv3AppointmentSteps">
            <div className="rv3AppointmentStep">
              <span className="rv3AppointmentStepNumber">01</span>
              <div>
                <h3>Choose your session</h3>
                <p>Select online care or a clinic visit.</p>
              </div>
            </div>

            <div className="rv3AppointmentStep">
              <span className="rv3AppointmentStepNumber">02</span>
              <div>
                <h3>Share your details</h3>
                <p>Choose a preferred date and time.</p>
              </div>
            </div>

            <div className="rv3AppointmentStep">
              <span className="rv3AppointmentStepNumber">03</span>
              <div>
                <h3>Send your request</h3>
                <p>Continue to WhatsApp to contact our team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="rv3AppointmentBooking"
        id="appointment-form"
      >
        <div className="rv3AppointmentContainer">
          <div className="rv3AppointmentBookingGrid">
            <motion.aside
              className="rv3AppointmentSidebar"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <span className="rv3AppointmentEyebrow">
                <ClipboardCheck size={16} />
                APPOINTMENT REQUEST
              </span>

              <h2>
                Let us help you
                <span> move better.</span>
              </h2>

              <p className="rv3AppointmentSidebarText">
                Complete the booking form with your preferred
                session details. We will receive your request
                through WhatsApp once you send the message.
              </p>

              <div className="rv3AppointmentBenefitList">
                {benefits.map((benefit) => (
                  <div
                    className="rv3AppointmentBenefit"
                    key={benefit}
                  >
                    <CheckCircle2 size={19} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="rv3AppointmentHelpCard">
                <span className="rv3AppointmentHelpIcon">
                  <MessageCircle size={22} />
                </span>

                <div>
                  <h3>Need help booking?</h3>
                  <p>
                    Send your request through WhatsApp and
                    ask our team about the next steps.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat with our team
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.aside>

            <motion.div
              className="rv3AppointmentFormCard"
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeUp}
            >
              <div className="rv3AppointmentFormHeader">
                <div>
                  <span className="rv3AppointmentFormLabel">
                    LET US KNOW YOUR PREFERENCES
                  </span>
                  <h2>Request an appointment</h2>
                  <p>
                    Fields marked with an asterisk are required.
                  </p>
                </div>

                <span className="rv3AppointmentHeaderIcon">
                  <CalendarDays size={24} />
                </span>
              </div>

              <form
                className="rv3AppointmentForm"
                onSubmit={handleSubmit}
              >
                <div className="rv3AppointmentFormSectionTitle">
                  <UserRound size={18} />
                  <h3>Your details</h3>
                </div>

                <div className="rv3AppointmentField">
                  <label htmlFor="appointmentName">
                    Full name <span>*</span>
                  </label>
                  <input
                    id="appointmentName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={updateField}
                    required
                  />
                </div>

                <div className="rv3AppointmentFormRow">
                  <div className="rv3AppointmentField">
                    <label htmlFor="appointmentPhone">
                      Phone number <span>*</span>
                    </label>
                    <input
                      id="appointmentPhone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={updateField}
                      required
                    />
                  </div>

                  <div className="rv3AppointmentField">
                    <label htmlFor="appointmentEmail">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="appointmentEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>

                <div className="rv3AppointmentFormDivider" />

                <div className="rv3AppointmentFormSectionTitle">
                  <CalendarDays size={18} />
                  <h3>Session preferences</h3>
                </div>

                <div className="rv3AppointmentField">
                  <label>
                    Appointment type <span>*</span>
                  </label>

                  <div className="rv3AppointmentTypeOptions">
                    {appointmentTypes.map((type) => {
                      const Icon = type.icon;
                      const selected =
                        formData.appointmentType === type.value;

                      return (
                        <button
                          className={
                            selected
                              ? "rv3AppointmentTypeCard isSelected"
                              : "rv3AppointmentTypeCard"
                          }
                          type="button"
                          key={type.value}
                          aria-pressed={selected}
                          onClick={() =>
                            setFormData((previous) => ({
                              ...previous,
                              appointmentType: type.value,
                            }))
                          }
                        >
                          <span className="rv3AppointmentTypeIcon">
                            <Icon size={21} />
                          </span>

                          <span className="rv3AppointmentTypeCopy">
                            <strong>{type.title}</strong>
                            <small>{type.description}</small>
                          </span>

                          <span className="rv3AppointmentRadio">
                            {selected && (
                              <span />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rv3AppointmentField">
                  <label htmlFor="appointmentService">
                    Service required <span>*</span>
                  </label>
                  <select
                    id="appointmentService"
                    name="service"
                    value={formData.service}
                    onChange={updateField}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="Physiotherapy consultation">
                      Physiotherapy consultation
                    </option>
                    <option value="Pain management">
                      Pain management
                    </option>
                    <option value="Mobility and rehabilitation">
                      Mobility and rehabilitation
                    </option>
                    <option value="Sports injury rehabilitation">
                      Sports injury rehabilitation
                    </option>
                    <option value="Post surgery rehabilitation">
                      Post surgery rehabilitation
                    </option>
                    <option value="General physiotherapy">
                      General physiotherapy
                    </option>
                  </select>
                </div>

                <div className="rv3AppointmentFormRow">
                  <div className="rv3AppointmentField">
                    <label htmlFor="appointmentDate">
                      Preferred date <span>*</span>
                    </label>
                    <div className="rv3AppointmentInputIcon">
                      <CalendarDays size={17} />
                      <input
                        id="appointmentDate"
                        name="date"
                        type="date"
                        min={getLocalDate()}
                        value={formData.date}
                        onChange={updateField}
                        required
                      />
                    </div>
                  </div>

                  <div className="rv3AppointmentField">
                    <label htmlFor="appointmentTime">
                      Preferred time <span>*</span>
                    </label>
                    <div className="rv3AppointmentInputIcon">
                      <Clock3 size={17} />
                      <select
                        id="appointmentTime"
                        name="time"
                        value={formData.time}
                        onChange={updateField}
                        required
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        <option value="Morning, 9 AM to 12 PM">
                          Morning, 9 AM to 12 PM
                        </option>
                        <option value="Afternoon, 12 PM to 4 PM">
                          Afternoon, 12 PM to 4 PM
                        </option>
                        <option value="Evening, 4 PM to 7 PM">
                          Evening, 4 PM to 7 PM
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rv3AppointmentField">
                  <label htmlFor="appointmentConcerns">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="appointmentConcerns"
                    name="concerns"
                    rows="3"
                    placeholder="Share your concerns or any details that may help our team"
                    value={formData.concerns}
                    onChange={updateField}
                  />
                </div>

                {formError && (
                  <p
                    className="rv3AppointmentError"
                    role="alert"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="rv3AppointmentSubmit"
                >
                  <MessageCircle size={18} />
                  Request on WhatsApp
                  <ArrowUpRight size={18} />
                </button>

                <p className="rv3AppointmentFormNote">
                  Your appointment is not confirmed until the
                  Rehabics team responds. WhatsApp will open
                  with your request ready to send.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="rv3AppointmentBottom">
        <div className="rv3AppointmentContainer">
          <div className="rv3AppointmentBottomInner">
            <span className="rv3AppointmentBottomIcon">
              <HeartPulse size={25} />
            </span>

            <div>
              <h2>Your recovery deserves the right support.</h2>
              <p>
                Take the first step and request your session
                with Rehabics.
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="rv3AppointmentBottomButton"
            >
              <MessageCircle size={17} />
              Contact our team
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default Appointment;
