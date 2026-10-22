
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import "./Footer.css";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Conditions", path: "/conditions" },
  { label: "Our Approach", path: "/approach" },
  { label: "Contact Us", path: "/contact" },
];

const services = [
  { label: "Physiotherapy", path: "/services" },
  { label: "Sports Rehabilitation", path: "/services" },
  { label: "Pain Management", path: "/conditions" },
  { label: "Strength and Mobility", path: "/services" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: FaYoutube,
  },
];

const Footer = () => {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="rehabics-footer">

      {/* Appointment CTA */}
      <section className="footer-cta">
        <motion.div
          className="footer-cta-inner"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="footer-cta-content">
            <span className="footer-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              Move better.
              <br />
              <span>Live stronger.</span>
            </h2>

            <p>
              Take a confident step towards better movement,
              personalised care and lasting progress.
            </p>
          </div>

          <Link
            to="/contact"
            className="footer-cta-button"
          >
            <span>Book an Appointment</span>
            <ArrowUpRight size={19} />
          </Link>
        </motion.div>
      </section>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-brand-column">
            <Link
              to="/"
              className="footer-brand"
              aria-label="Rehabics home"
            >
              <span className="footer-brand-symbol">
                R<span>.</span>
              </span>

              <span className="footer-brand-name">
                REHABICS
              </span>
            </Link>

            <p className="footer-description">
              Personalised physiotherapy and rehabilitation
              to help you move with confidence, rebuild
              strength and return to the activities you love.
            </p>

            <div className="footer-social-heading">
              FOLLOW OUR JOURNEY
            </div>

            <div className="footer-socials">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Rehabics on ${label}`}
                  className="footer-social-link"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="footer-column">
            <h3>Explore</h3>

            <ul className="footer-link-list">
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}>
                    <span>{label}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3>Our Services</h3>

            <ul className="footer-link-list">
              {services.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}>
                    <span>{label}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact-column">
            <h3>Get in Touch</h3>

            <p className="footer-contact-description">
              Have a question about physiotherapy or your
              recovery journey? Get in touch with our team.
            </p>

            <div className="footer-contact-list">
              <a
                href="tel:+910000000000"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <Phone size={17} />
                </span>
                <span>Call our team</span>
              </a>

              <a
                href="mailto:hello@rehabics.com"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <Mail size={17} />
                </span>
                <span>hello@rehabics.com</span>
              </a>

              <Link
                to="/contact"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <MapPin size={17} />
                </span>
                <span>Find our clinic</span>
              </Link>
            </div>

            <Link
              to="/contact"
              className="footer-contact-cta"
            >
              Let's talk
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Rehabics. All rights reserved.
          </p>

          <div className="footer-legal-links">
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms of Use
            </Link>
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
