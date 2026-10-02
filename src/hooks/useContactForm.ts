import { useState, type FormEvent } from "react";

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * REPLACE: point this at your chosen form/email service.
 * Works out of the box with any service that accepts a POST of
 * form fields and returns a 2xx on success — e.g. Formspree,
 * Getform, or a custom serverless function.
 * Set VITE_CONTACT_FORM_ENDPOINT in a .env file.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(v: ContactFormValues) {
    const next: Partial<ContactFormValues> = {};
    if (!v.name.trim()) next.name = "Enter your name.";
    if (!v.email.trim()) next.email = "Enter your email.";
    else if (!emailRegex.test(v.email)) next.email = "Enter a valid email address.";
    if (!v.subject.trim()) next.subject = "Enter a subject.";
    if (!v.message.trim() || v.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    return next;
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent, honeypot: string) {
    e.preventDefault();
    if (honeypot) return; // basic bot trap — silently drop

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      if (!ENDPOINT) {
        // No endpoint configured yet — surface a clear error instead of pretending to succeed.
        throw new Error("Contact form endpoint not configured.");
      }
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submission failed.");
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return { values, errors, status, updateField, handleSubmit, setStatus };
}
