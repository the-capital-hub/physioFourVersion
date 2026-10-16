
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  HeartPulse,
  ShieldCheck,
  UserRound,
  Stethoscope,
  Mail,
  LockKeyhole,
  Phone,
  CheckCircle2,
  Fingerprint,
  Sparkles,
} from "lucide-react";
import "./Auth.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  remember: true,
  agree: false,
};

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [form, setForm] = useState(initialForm);

  const isRegister = mode === "register";

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const showError = (text) => {
    setMessageType("error");
    setMessage(text);
  };

  const handleForgotPassword = () => {
    setMessageType("error");
    setMessage(
      "Password recovery will be available after authentication backend integration."
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    const email = form.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!form.password) {
      showError("Please enter your password.");
      return;
    }

    if (isRegister) {
      if (form.name.trim().length < 2) {
        showError("Please enter your full name.");
        return;
      }

      if (!/^\+?[0-9\s()]{10,16}$/.test(form.phone.trim())) {
        showError("Please enter a valid phone number.");
        return;
      }

      if (form.password.length < 8) {
        showError("Your password must contain at least 8 characters.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        showError("Your passwords do not match.");
        return;
      }

      if (!form.agree) {
        showError("Please accept the terms to continue.");
        return;
      }
    }

    setMessageType("success");
    setMessage(
      isRegister
        ? `Your ${role} registration form is valid. Connect the backend to create your account.`
        : "Your form is valid. Connect the backend to sign in securely."
    );
  };

  return (
    <main className="rehabAuth">
      <div className="authNoise" aria-hidden="true" />
      <div className="authGlow authGlowOne" aria-hidden="true" />
      <div className="authGlow authGlowTwo" aria-hidden="true" />

      <div className="authShell">
        {/* LEFT CINEMATIC PANEL */}
        <motion.section
          className="authVisual"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="authVisualImage" aria-hidden="true" />
          <div className="authVisualOverlay" aria-hidden="true" />

          <Link to="/" className="authBrand" aria-label="Rehabics home">
            <span className="authBrandIcon">
              <Activity size={24} strokeWidth={2.2} />
            </span>
            <span className="authBrandText">
              <strong>rehabics<span>.</span></strong>
              <small>MOVE BETTER. LIVE BETTER.</small>
            </span>
          </Link>

          <div className="authVisualContent">
            <div className="authEyebrow">
              <span className="authEyebrowIcon">
                <HeartPulse size={15} />
              </span>
              <span>YOUR MOVEMENT. YOUR FUTURE.</span>
            </div>

            <h1>
              Recovery is
              <br />
              not the end.
              <br />
              <span>It is a new beginning.</span>
            </h1>

            <p className="authVisualDescription">
              Better movement starts with the right support. Build strength,
              restore confidence and take your next step with Rehabics.
            </p>

            <div className="authBenefits">
              <div className="authBenefit">
                <span className="authBenefitIcon">
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <strong>Care you can trust</strong>
                  <small>Your wellbeing comes first</small>
                </div>
              </div>

              <div className="authBenefit">
                <span className="authBenefitIcon">
                  <UserRound size={19} />
                </span>
                <div>
                  <strong>Care made personal</strong>
                  <small>Support built around you</small>
                </div>
              </div>
            </div>
          </div>

          <div className="authVisualFooter">
            <span className="authFooterLine" />
            <span>STRONGER MOVEMENT. BETTER LIVING.</span>
            <span className="authFooterNumber">01 / 03</span>
          </div>

          <div className="authVisualTag">
            <Activity size={15} />
            <span>BUILT AROUND YOUR RECOVERY</span>
          </div>
        </motion.section>

        {/* RIGHT AUTH PANEL */}
        <motion.section
          className="authFormPanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <div className="authMobileBrand">
            <Link to="/" className="authBrand">
              <span className="authBrandIcon">
                <Activity size={22} />
              </span>
              <span className="authBrandText">
                <strong>rehabics<span>.</span></strong>
                <small>MOVE BETTER. LIVE BETTER.</small>
              </span>
            </Link>
          </div>

          <div className="authFormTop">
            <div className="authFormEyebrow">
              <span className="authStatusDot" />
              {isRegister ? "BECOME PART OF REHABICS" : "YOUR JOURNEY CONTINUES"}
            </div>

            <h2>
              {isRegister ? (
                <>
                  Create your
                  <br />
                  <span>account.</span>
                </>
              ) : (
                <>
                  Welcome
                  <br />
                  <span>back.</span>
                </>
              )}
            </h2>

            <p>
              {isRegister
                ? "One small step towards a stronger, healthier you."
                : "Sign in and continue your journey towards better movement."}
            </p>
          </div>

          <div
            className="authModeSwitch"
            role="tablist"
            aria-label="Account access"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isRegister}
              className={!isRegister ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Sign in
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={isRegister}
              className={isRegister ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Create account
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              className="authForm"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              noValidate
            >
              {isRegister && (
                <>
                  <div className="authRoleLabel">
                    <span>01</span>
                    I want to join as
                  </div>

                  <div className="authRoleOptions">
                    <button
                      type="button"
                      className={`authRoleCard ${
                        role === "patient" ? "selected" : ""
                      }`}
                      onClick={() => setRole("patient")}
                      aria-pressed={role === "patient"}
                    >
                      <span className="authRoleIcon">
                        <HeartPulse size={20} />
                      </span>
                      <span className="authRoleText">
                        <strong>Patient</strong>
                        <small>Find better care</small>
                      </span>
                      <span className="authRoleRadio" />
                    </button>

                    <button
                      type="button"
                      className={`authRoleCard ${
                        role === "physiotherapist" ? "selected" : ""
                      }`}
                      onClick={() => setRole("physiotherapist")}
                      aria-pressed={role === "physiotherapist"}
                    >
                      <span className="authRoleIcon">
                        <Stethoscope size={20} />
                      </span>
                      <span className="authRoleText">
                        <strong>Physiotherapist</strong>
                        <small>Support recovery</small>
                      </span>
                      <span className="authRoleRadio" />
                    </button>
                  </div>
                </>
              )}

              {isRegister && (
                <div className="authField">
                  <label htmlFor="authName">Full name</label>
                  <div className="authInputWrap">
                    <UserRound size={18} />
                    <input
                      id="authName"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={form.name}
                      onChange={updateField}
                      minLength={2}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="authField">
                <label htmlFor="authEmail">Email address</label>
                <div className="authInputWrap">
                  <Mail size={18} />
                  <input
                    id="authEmail"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField}
                    required
                  />
                </div>
              </div>

              {isRegister && (
                <div className="authField">
                  <label htmlFor="authPhone">Phone number</label>
                  <div className="authInputWrap">
                    <Phone size={18} />
                    <input
                      id="authPhone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="authField">
                <div className="authLabelRow">
                  <label htmlFor="authPassword">Password</label>
                  {!isRegister && (
                    <button
                      type="button"
                      className="authTextButton"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="authInputWrap">
                  <LockKeyhole size={18} />
                  <input
                    id="authPassword"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isRegister ? "At least 8 characters" : "Enter password"
                    }
                    autoComplete={
                      isRegister ? "new-password" : "current-password"
                    }
                    value={form.password}
                    onChange={updateField}
                    minLength={isRegister ? 8 : undefined}
                    required
                  />
                  <button
                    type="button"
                    className="authEyeButton"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="authField">
                  <label htmlFor="authConfirmPassword">
                    Confirm password
                  </label>
                  <div className="authInputWrap">
                    <LockKeyhole size={18} />
                    <input
                      id="authConfirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter password again"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={updateField}
                      required
                    />
                    <button
                      type="button"
                      className="authEyeButton"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!isRegister && (
                <label className="authCheckRow">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={updateField}
                  />
                  <span>Remember me on this device</span>
                </label>
              )}

              {isRegister && (
                <label className="authCheckRow authTerms">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={updateField}
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>.
                  </span>
                </label>
              )}

              {message && (
                <motion.div
                  className={`authMessage ${
                    messageType === "error" ? "error" : "success"
                  }`}
                  role="status"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {messageType === "success" && (
                    <CheckCircle2 size={18} />
                  )}
                  <span>{message}</span>
                </motion.div>
              )}

              <button type="submit" className="authSubmit">
                <span>
                  {isRegister ? "Create my account" : "Sign in to Rehabics"}
                </span>
                <span className="authSubmitIcon">
                  <ArrowRight size={19} />
                </span>
              </button>

              <div className="authSecureNote">
                <ShieldCheck size={16} />
                <span>Your information deserves care and privacy</span>
              </div>
            </motion.form>
          </AnimatePresence>

          <p className="authBottomText">
            {isRegister
              ? "Already have an account?"
              : "New to Rehabics?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isRegister ? "login" : "register")}
            >
              {isRegister ? "Sign in" : "Create an account"}
              <ArrowUpRight size={14} />
            </button>
          </p>

          <div className="authCopyright">
            <span>© {new Date().getFullYear()} Rehabics</span>
            <span className="authCopyrightDivider" />
            <span>Move with confidence</span>
            <Fingerprint size={15} />
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Auth;
