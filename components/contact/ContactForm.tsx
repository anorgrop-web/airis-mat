"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/legal";

const SUBJECTS = [
  "Question about my order",
  "Shipping or tracking",
  "Refund or return",
  "Product question",
  "Wholesale / partnership",
  "Other",
] as const;

const MESSAGE_MAX = 3000;

const field =
  "mt-1.5 w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/70 " +
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
const label = "text-sm font-semibold text-foreground";

/**
 * Contact form. Until a backend is connected it opens the visitor's email app
 * with the message pre-filled, so nothing is lost.
 * TODO: post to an email API (e.g. Resend / SendGrid) via app/api/contact/route.ts and remove the mailto fallback.
 */
export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field; humans never see this one
    if (data.get("website")) return;

    const name = String(data.get("name") ?? "");
    const fromEmail = String(data.get("email") ?? "");
    const order = String(data.get("order") ?? "");
    const subject = String(data.get("subject") ?? "");

    const body = [
      `Name: ${name}`,
      `Email: ${fromEmail}`,
      order ? `Order number: ${order}` : null,
      "",
      message,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const href = `mailto:${COMPANY.supportEmail}?subject=${encodeURIComponent(
      `[${COMPANY.brand}] ${subject}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="c-name" className={label}>
          Your name
        </label>
        <input id="c-name" name="name" type="text" required autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="c-email" className={label}>
          Your email
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      <div>
        <label htmlFor="c-order" className={label}>
          Order number <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="c-order" name="order" type="text" className={field} placeholder="e.g. #1234" />
        <p className="mt-1.5 text-xs text-muted">If your question is about an order, this helps us answer faster.</p>
      </div>

      <div>
        <label htmlFor="c-subject" className={label}>
          Subject
        </label>
        <select id="c-subject" name="subject" required defaultValue={SUBJECTS[0]} className={field}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="c-message" className={label}>
            Message
          </label>
          <span className="text-xs text-muted">
            {message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="c-message"
          name="message"
          required
          rows={6}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
        />
      </div>

      {/* Honeypot — hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-[220px]">
        Send message
      </Button>

      {sent && (
        <p className="text-sm text-muted" role="status">
          Your email app should open with the message ready to send. If it didn’t, write to us directly at{" "}
          <a href={`mailto:${COMPANY.supportEmail}`} className="font-medium text-primary-dark underline-offset-4 hover:underline">
            {COMPANY.supportEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
