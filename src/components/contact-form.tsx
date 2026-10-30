"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { ArrowRight } from "./icons";
import type { Dictionary } from "@/lib/dictionaries";

const LABEL = "mb-2 block text-sm font-semibold";

export function ContactForm({ t }: { t: Dictionary["form"] }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { ok: false });

  // The action returns a code, not a sentence, so the wording stays with the locale.
  const errors = { required: t.errorRequired, email: t.errorEmail, send: t.errorSend };

  const req = (
    <span aria-hidden className="text-brand">
      {" "}
      *
    </span>
  );

  if (state.ok) {
    return (
      <div role="status" className="mx-auto max-w-lg py-8 text-center">
        <p className="display text-head">{t.successTitle}</p>
        <p className="mt-4 text-lead text-dim">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5 text-start sm:grid-cols-2">
      {/* Honeypot: hidden from people, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <label>
        <span className={LABEL}>
          {t.name}
          {req}
        </span>
        <input name="name" required maxLength={120} autoComplete="name" className="field" />
      </label>
      <label>
        <span className={LABEL}>
          {t.email}
          {req}
        </span>
        <input
          name="email"
          type="email"
          dir="ltr"
          required
          maxLength={200}
          autoComplete="email"
          className="field text-start"
        />
      </label>
      <label className="sm:col-span-2">
        <span className={LABEL}>{t.company}</span>
        <input name="company" maxLength={160} autoComplete="organization" className="field" />
      </label>
      <label className="sm:col-span-2">
        <span className={LABEL}>
          {t.message}
          {req}
        </span>
        <textarea name="message" required rows={5} maxLength={4000} className="field h-auto resize-y py-3" />
      </label>

      <div className="sm:col-span-2">
        {state.error && (
          <p role="alert" className="mb-4 text-sm font-semibold text-brand">
            {errors[state.error]}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="btn btn-dark h-auto min-h-12 w-full py-3 text-center whitespace-normal disabled:opacity-60"
        >
          {pending ? t.sending : t.submit}
          {!pending && <ArrowRight className="size-4" />}
        </button>
      </div>
    </form>
  );
}
