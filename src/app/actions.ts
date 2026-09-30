"use server";

import { Resend } from "resend";

/** A code, not a sentence: the wording belongs to whichever locale is rendering. */
export type EnquiryError = "required" | "email" | "send";
export type EnquiryState = { ok: boolean; error?: EnquiryError };

const MAX = { name: 120, email: 200, company: 160, message: 4000 };

function field(data: FormData, key: keyof typeof MAX) {
  return String(data.get(key) ?? "").trim().slice(0, MAX[key]);
}

export async function sendEnquiry(
  _prev: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  // Honeypot: a real person never fills a hidden field, a bot fills everything.
  if (String(data.get("website") ?? "")) return { ok: true };

  const name = field(data, "name");
  const email = field(data, "email");
  const company = field(data, "company");
  const message = field(data, "message");

  if (!name || !email || !message) {
    return { ok: false, error: "required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "email" };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.error("sendEnquiry: RESEND_API_KEY or CONTACT_TO is not set");
    return { ok: false, error: "send" };
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? "La Vora Digital <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("sendEnquiry:", error);
    return { ok: false, error: "send" };
  }

  return { ok: true };
}
