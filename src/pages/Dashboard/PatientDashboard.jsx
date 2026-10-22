import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity, CalendarDays, ClipboardList, HeartPulse, LogOut, UserRound,
  Plus, Clock3, MapPin, RefreshCw, X, CheckCircle2, AlertCircle,
  Dumbbell, TrendingUp, FileText, MessageCircle, CreditCard, Bell, Settings,
  LifeBuoy, ChevronRight, Search, Upload, Download, Check, PlayCircle
} from "lucide-react";
import "./Dashboard.css";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
function getStoredAuth() {
  const token = localStorage.getItem("rehabics_token") || sessionStorage.getItem("rehabics_token");
  const raw = localStorage.getItem("rehabics_user") || sessionStorage.getItem("rehabics_user");
  try { return { token, user: raw ? JSON.parse(raw) : null }; }
  catch { return { token, user: null }; }
}
function formatDate(value) {
  if (!value) return "Date to be confirmed";
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function statusLabel(status) {
  return ({ pending: "Awaiting confirmation", confirmed: "Confirmed", cancelled: "Cancelled", completed: "Completed" })[status] || status;
}
const menuGroups = [
  { label: "WORKSPACE", items: [
    { id: "overview", label: "Overview", icon: HeartPulse },
    { id: "appointments", label: "My Appointments", icon: CalendarDays, count: true },
    { id: "recovery", label: "My Recovery Plan", icon: ClipboardList },
    { id: "exercises", label: "Exercise Library", icon: Dumbbell },
    { id: "progress", label: "Progress Tracker", icon: TrendingUp },
  ]},
  { label: "MY HEALTH", items: [
    { id: "records", label: "Medical Records", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageCircle, badge: "Soon" },
    { id: "payments", label: "Payments & Invoices", icon: CreditCard, badge: "Soon" },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]},
  { label: "ACCOUNT", items: [
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "settings", label: "Settings", icon: Settings },
  ]},
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const auth = useMemo(getStoredAuth, []);
  const [user, setUser] = useState(auth.user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [form, setForm] = useState({ service: "Initial physiotherapy consultation", date: "", time: "10:00", notes: "" });
  const [exerciseDone, setExerciseDone] = useState({});
  const [painEntries, setPainEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rehabics_pain_entries") || "[]"); } catch { return []; }
  });
  const [painValue, setPainValue] = useState("3");
  const [painNote, setPainNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recordName, setRecordName] = useState("");
  const [recordFile, setRecordFile] = useState(null);
  const [records, setRecords] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rehabics_patient_records") || "[]"); } catch { return []; }
  });
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rehabics_patient_settings") || '{"appointmentReminders":true,"exerciseReminders":true,"productUpdates":false}'); }
    catch { return { appointmentReminders: true, exerciseReminders: true, productUpdates: false }; }
  });

  const token = auth.token;
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const api = useCallback(async (path, options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) },
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) {
      ["rehabics_token","rehabics_user"].forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
      navigate("/login", { replace: true });
      throw new Error("Your session expired. Please sign in again.");
    }
    if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
    return data;
  }, [token, navigate]);

  const loadDashboard = useCallback(async () => {
    if (!token || !auth.user) { navigate("/login", { replace: true }); return; }
    if (auth.user.role !== "patient") { navigate(auth.user.role === "physiotherapist" ? "/dashboard/physiotherapist" : "/", { replace: true }); return; }
    setLoading(true); setError("");
    try {
      const [meData, appointmentData] = await Promise.all([api("/api/auth/me"), api("/api/appointments/mine")]);
      if (meData.user) setUser(meData.user);
      if (Array.isArray(appointmentData.appointments)) setAppointments(appointmentData.appointments);
    } catch (e) { setError(e.message || "Could not load your dashboard."); }
    finally { setLoading(false); }
  }, [api, auth.user, token, navigate]);
  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const upcoming = appointments.filter(a => ["pending", "confirmed"].includes(a.status) && a.date >= minDate);
  const completed = appointments.filter(a => a.status === "completed");
  const activeAppointments = appointments.filter(a => a.status !== "cancelled").sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const updateField = (event) => setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  const bookAppointment = async (event) => {
    event.preventDefault(); setError(""); setNotice("");
    if (!form.date || form.date < minDate) { setError("Please choose today or a future date."); return; }
    setSubmitting(true);
    try {
      const data = await api("/api/appointments", { method: "POST", body: JSON.stringify(form) });
      setAppointments(prev => [data.appointment, ...prev]);
      setForm({ service: "Initial physiotherapy consultation", date: "", time: "10:00", notes: "" });
      setShowBooking(false); setActiveSection("appointments"); setNotice("Your appointment request was sent successfully.");
    } catch (e) { setError(e.message || "Unable to request an appointment."); }
    finally { setSubmitting(false); }
  };
  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment request?")) return;
    setError(""); setNotice("");
    try {
      const data = await api(`/api/appointments/${id}/cancel`, { method: "PATCH" });
      setAppointments(prev => prev.map(a => a._id === id ? data.appointment : a)); setNotice("Appointment cancelled.");
    } catch (e) { setError(e.message || "Unable to cancel this appointment."); }
  };
  const logout = () => {
    ["rehabics_token","rehabics_user"].forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
    navigate("/login", { replace: true });
  };
  const savePainEntry = (e) => {
    e.preventDefault();
    const next = [{ id: `${Date.now()}`, date: new Date().toISOString(), value: Number(painValue), note: painNote.trim() }, ...painEntries].slice(0, 100);
    setPainEntries(next); localStorage.setItem("rehabics_pain_entries", JSON.stringify(next)); setPainNote(""); setNotice("Progress entry saved on this device.");
  };
  const saveRecord = (e) => {
    e.preventDefault();
    if (!recordName.trim() || !recordFile) { setError("Add a document name and choose a file."); return; }
    if (recordFile.size > 5 * 1024 * 1024) { setError("Please choose a file smaller than 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const next = [{ id: `${Date.now()}`, name: recordName.trim(), fileName: recordFile.name, dataUrl: reader.result, addedAt: new Date().toISOString() }, ...records];
      try { localStorage.setItem("rehabics_patient_records", JSON.stringify(next)); setRecords(next); setRecordName(""); setRecordFile(null); setNotice("Document saved in this browser on this device."); setError(""); }
      catch { setError("This browser cannot store any more documents. Remove an old document and try again."); }
    };
    reader.readAsDataURL(recordFile);
  };
  const deleteRecord = (id) => {
    const next = records.filter(r => r.id !== id); setRecords(next); localStorage.setItem("rehabics_patient_records", JSON.stringify(next));
  };
  const updateSetting = (key, value) => {
    const next = { ...settings, [key]: value }; setSettings(next); localStorage.setItem("rehabics_patient_settings", JSON.stringify(next));
  };
  const navItems = menuGroups.flatMap(g => g.items);

  return <div className="rehabDashboard">
    <aside className="dashboardSidebar">
      <a className="dashboardBrand" href="/"><span className="dashboardBrandMark"><Activity size={22}/></span><span>rehabics<small>MOVE BETTER. LIVE BETTER.</small></span></a>
      <div className="dashboardNavScroll">
        {menuGroups.map(group => <div className="dashboardNavGroup" key={group.label}>
          <div className="dashboardNavLabel">{group.label}</div>
          {group.items.map(item => <button key={item.id} className={`dashboardNavItem ${activeSection === item.id ? "active" : ""}`} onClick={() => { setActiveSection(item.id); setShowBooking(false); setError(""); }}><item.icon size={17}/><span>{item.label}</span>{item.count && upcoming.length > 0 && <small className="dashboardNavCount">{upcoming.length}</small>}{item.badge && <small className="dashboardSoonBadge">{item.badge}</small>}</button>)}
        </div>)}
      </div>
      <div className="dashboardSidebarBottom"><button className="dashboardSupportButton" onClick={() => setActiveSection("support")}><LifeBuoy size={17}/> Help & Support</button><button className="dashboardLogout" onClick={logout}><LogOut size={17}/> Sign out</button><div className="dashboardSidebarUser"><span className="dashboardMiniAvatar">{(user?.name || "P").slice(0,1).toUpperCase()}</span><span><strong>{user?.name || "Patient"}</strong><small>Patient account</small></span></div></div>
    </aside>
    <main className="dashboardMain">
      <header className="dashboardTopbar"><span>Patient portal <span className="dashboardDot">/</span> {navItems.find(n => n.id === activeSection)?.label || (activeSection === "support" ? "Help & Support" : "My account")}</span><span className="dashboardAvatar">{(user?.name || "P").slice(0,1).toUpperCase()}</span></header>
      <section className="dashboardWelcome"><span className="dashboardEyebrow">YOUR RECOVERY, YOUR PACE</span><h1>{activeSection === "overview" ? <>Welcome back, <span>{user?.name?.split(" ")[0] || "there"}</span></> : navItems.find(n => n.id === activeSection)?.label || "Help & Support"}</h1><p>{sectionDescription(activeSection)}</p></section>
      {error && <div className="dashboardAlert error"><AlertCircle size={17}/>{error}<button onClick={() => setError("")} aria-label="Dismiss"><X size={15}/></button></div>}
      {notice && <div className="dashboardAlert success"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss"><X size={15}/></button></div>}

      {activeSection === "overview" && <>
        <section className="dashboardStats">
          <article className="dashboardCard"><span className="dashboardCardIcon"><CalendarDays size={20}/></span><span className="dashboardCardLabel">UPCOMING APPOINTMENTS</span><strong>{upcoming.length}</strong><small>Pending and confirmed visits</small></article>
          <article className="dashboardCard"><span className="dashboardCardIcon"><Activity size={20}/></span><span className="dashboardCardLabel">VISITS COMPLETED</span><strong>{completed.length}</strong><small>Your completed sessions</small></article>
          <article className="dashboardCard"><span className="dashboardCardIcon"><TrendingUp size={20}/></span><span className="dashboardCardLabel">PROGRESS ENTRIES</span><strong>{painEntries.length}</strong><small>Entries saved on this device</small></article>
        </section>
        <section className="dashboardLowerGrid"><article className="dashboardPanel"><div className="dashboardPanelHeading"><h2>Next appointment</h2><button className="dashboardTextButton" onClick={() => setActiveSection("appointments")}>View all ↗</button></div>{loading ? <EmptyLoading/> : upcoming.length ? <AppointmentCard appointment={upcoming[0]} onCancel={cancelAppointment}/> : <EmptyState icon={CalendarDays} title="No upcoming appointments" body="Request your first session to get started." action={() => { setActiveSection("appointments"); setShowBooking(true); }} actionText="Request appointment"/>}</article>
        <article className="dashboardPanel dashboardProfilePanel"><div className="dashboardPanelHeading"><h2>Your profile</h2><UserRound size={18}/></div><div className="dashboardProfileAvatar">{(user?.name || "P").slice(0,1).toUpperCase()}</div><strong>{user?.name || "Patient"}</strong><p>{user?.email || ""}</p><p>{user?.phone || ""}</p><span className="dashboardRolePill">PATIENT ACCOUNT</span><button className="dashboardSecondaryButton" onClick={() => setActiveSection("profile")}>View profile</button></article></section>
      </>}

      {activeSection === "appointments" && <section className="dashboardPanel dashboardAppointmentsPanel"><div className="dashboardPanelHeading"><div><h2>Your appointments</h2><p className="dashboardPanelSubtext">Requests are saved to your Rehabics account.</p></div><button className="dashboardPrimaryButton" onClick={() => setShowBooking(v => !v)}><Plus size={16}/>{showBooking ? "Close form" : "Request appointment"}</button></div>
        {showBooking && <form className="dashboardBookingForm" onSubmit={bookAppointment}><label>Type of visit<select name="service" value={form.service} onChange={updateField} required><option>Initial physiotherapy consultation</option><option>Follow up session</option><option>Pain assessment</option><option>Post surgery rehabilitation</option><option>Sports injury rehabilitation</option><option>Online physiotherapy consultation</option></select></label><div className="dashboardFormRow"><label>Preferred date<input type="date" name="date" min={minDate} value={form.date} onChange={updateField} required/></label><label>Preferred time<select name="time" value={form.time} onChange={updateField}>{["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t}>{t}</option>)}</select></label></div><label>Notes for the care team<textarea name="notes" value={form.notes} onChange={updateField} rows="3" maxLength="1000" placeholder="Share your concern or preferred details (optional)"/></label><div className="dashboardFormFooter"><span>Your request stays pending until the care team confirms it.</span><button className="dashboardPrimaryButton" disabled={submitting}>{submitting ? "Sending request…" : "Send appointment request"}</button></div></form>}
        {loading ? <EmptyLoading/> : activeAppointments.length ? <div className="dashboardAppointmentList">{activeAppointments.map(a => <AppointmentCard key={a._id} appointment={a} onCancel={cancelAppointment}/>)}</div> : <EmptyState icon={CalendarDays} title="No appointments yet" body="Choose Request appointment to get started."/>}</section>}

      {activeSection === "recovery" && <section className="dashboardPanel dashboardRecoveryPanel"><span className="dashboardCardIcon"><HeartPulse size={22}/></span><h2>Your recovery plan</h2><p>Your physiotherapist can provide exercises and guidance after your consultation. Only follow exercises recommended for your condition by a qualified clinician.</p><div className="dashboardRecoveryNotice"><Activity size={18}/><span><strong>No recovery plan assigned yet</strong><small>Your care team can add a personalised plan after assessing you.</small></span></div><button className="dashboardPrimaryButton" onClick={() => { setActiveSection("appointments"); setShowBooking(true); }}><Plus size={16}/> Request a consultation</button></section>}

      {activeSection === "exercises" && <section className="dashboardPanel"><div className="dashboardPanelHeading"><div><h2>Exercise library</h2><p className="dashboardPanelSubtext">General educational examples, not a personalised prescription.</p></div><Search size={18}/></div><div className="dashboardExerciseGrid">{[{id:"breathing",name:"Diaphragmatic breathing",meta:"Breathing · 3 minutes",desc:"Practice slow, comfortable breathing while seated."},{id:"posture",name:"Gentle posture check",meta:"Posture · 2 minutes",desc:"Notice a comfortable, supported sitting position."},{id:"walk",name:"Easy walking log",meta:"Mobility · 5 minutes",desc:"Record a comfortable walk only if safe for you."}].map(ex => <article className="dashboardExerciseCard" key={ex.id}><span className="dashboardCardIcon"><PlayCircle size={20}/></span><h3>{ex.name}</h3><small>{ex.meta}</small><p>{ex.desc}</p><button className={`dashboardSecondaryButton ${exerciseDone[ex.id] ? "exerciseCompleted" : ""}`} onClick={() => setExerciseDone(prev => ({...prev,[ex.id]:!prev[ex.id]}))}>{exerciseDone[ex.id] ? <><Check size={15}/> Marked done</> : "Mark as done"}</button></article>)}</div><p className="dashboardPanelSubtext dashboardDisclaimer">Stop if an activity causes pain or concerning symptoms. Ask your physiotherapist which exercises are appropriate for you.</p></section>}

      {activeSection === "progress" && <section className="dashboardPanel"><div className="dashboardPanelHeading"><div><h2>Progress tracker</h2><p className="dashboardPanelSubtext">Log how you feel and share the entries with your clinician when needed.</p></div><TrendingUp size={19}/></div><form className="dashboardBookingForm" onSubmit={savePainEntry}><label>Today’s pain level <strong className="dashboardPainValue">{painValue}/10</strong><input type="range" min="0" max="10" value={painValue} onChange={e => setPainValue(e.target.value)}/><div className="dashboardRangeLabels"><span>0 · No pain</span><span>10 · Worst pain</span></div></label><label>Optional note<textarea rows="2" maxLength="300" value={painNote} onChange={e => setPainNote(e.target.value)} placeholder="What felt better or worse today?"/></label><button className="dashboardPrimaryButton"><Plus size={15}/> Save progress entry</button></form><div className="dashboardPanelHeading dashboardHistoryHeading"><h2>Recent entries</h2><span className="dashboardPanelSubtext">{painEntries.length} saved</span></div>{painEntries.length ? <div className="dashboardAppointmentList">{painEntries.map(entry => <article className="dashboardProgressItem" key={entry.id}><div className="dashboardProgressNumber">{entry.value}<small>/10</small></div><div><strong>{new Date(entry.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</strong><p>{entry.note || "No note added"}</p></div></article>)}</div> : <EmptyState icon={TrendingUp} title="No progress entries yet" body="Add a simple check in to start tracking how you feel."/>}</section>}

      {activeSection === "records" && <section className="dashboardPanel"><div className="dashboardPanelHeading"><div><h2>Medical records</h2><p className="dashboardPanelSubtext">Documents saved here stay in this browser on this device only.</p></div><FileText size={19}/></div><form className="dashboardBookingForm" onSubmit={saveRecord}><label>Document name<input value={recordName} onChange={e => setRecordName(e.target.value)} maxLength="100" placeholder="e.g. X ray report" required/></label><label>Choose document<input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={e => setRecordFile(e.target.files?.[0] || null)} required/><small>PDF or image, up to 5 MB. Do not store highly sensitive files on a shared device.</small></label><button className="dashboardPrimaryButton"><Upload size={15}/> Save document locally</button></form>{records.length ? <div className="dashboardAppointmentList">{records.map(r => <article className="dashboardRecordItem" key={r.id}><FileText size={20}/><span><strong>{r.name}</strong><small>{r.fileName} · {new Date(r.addedAt).toLocaleDateString("en-IN")}</small></span><a href={r.dataUrl} download={r.fileName} aria-label={`Download ${r.fileName}`}><Download size={17}/></a><button onClick={() => deleteRecord(r.id)} aria-label="Delete document"><X size={17}/></button></article>)}</div> : <EmptyState icon={FileText} title="No documents saved" body="Add a report to keep a local copy listed here."/>}</section>}

      {activeSection === "messages" && <ComingSoon title="Secure messages" body="Direct messages with your physiotherapist are not connected yet. This feature needs a protected messaging API and clinician inbox." icon={MessageCircle} action={() => {setActiveSection("support");}} actionText="View support options"/>}
      {activeSection === "payments" && <ComingSoon title="Payments and invoices" body="Payment history and receipts are not connected yet. No payments are taken from this dashboard." icon={CreditCard} action={() => {setActiveSection("support");}} actionText="Contact support"/>}
      {activeSection === "notifications" && <section className="dashboardPanel"><div className="dashboardPanelHeading"><h2>Notifications</h2><Bell size={19}/></div><EmptyState icon={Bell} title="You’re all caught up" body="Important appointment updates will appear here when notifications are connected to the backend."/></section>}
      {activeSection === "profile" && <section className="dashboardPanel dashboardProfileDetails"><div className="dashboardPanelHeading"><h2>Account details</h2><span className="dashboardRolePill">PATIENT</span></div><div className="dashboardProfileDetailsAvatar">{(user?.name || "P").slice(0,1).toUpperCase()}</div><div className="dashboardDetailRow"><span>Full name</span><strong>{user?.name || "Not provided"}</strong></div><div className="dashboardDetailRow"><span>Email address</span><strong>{user?.email || "Not provided"}</strong></div><div className="dashboardDetailRow"><span>Phone number</span><strong>{user?.phone || "Not provided"}</strong></div><div className="dashboardDetailRow"><span>Account type</span><strong>Patient</strong></div><p className="dashboardPanelSubtext">For changes to account details, contact the Rehabics care team.</p><button className="dashboardSecondaryButton" onClick={() => setActiveSection("settings")}>Open settings <ChevronRight size={15}/></button></section>}
      {activeSection === "settings" && <section className="dashboardPanel"><div className="dashboardPanelHeading"><h2>Preferences</h2><Settings size={19}/></div><p className="dashboardPanelSubtext">These preferences are saved in this browser only. Email or push notifications are not sent yet.</p>{[{key:"appointmentReminders",title:"Appointment reminders",desc:"Preference for future appointment notifications."},{key:"exerciseReminders",title:"Exercise reminders",desc:"Preference for future recovery reminders."},{key:"productUpdates",title:"Rehabics updates",desc:"Occasional product and service updates."}].map(item => <label className="dashboardSettingRow" key={item.key}><span><strong>{item.title}</strong><small>{item.desc}</small></span><input type="checkbox" checked={!!settings[item.key]} onChange={e => updateSetting(item.key,e.target.checked)}/></label>)}</section>}
      {activeSection === "support" && <section className="dashboardPanel dashboardRecoveryPanel"><span className="dashboardCardIcon"><LifeBuoy size={22}/></span><h2>Help & support</h2><p>Need help with an appointment or account? Contact the Rehabics team using the clinic contact details provided to you.</p><div className="dashboardRecoveryNotice"><MessageCircle size={18}/><span><strong>Support contact not configured</strong><small>Add your clinic email or phone number to the dashboard configuration to make this contact option live.</small></span></div><button className="dashboardSecondaryButton" onClick={() => setActiveSection("appointments")}>Manage appointments <ChevronRight size={15}/></button></section>}
    </main>
  </div>;
}

function sectionDescription(section) {
  return ({ overview:"Your care, appointments and next steps in one place.", appointments:"Request a visit and manage your upcoming appointments.", recovery:"View guidance and recovery information shared by your care team.", exercises:"Explore simple educational activities and record completion on this device.", progress:"Record your symptoms and review your personal check ins.", records:"Keep track of reports and documents.", messages:"Your communication with the care team.", payments:"View your billing information.", notifications:"Your important updates.", profile:"Review the account details linked to your patient portal.", settings:"Manage your dashboard preferences.", support:"Find help for your account and appointments." })[section] || "";
}
function EmptyLoading() { return <div className="dashboardEmpty"><RefreshCw className="spin" size={18}/> Loading appointments…</div>; }
function EmptyState({ icon: Icon, title, body, action, actionText }) { return <div className="dashboardEmpty"><Icon size={25}/><strong>{title}</strong><p>{body}</p>{action && <button className="dashboardPrimaryButton" onClick={action}><Plus size={15}/>{actionText}</button>}</div>; }
function ComingSoon({ title, body, icon: Icon, action, actionText }) { return <section className="dashboardPanel dashboardRecoveryPanel"><span className="dashboardCardIcon"><Icon size={22}/></span><h2>{title}</h2><p>{body}</p><div className="dashboardRecoveryNotice"><AlertCircle size={18}/><span><strong>Backend integration required</strong><small>This menu is visible, but it is not presented as a live service yet.</small></span></div><button className="dashboardPrimaryButton" onClick={action}>{actionText}<ChevronRight size={15}/></button></section>; }
function AppointmentCard({ appointment, onCancel }) {
  const canCancel = ["pending", "confirmed"].includes(appointment.status);
  return <article className="dashboardAppointmentItem"><div className="dashboardAppointmentDate"><CalendarDays size={18}/><strong>{formatDate(appointment.date)}</strong><span><Clock3 size={13}/>{appointment.time}</span></div><div className="dashboardAppointmentInfo"><strong>{appointment.service}</strong><p><MapPin size={13}/>{appointment.mode === "online" ? "Online consultation" : "Rehabics clinic"}{appointment.notes ? ` · ${appointment.notes}` : ""}</p><span className={`dashboardStatus ${appointment.status}`}>{statusLabel(appointment.status)}</span></div>{canCancel && <button className="dashboardCancelButton" onClick={() => onCancel(appointment._id)}>Cancel</button>}</article>;
}
