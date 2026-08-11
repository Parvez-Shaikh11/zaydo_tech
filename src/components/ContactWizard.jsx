import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, HelpCircle, Send,
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

const STEPS = [
  { n: 1, label: 'What you need' },
  { n: 2, label: 'The project' },
  { n: 3, label: 'Your business' },
  { n: 4, label: 'How to reach you' },
];

const projectTypes = [
  ...servicesData.map((s) => ({
    id: s.short,
    title: s.short,
    desc: s.tagline,
    icon: s.icon,
    accent: s.accent,
  })),
  {
    id: 'Not sure yet',
    title: 'Not sure yet',
    desc: 'You have a problem but not a solution — that is a fine place to start.',
    icon: HelpCircle,
    accent: '#94A3B8',
  },
];

const EMPTY = {
  projectType: '',
  projectDescription: '',
  currentProblem: '',
  desiredOutcome: '',
  existingSystem: '',
  companyName: '',
  industry: '',
  website: '',
  name: '',
  email: '',
  phone: '',
  contactMethod: 'Email',
};

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 46 : -46 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -46 : 46 }),
};

export default function ContactWizard() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onChange = (e) => {
    const { name, value } = e.target;
    set({ [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (step === 1 && !form.projectType) {
      next.projectType = 'Pick the closest match — you can change direction later.';
    }
    if (step === 2) {
      if (!form.projectDescription.trim())
        next.projectDescription = 'Tell us what you are trying to build or improve.';
      if (!form.currentProblem.trim())
        next.currentProblem = 'Describe what is currently manual, slow or breaking.';
    }
    if (step === 3) {
      if (!form.companyName.trim()) next.companyName = 'Company name is required.';
      if (!form.industry.trim()) next.industry = 'Industry helps us understand the context.';
    }
    if (step === 4) {
      if (!form.name.trim()) next.name = 'Your name is required.';
      if (!form.email.trim()) next.email = 'An email address is required.';
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'That email does not look valid.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const move = (delta) => {
    if (delta > 0 && !validate()) return;
    setDirection(delta);
    setStep((s) => s + delta);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // No backend is wired up yet — the intake is captured client-side and the
    // confirmation states only what we can actually commit to.
    setSubmitted(true);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  if (submitted) return <Confirmation form={form} />;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* ------------------------------------------------------- progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
            Step {String(step).padStart(2, '0')} of 04
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyanic-400">
            {STEPS[step - 1].label}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyanic-400"
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {STEPS.map((s) => (
            <span
              key={s.n}
              className={`font-mono text-[0.55rem] uppercase tracking-[0.14em] transition-colors ${
                s.n <= step ? 'text-muted' : 'text-faint/50'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="surface rounded-3xl p-6 sm:p-9">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <StepShell
                title="What do you need?"
                subtitle="Pick the closest match. If none of them fit, the last option is a perfectly good answer."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    const selected = form.projectType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          set({ projectType: type.id });
                          setErrors((e) => ({ ...e, projectType: '' }));
                        }}
                        className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                          selected
                            ? 'border-cyanic-400/60 bg-cyanic-400/[0.07]'
                            : 'border-line/[0.09] bg-line/[0.02] hover:border-brand-500/35'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                            style={{
                              borderColor: `${type.accent}44`,
                              background: `${type.accent}14`,
                              color: type.accent,
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <AnimatePresence>
                            {selected && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-cyanic-400 text-canvas"
                              >
                                <Check className="h-3 w-3" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <p className="mt-3 text-[0.86rem] font-bold text-ink">{type.title}</p>
                        <p className="mt-1 text-[0.74rem] leading-snug text-faint">{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
                <FieldError error={errors.projectType} />
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                title="Tell us about the project"
                subtitle="The more concrete this is, the more useful our first reply will be."
              >
                <div className="space-y-5">
                  <Field
                    as="textarea"
                    rows={3}
                    label="What are you trying to build or improve?"
                    name="projectDescription"
                    value={form.projectDescription}
                    onChange={onChange}
                    error={errors.projectDescription}
                    placeholder="e.g. A system where our field team logs jobs and the office can see status without phoning them."
                    required
                  />
                  <Field
                    as="textarea"
                    rows={2}
                    label="What is the current problem?"
                    name="currentProblem"
                    value={form.currentProblem}
                    onChange={onChange}
                    error={errors.currentProblem}
                    placeholder="What is manual, slow, duplicated or error-prone right now?"
                    required
                  />
                  <Field
                    as="textarea"
                    rows={2}
                    label="What would a good outcome look like?"
                    name="desiredOutcome"
                    value={form.desiredOutcome}
                    onChange={onChange}
                    placeholder="e.g. No more re-typing job sheets; stock levels correct within a minute."
                  />
                  <Field
                    label="Systems you already use"
                    name="existingSystem"
                    value={form.existingSystem}
                    onChange={onChange}
                    placeholder="e.g. Excel, Tally, a CRM, an old internal tool"
                  />
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                title="Your business"
                subtitle="Context that helps us judge scale, constraints and regulatory considerations."
              >
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Company name"
                      name="companyName"
                      value={form.companyName}
                      onChange={onChange}
                      error={errors.companyName}
                      placeholder="Your organisation"
                      required
                    />
                    <Field
                      label="Industry"
                      name="industry"
                      value={form.industry}
                      onChange={onChange}
                      error={errors.industry}
                      placeholder="e.g. Logistics, Healthcare, Retail"
                      required
                    />
                  </div>
                  <Field
                    label="Company website"
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    placeholder="https://example.com"
                  />
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell
                title="How should we reach you?"
                subtitle="A person reads this — there is no autoresponder sequence behind it."
              >
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      error={errors.name}
                      placeholder="First and last name"
                      required
                    />
                    <Field
                      label="Email address"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      error={errors.email}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Phone number"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Optional"
                    />
                    <div>
                      <label
                        htmlFor="contactMethod"
                        className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted"
                      >
                        Preferred contact method
                      </label>
                      <select
                        id="contactMethod"
                        name="contactMethod"
                        value={form.contactMethod}
                        onChange={onChange}
                        className="w-full cursor-pointer rounded-xl px-4 py-3 text-[0.84rem]"
                      >
                        <option value="Email">Email</option>
                        <option value="Phone">Phone call</option>
                      </select>
                    </div>
                  </div>
                </div>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ------------------------------------------------------ controls */}
        <div className="mt-9 flex items-center justify-between border-t border-line/[0.08] pt-7">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => move(-1)}
              className="group inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button type="button" onClick={() => move(1)} className="btn btn-ghost !py-3">
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary !py-3.5">
              Send project details
              <Send className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ pieces */

function StepShell({ title, subtitle, children }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-ink sm:text-2xl">{title}</h3>
      <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{subtitle}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Field({ as = 'input', label, name, error, required, className = '', ...rest }) {
  const Tag = as;
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted"
      >
        {label}
        {required && <span className="ml-1 text-cyanic-400">*</span>}
      </label>
      <Tag
        id={name}
        name={name}
        className={`w-full rounded-xl px-4 py-3 text-[0.84rem] leading-relaxed ${
          error ? '!border-rose-400/60' : ''
        } ${className}`}
        {...rest}
      />
      <FieldError error={error} />
    </div>
  );
}

function FieldError({ error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 font-mono text-[0.68rem] text-rose-400"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Confirmation({ form }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="surface relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl p-8 text-center sm:p-14"
    >
      <div
        aria-hidden
        className="halo"
        style={{
          width: '24rem',
          height: '24rem',
          top: '-10rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16,185,129,0.18)',
        }}
      />

      <div className="relative">
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-400/10 text-emerald-400"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.span>

        <h3 className="mt-7 text-2xl font-extrabold text-ink sm:text-3xl">
          Your project details are captured
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-[0.9rem] leading-relaxed text-muted">
          Thank you, <span className="font-semibold text-ink">{form.name}</span>. We have your
          enquiry about <span className="font-semibold text-cyanic-400">{form.projectType}</span>{' '}
          for <span className="font-semibold text-ink">{form.companyName}</span>.
        </p>

        <div className="mx-auto mt-9 max-w-md border-t border-line/[0.08] pt-8 text-left">
          <h4 className="eyebrow mb-5 text-faint">What happens next</h4>
          <ul className="space-y-4">
            {[
              'An engineer — not a sales assistant — reads what you wrote and forms a view on it.',
              `We reply by ${form.contactMethod.toLowerCase()} with our initial read on the problem and what we would want to understand next.`,
              'If we are not the right fit for this, we will tell you that plainly rather than book a call.',
            ].map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-start gap-3 text-[0.84rem] leading-relaxed text-muted"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-line/10 bg-line/[0.04] font-mono text-[0.6rem] text-cyanic-400">
                  {i + 1}
                </span>
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
