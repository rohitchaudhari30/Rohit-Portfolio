import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Loader2, MapPin, Phone } from "lucide-react";
import { personal } from "@/data/personal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/common/SocialLinks";
import { useContactForm } from "@/hooks/useContactForm";

const fieldClass =
  "w-full rounded-md border border-ink-border bg-ink-900 px-4 py-2.5 text-sm text-paper-100 placeholder:text-paper-500 transition-colors duration-200 focus:border-signal-dim focus:outline-none";

export default function Contact() {
  const { values, errors, status, updateField, handleSubmit } = useContactForm();
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  async function copyEmail() {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeading
          index="07"
          label="contact"
          title="Get In Touch"
          description="Have a role, project, or question in mind? I'd like to hear from you."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="flex w-full items-center justify-between gap-3 rounded-md border border-ink-border bg-ink-800 px-5 py-4 text-left transition-colors duration-200 hover:border-signal-dim"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} className="text-signal" />
                <span className="text-sm text-paper-200">{personal.email}</span>
              </span>
              {copied ? <Check size={16} className="text-signal" /> : <Copy size={16} className="text-paper-500" />}
            </button>

            {personal.phone && (
              <a
                href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 rounded-md border border-ink-border bg-ink-800 px-5 py-4 transition-colors duration-200 hover:border-signal-dim"
              >
                <Phone size={18} className="text-signal" />
                <span className="text-sm text-paper-200">{personal.phone}</span>
              </a>
            )}

            <div className="flex items-center gap-3 rounded-md border border-ink-border bg-ink-800 px-5 py-4">
              <MapPin size={18} className="text-signal" />
              <span className="text-sm text-paper-200">{personal.location}</span>
            </div>

            <div className="pt-2">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-paper-500">Find me elsewhere</p>
              <SocialLinks />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            onSubmit={(e) => handleSubmit(e, honeypot)}
            noValidate
            className="space-y-4"
          >
            {/* Honeypot field — hidden from real users, catches basic bots */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-paper-400">Name</label>
                <input
                  id="name"
                  className={fieldClass}
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-paper-400">Email</label>
                <input
                  id="email"
                  type="email"
                  className={fieldClass}
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs text-paper-400">Subject</label>
              <input
                id="subject"
                className={fieldClass}
                value={values.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && <p id="subject-error" className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs text-paper-400">Message</label>
              <textarea
                id="message"
                rows={5}
                className={fieldClass}
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p id="message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : null}
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <p role="status" className="text-sm text-emerald-400">Message sent — I'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                {import.meta.env.VITE_CONTACT_FORM_ENDPOINT
                  ? "Something went wrong sending your message. Please try again or email me directly."
                  : "The contact form isn't connected to an email service yet — see README for setup, or email me directly."}
              </p>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
