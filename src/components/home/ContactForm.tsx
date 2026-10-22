"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";
import { OWNER_PROFILE } from "@/lib/constants";

const PROJECT_TYPES = [
  "Business Website",
  "E-Commerce Store",
  "Web Application / SaaS",
  "Custom Software / POS System",
  "Other / Direct Consultation",
];

export function ContactForm() {
  const [formLoadedAt, setFormLoadedAt] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick check
    if (!name.trim() || name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a brief message (at least 10 characters).");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          message: message.trim(),
          honeypot,
          formLoadedAt,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setStatus("error");
        setErrorMessage(
          data?.error || "Failed to send your inquiry. Please try reaching out directly via WhatsApp or Email."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network connection error. Please check your connection or reach out on WhatsApp.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectType(PROJECT_TYPES[0]);
    setMessage("");
    setHoneypot("");
    setStatus("idle");
    setErrorMessage("");
    setFormLoadedAt(Date.now());
  };

  return (
    <div className="w-full rounded-2xl border border-[#CBD5E1] dark:border-white/15 bg-white dark:bg-[#0B1220] p-6 sm:p-8 shadow-card overflow-hidden">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#CBD5E1] dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[#475569] dark:text-[#94A3B8] tracking-wider uppercase">
            DISPATCH_MESSAGE.TS
          </span>
        </div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1] dark:bg-white/20" />
        </div>
      </div>

      {status === "success" ? (
        <div id="contact-success-card" role="status" className="py-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">
            Inquiry Dispatched Successfully!
          </h3>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#0F172A] dark:text-white">{name}</strong>. Your message was securely delivered to Hamza Barki. You will receive a direct reply to{" "}
            <strong className="text-[#0F172A] dark:text-white">{email}</strong> within 24 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#CBD5E1] dark:border-white/20 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold text-[#0F172A] dark:text-white transition-all active:scale-[0.98]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
            <a
              href={OWNER_PROFILE.contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-[#0B1F38] hover:bg-brand-yellow-hover text-xs font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              <span>Chat Immediately on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Honeypot hidden input (Spam protection) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="website_hp">Leave this field blank</label>
            <input
              type="text"
              id="website_hp"
              name="website_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] tracking-wider uppercase mb-1.5"
            >
              NAME //
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              disabled={status === "submitting"}
              placeholder="Your name or company"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5FD6] dark:focus:ring-[#7DB4FF] transition-all disabled:opacity-60"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] tracking-wider uppercase mb-1.5"
            >
              EMAIL //
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              disabled={status === "submitting"}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5FD6] dark:focus:ring-[#7DB4FF] transition-all disabled:opacity-60"
            />
          </div>

          {/* Project Type Field */}
          <div>
            <label
              htmlFor="contact-project-type"
              className="block font-mono text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] tracking-wider uppercase mb-1.5"
            >
              PROJECT TYPE //
            </label>
            <select
              id="contact-project-type"
              name="projectType"
              disabled={status === "submitting"}
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5FD6] dark:focus:ring-[#7DB4FF] transition-all disabled:opacity-60"
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type} className="bg-white dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-message"
                className="font-mono text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] tracking-wider uppercase"
              >
                MESSAGE //
              </label>
              <span className="text-[10px] font-mono text-[#94A3B8]">
                {message.length} / 3000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              disabled={status === "submitting"}
              placeholder="Describe your vision, timeline, and requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0F1A2E] text-[#0F172A] dark:text-white placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D5FD6] dark:focus:ring-[#7DB4FF] transition-all disabled:opacity-60 resize-y min-h-[100px]"
            />
          </div>

          {/* Error Message Alert */}
          {status === "error" && (
            <div
              role="alert"
              className="p-3.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="text-[11px] opacity-90">
                  Alternative: You can message Hamza directly on{" "}
                  <a
                    href={OWNER_PROFILE.contacts.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    WhatsApp
                  </a>{" "}
                  or send an{" "}
                  <a href={OWNER_PROFILE.contacts.mailto} className="underline font-bold">
                    Email
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Submit Button - Capsule Shape */}
          <div className="pt-2">
            <button
              id="contact-submit-btn"
              type="submit"
              disabled={status === "submitting"}
              className="w-full min-h-[48px] h-12 inline-flex items-center justify-center gap-2 px-6 rounded-full bg-[#0F172A] hover:bg-[#1E293B] dark:bg-[#E6EDF7] dark:hover:bg-white text-white dark:text-[#0F172A] text-sm font-bold font-mono tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5FD6] dark:focus-visible:ring-[#7DB4FF] disabled:opacity-60 active:scale-[0.98]"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>[ TRANSMITTING INQUIRY... ]</span>
                </>
              ) : (
                <>
                  <span>[ TRANSMIT INQUIRY ]</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
