import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";
import { profileData } from "../../data/profile";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { submitWeb3Forms } from "../../lib/api";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while request is processing
    if (status === "loading") return;

    // Honeypot spam check - silently handle bots
    if (botcheck) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    // Field-level client validation
    if (!trimmedName || trimmedName.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }
    if (trimmedName.length > 80) {
      setStatus("error");
      setErrorMessage("Name must be under 80 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    if (!trimmedSubject || trimmedSubject.length < 3) {
      setStatus("error");
      setErrorMessage("Please enter a subject (at least 3 characters).");
      return;
    }
    if (trimmedSubject.length > 120) {
      setStatus("error");
      setErrorMessage("Subject must be under 120 characters.");
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a message (at least 10 characters).");
      return;
    }
    if (trimmedMessage.length > 3000) {
      setStatus("error");
      setErrorMessage("Message is too long (maximum 3000 characters).");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await submitWeb3Forms({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        botcheck
      });

      if (response.success) {
        setStatus("success");
        // Reset the form only after successful submission
        setFormData({ name: "", email: "", subject: "", message: "" });
        setBotcheck(false);
      } else {
        setStatus("error");
        setErrorMessage(response.message || "Failed to submit message. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "Could not transmit your message right now. Please check your connection or email directly!"
      );
    }
  };

  return (
    <section id="contact" className="relative z-40 py-20 md:py-28 overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,rgba(242,13,69,0.1)_0%,rgba(5,5,7,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="CONTACT"
          description="Have an AI/ML opportunity, project collaboration, or question? Send a note below or reach out directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Direct Inquiries Column */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal delay={0.1}>
              <div className="glass-panel p-6 sm:p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5F1F2] mb-5">
                  Direct Inquiries
                </h3>
                <div className="space-y-4 text-sm">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[rgba(242,13,69,0.1)] border border-transparent hover:border-[rgba(255,75,112,0.3)] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[rgba(242,13,69,0.15)] text-[#FF315B] flex items-center justify-center shrink-0 border border-[rgba(242,13,69,0.3)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#74676D]">
                        EMAIL
                      </span>
                      <span className="font-medium text-[#F5F1F2] group-hover:text-[#FF315B] transition-colors break-all">
                        {profileData.email}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[rgba(25,12,18,0.5)] border border-[rgba(255,75,112,0.15)]">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(242,13,69,0.15)] text-[#FF315B] flex items-center justify-center shrink-0 border border-[rgba(242,13,69,0.3)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#74676D]">
                        LOCATION
                      </span>
                      <span className="font-medium text-[#F5F1F2]">
                        {profileData.location} &middot; India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[rgba(255,75,112,0.18)]">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#74676D] block mb-3">
                    PROFILES &amp; CODE:
                  </span>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={profileData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-wider text-[#FF315B] hover:underline inline-flex items-center gap-1"
                    >
                      GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[rgba(255,75,112,0.3)]">&bull;</span>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-wider text-[#FF315B] hover:underline inline-flex items-center gap-1"
                    >
                      LINKEDIN <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Web3Forms Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="glass-panel p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Web3Forms Official Honeypot Anti-Spam Field */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={status === "loading"}
                        maxLength={80}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(255,75,112,0.22)] bg-[#160B10] text-[#F5F1F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#F20D45] focus:border-[#F20D45] focus:shadow-[0_0_15px_rgba(242,13,69,0.3)] transition-all placeholder-[#74676D] min-h-[44px] disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2"
                      >
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === "loading"}
                        maxLength={254}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[rgba(255,75,112,0.22)] bg-[#160B10] text-[#F5F1F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#F20D45] focus:border-[#F20D45] focus:shadow-[0_0_15px_rgba(242,13,69,0.3)] transition-all placeholder-[#74676D] min-h-[44px] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2"
                    >
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      disabled={status === "loading"}
                      maxLength={120}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="AI Internship / Project Collaboration / Inquiry"
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(255,75,112,0.22)] bg-[#160B10] text-[#F5F1F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#F20D45] focus:border-[#F20D45] focus:shadow-[0_0_15px_rgba(242,13,69,0.3)] transition-all placeholder-[#74676D] min-h-[44px] disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A79BA0] mb-2"
                    >
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      disabled={status === "loading"}
                      maxLength={3000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details regarding the role, timeline, or architecture..."
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(255,75,112,0.22)] bg-[#160B10] text-[#F5F1F2] text-sm focus:outline-none focus:ring-2 focus:ring-[#F20D45] focus:border-[#F20D45] focus:shadow-[0_0_15px_rgba(242,13,69,0.3)] transition-all placeholder-[#74676D] resize-y disabled:opacity-50"
                    />
                  </div>

                  {/* Status Alerts */}
                  {status === "success" && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 text-sm animate-in fade-in"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <p className="font-bold uppercase tracking-wider text-xs">Message Sent Successfully</p>
                        <p className="text-xs mt-0.5 text-emerald-300/90">
                          Thank you for reaching out! Punith will review your inquiry and reply soon.
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-950/40 border border-[#F20D45]/40 text-rose-300 flex items-start gap-3 text-sm animate-in fade-in"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 text-[#FF315B] mt-0.5" />
                      <div>
                        <p className="font-bold uppercase tracking-wider text-xs">Submission Notice</p>
                        <p className="text-xs mt-0.5 text-rose-300/90">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button Centered */}
                  <div className="pt-2 flex justify-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto px-10 min-h-[48px]"
                      icon={
                        status === "loading" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {status === "loading" ? "TRANSMITTING..." : "SEND MESSAGE"}
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
