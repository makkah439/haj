"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const fields = [
  {
    id: "name",
    label: "الاسم",
    type: "text",
    autoComplete: "name",
    required: true,
    placeholder: "الاسم بالكامل",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.3 3.1-6 7-6s7 2.7 7 6"
        />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "رقم الهاتف",
    type: "tel",
    autoComplete: "tel",
    required: true,
    placeholder: "01xxxxxxxxx",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h.75a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L5.963 3.852a1.125 1.125 0 0 0-1.091-.852H3.5A1.25 1.25 0 0 0 2.25 4.25v2.5Z"
        />
      </svg>
    ),
  },
  {
    id: "email",
    label: "البريد الإلكتروني (اختياري)",
    type: "email",
    autoComplete: "email",
    required: false,
    placeholder: "example@email.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm2.4-.75 6.6 5.5 6.6-5.5"
        />
      </svg>
    ),
  },
] as const;

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    if (!siteConfig.isWhatsAppEnabled || !siteConfig.whatsappNumber) {
      setState("error");
      setFeedback(
        "التواصل عبر واتساب غير متاح حاليًا، يرجى الاتصال بنا مباشرة.",
      );
      return;
    }

    const message = `السلام عليكم،\nالاسم: ${payload.name}\nالهاتف: ${payload.phone}${payload.email ? `\nالبريد الإلكتروني: ${payload.email}` : ""}\nالاستفسار: ${payload.message}`;
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setState("sent");
    setFeedback("سيتم فتح واتساب لإرسال استفسارك مباشرة.");
    form.reset();
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-sm">
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--color-gold)]/10 blur-2xl"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center py-10 text-center"
          >
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.1,
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 13 4 4L19 7"
                />
              </svg>
            </m.div>
            <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-primary)]">
              تم استلام رسالتك
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-7 text-[color:var(--color-muted)]">
              {feedback}
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-6 rounded-full border border-[color:var(--color-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--color-primary)] transition hover:bg-[color:var(--color-ivory)]"
            >
              إرسال رسالة أخرى
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative space-y-4"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block text-sm font-medium text-[color:var(--color-text)]"
                >
                  {field.label}
                </label>
                <div className="group relative">
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)] transition-colors group-focus-within:text-[color:var(--color-gold)]">
                    {field.icon}
                  </span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] py-3 pl-4 pr-12 transition focus:border-[color:var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]/20"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text)]"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="min-h-32 w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 transition focus:border-[color:var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]/20"
                placeholder="اكتب استفسارك هنا"
              />
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className="group relative w-full overflow-hidden rounded-full bg-[color:var(--color-primary)] px-6 py-3.5 font-semibold text-white transition hover:bg-[color:var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                {state === "submitting" ? (
                  <>
                    <span
                      className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                    جارٍ الإرسال...
                  </>
                ) : (
                  <>
                    إرسال الاستفسار
                    <span
                      className="inline-block transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    >
                      ←
                    </span>
                  </>
                )}
              </span>
            </button>

            {state === "error" && feedback ? (
              <p role="status" className="text-sm font-medium text-red-600">
                {feedback}
              </p>
            ) : null}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
