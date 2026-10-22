
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Appointment.css";

const services = [
  "Initial Physiotherapy Assessment",
  "Back and Neck Pain",
  "Sports Rehabilitation",
  "Joint and Muscle Recovery",
  "Post Surgery Rehabilitation",
  "Movement and Mobility",
  "Online Physiotherapy",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const Appointment = () => {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    mode: "In person",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.date < localToday) {
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      mode: "In person",
      notes: "",
    });

    setSubmitted(false);
  };

  return (
    <main className="rh-appointment">
      <section className="rh-ap-hero">
        <div className="rh-ap-hero-image" />
        <div className="rh-ap-hero-overlay" />

        <div className="rh-ap-hero-inner">
          <motion.div
            className="rh-ap-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span />
            YOUR JOURNEY, YOUR PACE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Make room
            <br />
            for <span>recovery.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Take the first step towards moving with greater
            confidence. Choose your preferred session and
            tell us how we can support your recovery.
          </motion.p>

          <motion.a
            href="#booking"
            className="rh-ap-hero-button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Book an appointment
            <ArrowUpRight size={18} />
          </motion.a>

          <div className="rh-ap-hero-footer">
            <span>REHABICS</span>
            <span>01 / PERSONALISE YOUR CARE</span>
          </div>
        </div>
      </section>

      <section className="rh-ap-booking" id="booking">
        <div className="rh-ap-booking-grid">
          <motion.aside
            className="rh-ap-sidebar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rh-ap-section-label">
              <CalendarDays size={15} />
              THE FIRST STEP
            </div>

            <h2>
              Your time.
              <br />
              Your recovery.
              <br />
              <span>Your way.</span>
            </h2>

            <p className="rh-ap-sidebar-copy">
              A thoughtful approach begins with understanding
              you. Share a few details so your appointment
              request reflects your needs.
            </p>

            <div className="rh-ap-steps">
              <div className="rh-ap-step">
                <span className="rh-ap-step-number">01</span>
                <div>
                  <h3>Choose your care</h3>
                  <p>Select the service that best fits your needs.</p>
                </div>
              </div>

              <div className="rh-ap-step">
                <span className="rh-ap-step-number">02</span>
                <div>
                  <h3>Find your time</h3>
                  <p>Pick a preferred date and available time option.</p>
                </div>
              </div>

              <div className="rh-ap-step">
                <span className="rh-ap-step-number">03</span>
                <div>
                  <h3>Send your request</h3>
                  <p>Our team can confirm your session after reviewing it.</p>
                </div>
              </div>
            </div>

            <div className="rh-ap-assurance">
              <ShieldCheck size={21} strokeWidth={1.5} />
              <div>
                <strong>Care that starts with you</strong>
                <p>
                  Your preferences help us understand your
                  appointment needs.
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            className="rh-ap-form-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {!submitted ? (
              <>
                <div className="rh-ap-form-heading">
                  <div>
                    <span>APPOINTMENT REQUEST</span>
                    <h2>Let’s get you started.</h2>
                  </div>

                  <div className="rh-ap-form-icon">
                    <CalendarDays size={22} />
                  </div>
                </div>

                <p className="rh-ap-form-intro">
                  Complete the details below to request your session.
                </p>

                <form
                  className="rh-ap-form"
                  onSubmit={handleSubmit}
                >
                  <div className="rh-ap-form-section-title">
                    <UserRound size={16} />
                    YOUR DETAILS
                  </div>

                  <div className="rh-ap-form-row">
                    <label className="rh-ap-field">
                      <span>Full name *</span>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label className="rh-ap-field">
                      <span>Email address *</span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  <label className="rh-ap-field">
                    <span>Phone number *</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      autoComplete="tel"
                      required
                      minLength={7}
                    />
                  </label>

                  <div className="rh-ap-form-divider" />

                  <div className="rh-ap-form-section-title">
                    <CalendarDays size={16} />
                    YOUR SESSION
                  </div>

                  <label className="rh-ap-field">
                    <span>Choose a service *</span>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="rh-ap-form-row">
                    <label className="rh-ap-field">
                      <span>Preferred date *</span>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={localToday}
                        required
                      />
                    </label>

                    <label className="rh-ap-field">
                      <span>Preferred time *</span>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a time
                        </option>

                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="rh-ap-field">
                    <span>Session preference *</span>

                    <div className="rh-ap-mode-options">
                      {["In person", "Online"].map((mode) => (
                        <label
                          className={`rh-ap-mode-option ${
                            form.mode === mode ? "active" : ""
                          }`}
                          key={mode}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={mode}
                            checked={form.mode === mode}
                            onChange={handleChange}
                          />

                          <span className="rh-ap-radio" />
                          <span>{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="rh-ap-field">
                    <span>
                      Anything we should know?{" "}
                      <small>OPTIONAL</small>
                    </span>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Briefly describe your concern or goals"
                    />
                  </label>

                  <div className="rh-ap-submit-area">
                    <p>
                      <ShieldCheck size={15} />
                      Requesting an appointment does not confirm
                      a booking.
                    </p>

                    <button
                      type="submit"
                      className="rh-ap-submit"
                    >
                      Request appointment
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>

                <div className="rh-ap-form-bottom">
                  <span>REHABICS</span>
                  <span>YOUR RECOVERY MATTERS</span>
                </div>
              </>
            ) : (
              <motion.div
                className="rh-ap-confirmation"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="rh-ap-confirmation-icon">
                  <CheckCircle2 size={34} />
                </div>

                <span className="rh-ap-confirmation-kicker">
                  REQUEST DETAILS
                </span>

                <h2>Your details are ready.</h2>

                <p>
                  Your appointment request has been validated
                  in this demo. It has not been sent to the
                  Rehabics team yet.
                </p>

                <div className="rh-ap-summary">
                  <div>
                    <span>NAME</span>
                    <strong>{form.name}</strong>
                  </div>

                  <div>
                    <span>SERVICE</span>
                    <strong>{form.service}</strong>
                  </div>

                  <div>
                    <span>DATE</span>
                    <strong>{form.date}</strong>
                  </div>

                  <div>
                    <span>TIME</span>
                    <strong>{form.time}</strong>
                  </div>

                  <div>
                    <span>SESSION</span>
                    <strong>{form.mode}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="rh-ap-submit"
                  onClick={resetForm}
                >
                  Make another request
                  <ArrowRight size={17} />
                </button>

                <Link
                  to="/contact"
                  className="rh-ap-confirmation-link"
                >
                  Contact Rehabics
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="rh-ap-bottom">
        <div className="rh-ap-bottom-inner">
          <div>
            <span className="rh-ap-section-label">
              A MORE CONSIDERED APPROACH
            </span>

            <h2>
              Progress begins
              <br />
              with a conversation.
            </h2>

            <p>
              Learn how the Rehabics approach puts your goals
              and movement at the centre of care.
            </p>
          </div>

          <Link to="/approach" className="rh-ap-bottom-link">
            Explore our approach
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Appointment;
