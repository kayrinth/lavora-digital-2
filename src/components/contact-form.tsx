"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { ArrowRight } from "./icons";
import type { Dictionary } from "@/lib/dictionaries";

const FIELD =
  "h-12 w-full rounded-full border border-line bg-background px-5 text-[13.5px] text-ink outline-none transition placeholder:text-muted focus:border-ink";

export function ContactForm({ t }: { t: Dictionary["form"] }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(
    sendEnquiry,
    { ok: false },
  );

  // The action returns a code, not a sentence, so the wording stays with the locale.
  const errors = {
    required: t.errorRequired,
    email: t.errorEmail,
    send: t.errorSend,
  };

  if (state.ok) {
    return (
      <div
        role="status"
        className="mx-auto max-w-lg rounded-[24px] border border-line bg-background px-6 py-12 text-center"
      >
        <p className="text-[20px] font-semibold tracking-tight">{t.successTitle}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form action={action} className="mx-auto max-w-xl text-start">
      {/* Honeypot: hidden from people, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[12px] text-muted">{t.name}</span>
          <input name="name" required maxLength={120} className={FIELD} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[12px] text-muted">{t.email}</span>
          <input
            name="email"
            type="email"
            dir="ltr"
            required
            maxLength={200}
            className={`${FIELD} text-start`}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-[12px] text-muted">{t.company}</span>
          <input name="company" maxLength={160} className={FIELD} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-[12px] text-muted">{t.message}</span>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={4000}
          className={`${FIELD} h-auto rounded-[20px] py-3.5 leading-relaxed`}
        />
      </label>

      {state.error && (
        <p role="alert" className="mt-4 text-[12.5px] text-red-600">
          {errors[state.error]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[13px] font-medium text-white transition duration-300 hover:bg-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? t.sending : t.submit}
        {!pending && <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />}
      </button>
    </form>
  );
}
