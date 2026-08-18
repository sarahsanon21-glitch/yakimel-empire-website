"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [ticketNumber, setTicketNumber] = useState("");

  function openWidget() {
    setOpen(true);
    setStatus("idle");
  }

  function closeWidget() {
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send");
      }

      setTicketNumber(data.ticketNumber);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      <button onClick={openWidget} className="bg-brand text-white font-medium px-8 py-4 rounded-full hover:bg-brand-dark transition-colors">
        Start a Conversation
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 px-4 pb-4 md:pb-0">
          <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl text-left">
            <div className="bg-bg-dark text-ink-invert px-6 py-4 flex items-center justify-between">
              <span className="font-display font-bold">Send us a message</span>
              <button onClick={closeWidget} className="text-dim-invert hover:text-ink-invert transition-colors text-sm">
                Close
              </button>
            </div>

            {status === "sent" ? (
              <div className="p-6 text-center">
                <p className="font-display font-bold text-lg text-ink mb-2">Message sent</p>
                <p className="text-dim text-sm leading-relaxed mb-2">
                  Your ticket number is <span className="font-mono text-brand">{ticketNumber}</span>.
                </p>
                <p className="text-dim text-sm leading-relaxed mb-6">
                  A confirmation has been sent to your email. Our team will respond within 24-48 business hours.
                </p>
                <button onClick={closeWidget} className="font-mono text-xs uppercase tracking-widest text-brand hover:text-brand-dark transition-colors">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                  aria-hidden="true"
                />

                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-dim mb-1">Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ color: "#0B1220" }}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-dim mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: "#0B1220" }}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-dim mb-1">Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    style={{ color: "#0B1220" }}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-brand text-white font-medium py-3 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}