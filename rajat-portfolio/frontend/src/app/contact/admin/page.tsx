"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ContactSubmissionRecord, fetchContactSubmissions } from "../../../lib/api";
import { logUiEvent } from "../../../lib/frontendLogger";

type Theme = "light" | "dark";

export default function ContactAdminPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [records, setRecords] = useState<ContactSubmissionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Contact admin page.`,
    [],
  );

  const loadSubmissions = async (submittedPassword: string) => {
    setIsLoading(true);
    setError(null);
    setInfo(null);

    try {
      const response = await fetchContactSubmissions(submittedPassword, {
        name: nameFilter.trim() || undefined,
        email: emailFilter.trim() || undefined,
        company: companyFilter.trim() || undefined,
        dateFrom: dateFromFilter || undefined,
        dateTo: dateToFilter || undefined,
        limit: 200,
      });

      setIsAuthenticated(true);
      setRecords(response.items);
      setInfo(`Loaded ${response.total} contact submissions.`);
      logUiEvent("contact_admin_fetch_success", { total: response.total });
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to load contacts.";
      setError(message);
      setRecords([]);
      setIsAuthenticated(false);
      logUiEvent("contact_admin_fetch_failed", { error: message });
    } finally {
      setIsLoading(false);
    }
  };

  const onUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    logUiEvent("contact_admin_unlock_attempt");
    await loadSubmissions(password.trim());
  };

  const onApplyFilters = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setError("Please unlock first.");
      return;
    }
    await loadSubmissions(password.trim());
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setRecords([]);
    setInfo(null);
    setError(null);
    logUiEvent("contact_admin_logout_clicked");
  };

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      <div className="layout-container relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="portfolio-glass mb-8 flex items-center justify-between rounded-xl border border-[var(--glass-border)] px-6 py-4"
          initial={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-xl font-bold text-[var(--text-main)]">Contact Admin</h1>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--primary)]">Protected Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--text-muted)]"
                onClick={onLogout}
                type="button"
              >
                Logout
              </button>
            ) : null}
            <button
              className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              type="button"
            >
              <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
            </button>
          </div>
        </motion.header>

        {!isAuthenticated ? (
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="portfolio-glass-card mx-auto w-full max-w-md rounded-2xl border border-white/10 p-6"
            initial={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="mb-2 text-lg font-semibold text-[var(--text-main)]">Enter Admin Password</h2>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              This route only reveals contact submissions after password verification.
            </p>
            <form className="space-y-4" onSubmit={onUnlock}>
              <input
                className="block w-full rounded-lg border border-white/10 bg-[var(--input-bg)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-placeholder)]"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                type="password"
                value={password}
              />
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button
                className="w-full rounded-lg bg-[var(--cream-active)] px-4 py-3 text-sm font-semibold text-[var(--cream-text)] disabled:opacity-70"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Verifying..." : "Unlock Contacts"}
              </button>
            </form>
          </motion.section>
        ) : (
          <section className="space-y-6">
            <form
              className="portfolio-glass-card grid gap-3 rounded-2xl border border-white/10 p-5 md:grid-cols-3"
              onSubmit={onApplyFilters}
            >
              <input
                className="rounded-lg border border-white/10 bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-main)]"
                onChange={(event) => setNameFilter(event.target.value)}
                placeholder="Filter by name"
                type="text"
                value={nameFilter}
              />
              <input
                className="rounded-lg border border-white/10 bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-main)]"
                onChange={(event) => setEmailFilter(event.target.value)}
                placeholder="Filter by email"
                type="text"
                value={emailFilter}
              />
              <input
                className="rounded-lg border border-white/10 bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-main)]"
                onChange={(event) => setCompanyFilter(event.target.value)}
                placeholder="Filter by company"
                type="text"
                value={companyFilter}
              />
              <input
                className="rounded-lg border border-white/10 bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-main)]"
                onChange={(event) => setDateFromFilter(event.target.value)}
                type="date"
                value={dateFromFilter}
              />
              <input
                className="rounded-lg border border-white/10 bg-[var(--input-bg)] px-3 py-2 text-sm text-[var(--text-main)]"
                onChange={(event) => setDateToFilter(event.target.value)}
                type="date"
                value={dateToFilter}
              />
              <button
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading..." : "Apply Filters"}
              </button>
            </form>

            {info ? <p className="text-sm text-emerald-300">{info}</p> : null}
            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <div className="portfolio-glass-card overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-[var(--text-main)]">
                  {records.length > 0 ? (
                    records.map((record) => (
                      <tr key={record.id}>
                        <td className="whitespace-nowrap px-4 py-3">
                          {new Date(record.created_at).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{record.name}</td>
                        <td className="whitespace-nowrap px-4 py-3">{record.email}</td>
                        <td className="whitespace-nowrap px-4 py-3">{record.company || "-"}</td>
                        <td className="max-w-xl px-4 py-3">
                          <p className="line-clamp-3" title={record.message}>
                            {record.message}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-6 text-sm text-[var(--text-muted)]" colSpan={5}>
                        No contact submissions match current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <footer className="mt-auto pt-8 text-center">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
