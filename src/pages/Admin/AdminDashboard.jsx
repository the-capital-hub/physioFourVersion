import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity, Users, CalendarDays, CreditCard, ShieldCheck, Search,
  RefreshCw, LayoutDashboard, Stethoscope, Settings, CheckCircle2,
  AlertCircle, X, ChevronDown, ArrowUpRight, Clock3, Wallet,
  UserRound, Menu, Filter, CircleHelp, LogOut
} from "lucide-react";
import "./AdminDashboard.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const token = () =>
  localStorage.getItem("rehabics_token") ||
  sessionStorage.getItem("rehabics_token") ||
  "";

async function request(path, options = {}) {
  const authToken = token();
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(options.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || body.error || `Request failed (${response.status})`);
  }
  return body;
}

const unwrapList = (body, keys = []) => {
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  for (const key of keys) {
    if (Array.isArray(body?.[key])) return body[key];
    if (Array.isArray(body?.data?.[key])) return body.data[key];
  }
  return [];
};

const dateLabel = (value, includeTime = false) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";
  return date.toLocaleString(undefined, includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" });
};

const money = (amount, currency = "INR") => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency || "INR"} ${value.toLocaleString("en-IN")}`;
  }
};

const normalizeStatus = (value) => String(value || "pending").toLowerCase();

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState("Overview");
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [billing, setBilling] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointmentFilter, setAppointmentFilter] = useState("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [billingForm, setBillingForm] = useState({
    userId: "", amount: "", currency: "INR", description: "",
    status: "pending", type: "subscription",
  });

  const load = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setBusy(true);
    setError("");
    try {
      const [o, u, a, b] = await Promise.all([
        request("/api/admin/overview"),
        request("/api/admin/users"),
        request("/api/admin/appointments"),
        request("/api/admin/billing"),
      ]);
      setOverview(o.data || o.overview || o);
      setUsers(unwrapList(u, ["users"]));
      setAppointments(unwrapList(a, ["appointments"]));
      setBilling(unwrapList(b, ["records", "billing"]));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Unable to load admin data.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredUsers = useMemo(() => users.filter((user) => {
    const searchable = `${user.name || ""} ${user.email || ""} ${user.role || ""} ${user.phone || ""}`.toLowerCase();
    const matchesQuery = searchable.includes(query.toLowerCase().trim());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || normalizeStatus(user.status || "active") === statusFilter;
    const matchesSection = section !== "Physiotherapists" || user.role === "physiotherapist";
    return matchesQuery && matchesRole && matchesStatus && matchesSection;
  }), [users, query, roleFilter, statusFilter, section]);

  const filteredAppointments = useMemo(() => appointments.filter((item) => {
    return appointmentFilter === "all" || normalizeStatus(item.status) === appointmentFilter;
  }), [appointments, appointmentFilter]);

  const stats = useMemo(() => {
    const totalUsers = overview?.totalUsers ?? users.length;
    const physios = overview?.physiotherapists ?? users.filter((user) => user.role === "physiotherapist").length;
    const patients = overview?.patients ?? users.filter((user) => user.role === "patient").length;
    const totalAppointments = overview?.totalAppointments ?? appointments.length;
    const pendingAppointments = appointments.filter((item) => normalizeStatus(item.status) === "pending").length;
    const pendingBilling = overview?.pendingBilling ?? billing.filter((item) => normalizeStatus(item.status) === "pending").length;
    const revenue = overview?.totalRevenue ?? billing.filter((item) => normalizeStatus(item.status) === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return { totalUsers, physios, patients, totalAppointments, pendingAppointments, pendingBilling, revenue };
  }, [overview, users, appointments, billing]);

  const updateUser = async (id, status) => {
    try {
      await request(`/api/admin/users/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice("User status updated.");
      await load({ quiet: true });
    } catch (err) {
      setError(err.message || "Unable to update user status.");
    }
  };

  const updateAppointment = async (id, status) => {
    try {
      await request(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice("Appointment updated.");
      await load({ quiet: true });
    } catch (err) {
      setError(err.message || "Unable to update appointment.");
    }
  };

  const createBilling = async (event) => {
    event.preventDefault();
    try {
      await request("/api/admin/billing", {
        method: "POST",
        body: JSON.stringify({ ...billingForm, amount: Number(billingForm.amount) }),
      });
      setNotice("Billing record created. No payment was charged.");
      setBillingForm({ userId: "", amount: "", currency: "INR", description: "", status: "pending", type: "subscription" });
      await load({ quiet: true });
    } catch (err) {
      setError(err.message || "Unable to create billing record.");
    }
  };

  const logout = () => {
    localStorage.removeItem("rehabics_token");
    localStorage.removeItem("rehabics_user");
    sessionStorage.removeItem("rehabics_token");
    sessionStorage.removeItem("rehabics_user");
    navigate("/login", { replace: true });
  };

  const appointmentChart = useMemo(() => {
    const statuses = ["pending", "confirmed", "completed", "cancelled"];
    return statuses.map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      count: appointments.filter((item) => normalizeStatus(item.status) === status).length,
      status,
    }));
  }, [appointments]);

  const billingChart = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      return { key: `${date.getFullYear()}-${date.getMonth()}`, label: date.toLocaleDateString(undefined, { month: "short" }), total: 0, hasData: false };
    });
    billing.forEach((record) => {
      const rawDate = record.paidAt || record.createdAt || record.date || record.updatedAt;
      if (!rawDate || normalizeStatus(record.status) !== "paid") return;
      const date = new Date(rawDate);
      if (Number.isNaN(date.getTime())) return;
      const month = months.find((item) => item.key === `${date.getFullYear()}-${date.getMonth()}`);
      if (month) {
        month.total += Number(record.amount || 0);
        month.hasData = true;
      }
    });
    return months;
  }, [billing]);

  const nav = [
    ["Overview", LayoutDashboard],
    ["Users & Approvals", Users],
    ["Physiotherapists", Stethoscope],
    ["Appointments", CalendarDays],
    ["Payments & Subscriptions", CreditCard],
    ["Platform Settings", Settings],
  ];

  const changeSection = (name) => {
    setSection(name);
    setMobileNavOpen(false);
    setQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const exportUsers = () => {
    const rows = filteredUsers.map((user) => [
      user.name || "", user.email || "", user.phone || "", user.role || "", user.status || "active",
    ]);
    downloadCsv("rehabics-users.csv", ["Name", "Email", "Phone", "Role", "Status"], rows);
  };

  const exportAppointments = () => {
    const rows = filteredAppointments.map((item) => [
      item.patient?.name || item.patientId?.name || item.patientName || "",
      item.physiotherapist?.name || item.physiotherapistId?.name || item.physiotherapistName || "",
      item.startsAt || item.scheduledAt || item.date || "",
      item.status || "",
    ]);
    downloadCsv("rehabics-appointments.csv", ["Patient", "Physiotherapist", "Scheduled", "Status"], rows);
  };

  return (
    <div className="rehab-admin">
      <aside className={`rehab-admin-side ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="rehab-admin-brand">
          <span className="rehab-admin-mark"><Activity size={23} strokeWidth={2.5} /></span>
          <div><b>REHABICS</b><small>ADMIN CONSOLE</small></div>
          <button className="rehab-admin-close-nav" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={18} /></button>
        </div>

        <div className="rehab-admin-navlabel">WORKSPACE</div>
        <nav aria-label="Admin navigation">
          {nav.map(([label, Icon]) => (
            <button key={label} className={section === label ? "active" : ""} onClick={() => changeSection(label)}>
              <Icon size={18} />
              <span>{label}</span>
              {label === "Appointments" && stats.pendingAppointments > 0 && <em>{stats.pendingAppointments}</em>}
            </button>
          ))}
        </nav>

        <div className="rehab-admin-sidebottom">
          <span className="rehab-admin-secure-icon"><ShieldCheck size={17} /></span>
          <div className="rehab-admin-secure-copy"><b>Secure administration</b><small>Protected workspace</small></div>
        </div>
        <button className="rehab-admin-logout" onClick={logout} type="button"><LogOut size={17} /><span>Logout</span></button>
      </aside>

      <main className="rehab-admin-main">
        <header className="rehab-admin-top">
          <div className="rehab-admin-heading">
            <button className="rehab-admin-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={20} /></button>
            <div>
              <small className="rehab-admin-eyebrow">PLATFORM MANAGEMENT / {section.toUpperCase()}</small>
              <h1>{section === "Overview" ? "Command Center" : section}</h1>
              <p>{section === "Overview" ? "A clear view of your rehabilitation platform." : sectionDescription(section)}</p>
            </div>
          </div>
          <div className="rehab-admin-topactions">
            <div className="rehab-admin-sync">
              <span className={`rehab-admin-live-dot ${busy ? "is-loading" : ""}`} />
              <span>{busy ? "Syncing data" : "Platform overview"}</span>
            </div>
            <button className="rehab-admin-refresh" onClick={() => load()} disabled={busy}>
              <RefreshCw size={16} className={busy ? "rehab-admin-spin" : ""} /> <span>Refresh</span>
            </button>
          </div>
        </header>

        {error && <div className="rehab-admin-alert error" role="alert"><AlertCircle size={18} /><span>{error}</span><button aria-label="Dismiss error" onClick={() => setError("")}><X size={16} /></button></div>}
        {notice && <div className="rehab-admin-alert" role="status"><CheckCircle2 size={18} /><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice("")}><X size={16} /></button></div>}

        {section === "Overview" && (
          <>
            <section className="rehab-admin-welcome">
              <div>
                <span className="rehab-admin-kicker"><span /> LIVE PLATFORM SUMMARY</span>
                <h2>Care operations, <em>under control.</em></h2>
                <p>Monitor users, appointments and billing from one workspace.</p>
              </div>
              <div className="rehab-admin-welcome-art" aria-hidden="true"><Activity size={94} strokeWidth={1} /></div>
            </section>

            <div className="rehab-admin-sectiontitle">
              <div><h2>Platform overview</h2><p>Key metrics from your connected records</p></div>
              {lastUpdated && <span className="rehab-admin-updated"><Clock3 size={13} /> Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>}
            </div>

            <div className="rehab-admin-cards">
              <StatCard icon={Users} label="Total users" value={stats.totalUsers} detail={`${stats.patients} patients`} />
              <StatCard icon={Stethoscope} label="Physiotherapists" value={stats.physios} detail="Care professionals" />
              <StatCard icon={CalendarDays} label="Appointments" value={stats.totalAppointments} detail={`${stats.pendingAppointments} pending`} />
              <StatCard icon={Wallet} label="Pending billing" value={stats.pendingBilling} detail="Records awaiting review" />
            </div>

            <div className="rehab-admin-charts">
              <section className="rehab-admin-panel rehab-admin-chartpanel">
                <PanelHeading title="Appointment analytics" subtitle="Current appointment status breakdown" />
                <div className="rehab-admin-bars">
                  {appointmentChart.map((item) => {
                    const max = Math.max(1, ...appointmentChart.map((entry) => entry.count));
                    return <div className="rehab-admin-barrow" key={item.status}>
                      <div className="rehab-admin-barlabel"><span>{item.label}</span><b>{item.count}</b></div>
                      <div className="rehab-admin-bartrack"><span className={`status-${item.status}`} style={{ width: `${(item.count / max) * 100}%` }} /></div>
                    </div>;
                  })}
                </div>
              </section>
              <section className="rehab-admin-panel rehab-admin-chartpanel">
                <PanelHeading title="Revenue trend" subtitle="Paid billing records from the last six months" />
                {billingChart.some((item) => item.hasData) ? <div className="rehab-admin-revenuechart">
                  {billingChart.map((item) => {
                    const max = Math.max(1, ...billingChart.map((entry) => entry.total));
                    return <div className="rehab-admin-revenuecol" key={item.key} title={`${item.label}: ${money(item.total)}`}>
                      <b>{item.total > 0 ? money(item.total) : ""}</b>
                      <div className="rehab-admin-revenue-track"><span style={{ height: `${item.total > 0 ? Math.max(7, (item.total / max) * 100) : 0}%` }} /></div>
                      <small>{item.label}</small>
                    </div>;
                  })}
                </div> : <EmptyState title="No dated revenue data yet" description="Revenue bars will appear when paid billing records include a payment or creation date." />}
              </section>
            </div>

            <div className="rehab-admin-overviewgrid">
              <section className="rehab-admin-panel">
                <PanelHeading title="Recent users" subtitle="Latest accounts on your platform" action="View all users" onAction={() => changeSection("Users & Approvals")} />
                <UserTable users={users.slice(0, 5)} onStatus={updateUser} />
              </section>
              <section className="rehab-admin-panel rehab-admin-quickpanel">
                <PanelHeading title="Operations snapshot" subtitle="Current workload" />
                <div className="rehab-admin-snapshot">
                  <Snapshot icon={Users} label="Registered patients" value={stats.patients} />
                  <Snapshot icon={CalendarDays} label="Pending appointments" value={stats.pendingAppointments} />
                  <Snapshot icon={CreditCard} label="Billing records" value={billing.length} />
                </div>
                <div className="rehab-admin-quickactions">
                  <button onClick={() => changeSection("Users & Approvals")}><Users size={16} /> Manage users <ArrowUpRight size={15} /></button>
                  <button onClick={() => changeSection("Appointments")}><CalendarDays size={16} /> Review appointments <ArrowUpRight size={15} /></button>
                  <button onClick={() => changeSection("Payments & Subscriptions")}><CreditCard size={16} /> Open billing <ArrowUpRight size={15} /></button>
                </div>
              </section>
            </div>

            <section className="rehab-admin-panel">
              <PanelHeading title="Recent appointments" subtitle="Latest scheduled care sessions" action="View appointments" onAction={() => changeSection("Appointments")} />
              <AppointmentTable items={[...appointments].sort(bySchedule).slice(0, 5)} onStatus={updateAppointment} />
            </section>
          </>
        )}

        {(section === "Users & Approvals" || section === "Physiotherapists") && (
          <section className="rehab-admin-panel">
            <PanelHeading title={section} subtitle={`${filteredUsers.length} matching accounts`} action="Export CSV" onAction={exportUsers} />
            <div className="rehab-admin-toolbar">
              <label className="rehab-admin-search"><Search size={17} /><input aria-label="Search users" placeholder="Search name, email, phone or role" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌕</kbd></label>
              <label className="rehab-admin-filter"><Filter size={15} /><select aria-label="Filter by role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">All roles</option><option value="patient">Patients</option><option value="physiotherapist">Physiotherapists</option><option value="admin">Admins</option></select><ChevronDown size={14} /></label>
              <label className="rehab-admin-filter"><select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="pending">Pending</option><option value="suspended">Suspended</option></select><ChevronDown size={14} /></label>
            </div>
            <UserTable users={filteredUsers} onStatus={updateUser} />
          </section>
        )}

        {section === "Appointments" && (
          <section className="rehab-admin-panel">
            <PanelHeading title="Appointment management" subtitle={`${filteredAppointments.length} appointment records`} action="Export CSV" onAction={exportAppointments} />
            <div className="rehab-admin-toolbar">
              <label className="rehab-admin-filter"><Filter size={15} /><select aria-label="Filter appointment status" value={appointmentFilter} onChange={(event) => setAppointmentFilter(event.target.value)}><option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><ChevronDown size={14} /></label>
            </div>
            <AppointmentTable items={[...filteredAppointments].sort(bySchedule)} onStatus={updateAppointment} />
          </section>
        )}

        {section === "Payments & Subscriptions" && (
          <>
            <div className="rehab-admin-cards rehab-admin-billingcards">
              <StatCard icon={Wallet} label="Total records" value={billing.length} detail="All billing entries" />
              <StatCard icon={CheckCircle2} label="Paid records" value={billing.filter((item) => normalizeStatus(item.status) === "paid").length} detail="Marked as paid" />
              <StatCard icon={Clock3} label="Pending records" value={stats.pendingBilling} detail="Awaiting review" />
              <StatCard icon={CreditCard} label="Recorded paid value" value={money(stats.revenue)} detail="Based on paid records" compact />
            </div>
            <section className="rehab-admin-panel">
              <PanelHeading title="Create billing record" subtitle="This creates a record only. It does not charge a payment method." />
              <form className="rehab-admin-form" onSubmit={createBilling}>
                <label>User ID<input placeholder="Enter existing user ID" required value={billingForm.userId} onChange={(event) => setBillingForm({ ...billingForm, userId: event.target.value })} /></label>
                <label>Amount<input aria-label="Amount" placeholder="0.00" type="number" min="0" step="0.01" required value={billingForm.amount} onChange={(event) => setBillingForm({ ...billingForm, amount: event.target.value })} /></label>
                <label>Record type<select value={billingForm.type} onChange={(event) => setBillingForm({ ...billingForm, type: event.target.value })}><option value="subscription">Subscription</option><option value="appointment">Appointment</option><option value="refund">Refund record</option><option value="other">Other</option></select></label>
                <label>Status<select value={billingForm.status} onChange={(event) => setBillingForm({ ...billingForm, status: event.target.value })}><option value="pending">Pending</option><option value="paid">Paid</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select></label>
                <label className="rehab-admin-form-wide">Description<input placeholder="What is this record for?" required value={billingForm.description} onChange={(event) => setBillingForm({ ...billingForm, description: event.target.value })} /></label>
                <button type="submit" disabled={busy}><CreditCard size={16} /> Save billing record</button>
              </form>
            </section>
            <section className="rehab-admin-panel">
              <PanelHeading title="Billing records" subtitle={`${billing.length} records`} />
              <BillingTable records={billing} />
            </section>
          </>
        )}

        {section === "Platform Settings" && (
          <section className="rehab-admin-panel rehab-admin-settings">
            <PanelHeading title="Platform settings" subtitle="Security and operational information" />
            <div className="rehab-admin-settingrow"><span className="rehab-admin-settingicon"><ShieldCheck size={19} /></span><div><b>Role based access</b><p>Admin endpoints should remain protected by server side authentication and role middleware.</p></div><span className="rehab-admin-pill active">Protected by API</span></div>
            <div className="rehab-admin-settingrow"><span className="rehab-admin-settingicon"><Activity size={19} /></span><div><b>API connection</b><p>Frontend API base URL: <code>{API}</code></p></div><span className={`rehab-admin-pill ${error ? "failed" : "active"}`}>{error ? "Check connection" : "Configured"}</span></div>
            <div className="rehab-admin-settingrow"><span className="rehab-admin-settingicon"><CreditCard size={19} /></span><div><b>Billing integration</b><p>Billing entries are records only. A payment gateway must be integrated separately to accept real payments.</p></div><span className="rehab-admin-pill pending">Not verified</span></div>
            <div className="rehab-admin-note"><CircleHelp size={17} /> Never put JWT secrets, database credentials or payment gateway secret keys in frontend code.</div>
          </section>
        )}

        <footer className="rehab-admin-footer"><span>REHABICS <i>ADMIN</i></span><span>Secure workspace · {new Date().getFullYear()}</span></footer>
        {busy && <div className="rehab-admin-loading"><RefreshCw size={14} className="rehab-admin-spin" /> Syncing platform data…</div>}
      </main>
    </div>
  );
}

function sectionDescription(section) {
  const descriptions = {
    "Users & Approvals": "Review accounts and manage access status.",
    "Physiotherapists": "Manage registered care professionals.",
    "Appointments": "Review schedules and update session status.",
    "Payments & Subscriptions": "Review billing records and subscriptions.",
    "Platform Settings": "Review security and integration information.",
  };
  return descriptions[section] || "Manage your rehabilitation platform.";
}

function StatCard({ icon: Icon, label, value, detail, compact = false }) {
  return <article className={`rehab-admin-stat ${compact ? "is-compact" : ""}`}>
    <div className="rehab-admin-stathead"><span><Icon size={19} /></span><ArrowUpRight size={16} className="rehab-admin-stat-arrow" /></div>
    <small>{label}</small>
    <strong title={String(value)}>{value}</strong>
    <p>{detail}</p>
  </article>;
}

function PanelHeading({ title, subtitle, action, onAction }) {
  return <div className="rehab-admin-panelhead"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button onClick={onAction}>{action} <ArrowUpRight size={14} /></button>}</div>;
}

function Snapshot({ icon: Icon, label, value }) {
  return <div className="rehab-admin-snapshotrow"><span><Icon size={16} /></span><div><small>{label}</small><strong>{value}</strong></div></div>;
}

function UserTable({ users, onStatus }) {
  return <div className="rehab-admin-tablewrap"><table>
    <thead><tr><th>User</th><th>Contact</th><th>Role</th><th>Status</th><th>Access</th></tr></thead>
    <tbody>{users.map((user) => <tr key={user._id}>
      <td><div className="rehab-admin-person"><span><UserRound size={16} /></span><div><b>{user.name || "Unnamed user"}</b><small>{user._id || "No ID"}</small></div></div></td>
      <td><div className="rehab-admin-contact"><span>{user.email || "No email"}</span><small>{user.phone || "Phone not provided"}</small></div></td>
      <td><span className={`rehab-admin-role role-${normalizeStatus(user.role)}`}>{user.role || "unknown"}</span></td>
      <td><StatusPill status={user.status || "active"} /></td>
      <td><label className="rehab-admin-selectwrap"><select aria-label={`Change status for ${user.email || user.name}`} value={normalizeStatus(user.status || "active")} onChange={(event) => onStatus(user._id, event.target.value)}><option value="active">Active</option><option value="pending">Pending</option><option value="suspended">Suspended</option></select><ChevronDown size={13} /></label></td>
    </tr>)}</tbody>
  </table>{!users.length && <EmptyState title="No users found" description="Try changing your search or filters." />}</div>;
}

function AppointmentTable({ items, onStatus }) {
  return <div className="rehab-admin-tablewrap"><table>
    <thead><tr><th>Patient</th><th>Physiotherapist</th><th>Scheduled</th><th>Status</th><th>Update status</th></tr></thead>
    <tbody>{items.map((item) => <tr key={item._id}>
      <td><div className="rehab-admin-person"><span><UserRound size={16} /></span><div><b>{item.patient?.name || item.patientId?.name || item.patientName || "Patient not linked"}</b><small>Patient</small></div></div></td>
      <td>{item.physiotherapist?.name || item.physiotherapistId?.name || item.physiotherapistName || "Not assigned"}</td>
      <td>{dateLabel(item.startsAt || item.scheduledAt || item.date, true)}</td>
      <td><StatusPill status={item.status || "pending"} /></td>
      <td><label className="rehab-admin-selectwrap"><select aria-label={`Update appointment ${item._id}`} value={String(item.status || "Pending")} onChange={(event) => onStatus(item._id, event.target.value)}><option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option></select><ChevronDown size={13} /></label></td>
    </tr>)}</tbody>
  </table>{!items.length && <EmptyState title="No appointments found" description="Appointment records will appear here when available." />}</div>;
}

function BillingTable({ records }) {
  return <div className="rehab-admin-tablewrap"><table>
    <thead><tr><th>User</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
    <tbody>{records.map((record) => <tr key={record._id}>
      <td>{record.user?.name || record.userId?.name || record.userId || "Unknown user"}</td>
      <td>{record.description || "No description"}</td><td>{record.type || "Other"}</td>
      <td className="rehab-admin-amount">{money(record.amount, record.currency || "INR")}</td>
      <td><StatusPill status={record.status || "pending"} /></td><td>{dateLabel(record.createdAt)}</td>
    </tr>)}</tbody>
  </table>{!records.length && <EmptyState title="No billing records" description="Billing records will appear here when created." />}</div>;
}

function StatusPill({ status }) {
  return <span className={`rehab-admin-pill ${normalizeStatus(status)}`}>{status || "unknown"}</span>;
}

function EmptyState({ title, description }) {
  return <div className="rehab-admin-empty"><span><Search size={19} /></span><b>{title}</b><p>{description}</p></div>;
}

function bySchedule(a, b) {
  const aTime = new Date(a.startsAt || a.scheduledAt || a.date || 0).getTime();
  const bTime = new Date(b.startsAt || b.scheduledAt || b.date || 0).getTime();
  return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
}

function downloadCsv(filename, headers, rows) {
  const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
