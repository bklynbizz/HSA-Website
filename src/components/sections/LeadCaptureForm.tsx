"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback, type FormEvent } from "react";

/* ---------- Shared Types ---------- */

export interface LeadFormData {
  address: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  condition: string;
  timeline: string;
  motivation: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
}

interface LeadCaptureFormProps {
  variant?: "full" | "compact" | "inline";
  onSubmit: (data: LeadFormData) => void | Promise<void>;
  className?: string;
}

const initialFormData: LeadFormData = {
  address: "",
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  sqft: "",
  condition: "",
  timeline: "",
  motivation: "",
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
};

/* ---------- Select Options ---------- */

const propertyTypeOptions = [
  { value: "single-family", label: "Single Family Home" },
  { value: "townhouse", label: "Townhouse" },
  { value: "condo", label: "Condo" },
  { value: "multi-family", label: "Multi-Family" },
  { value: "mobile-home", label: "Mobile Home" },
  { value: "land", label: "Vacant Land" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
];

const bedroomOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
];

const bathroomOptions = [
  { value: "1", label: "1" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3+", label: "3+" },
];

const conditionOptions = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "needs-work", label: "Needs Work" },
  { value: "major-repairs", label: "Major Repairs Needed" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "1-month", label: "Within a month" },
  { value: "2-3-months", label: "2-3 months" },
  { value: "flexible", label: "Flexible / Just exploring" },
];

const contactMethodOptions = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
];

/* ---------- Step Slide Animation ---------- */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ---------- Full Multi-Step Form ---------- */

function FullForm({
  onSubmit,
  className,
}: {
  onSubmit: (data: LeadFormData) => void | Promise<void>;
  className?: string;
}) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<LeadFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 4;

  const update = useCallback(
    (field: keyof LeadFormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [errors]
  );

  const validateStep = (): boolean => {
    const e: Partial<Record<keyof LeadFormData, string>> = {};
    if (step === 0) {
      if (!data.address.trim()) e.address = "Property address is required";
      if (!data.propertyType) e.propertyType = "Select a property type";
    }
    if (step === 3) {
      if (!data.name.trim()) e.name = "Name is required";
      if (!data.phone.trim()) e.phone = "Phone number is required";
      if (!data.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Enter a valid email";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {["Property", "Details", "Timeline", "Contact"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (i < step) {
                  setDirection(-1);
                  setStep(i);
                }
              }}
              className={cn(
                "text-xs font-medium transition-colors",
                i <= step ? "text-primary" : "text-text-muted",
                i < step && "cursor-pointer hover:text-secondary"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="h-2 w-full rounded-full bg-bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-secondary"
            initial={false}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="relative overflow-hidden min-h-[220px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <Input
                  label="Property Address"
                  placeholder="123 Main St, City, State ZIP"
                  value={data.address}
                  onChange={(e) => update("address", e.target.value)}
                  error={errors.address}
                />
                <SelectField
                  label="Property Type"
                  placeholder="Select type"
                  options={propertyTypeOptions}
                  value={data.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                  error={errors.propertyType}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Bedrooms"
                    placeholder="Beds"
                    options={bedroomOptions}
                    value={data.bedrooms}
                    onChange={(e) => update("bedrooms", e.target.value)}
                  />
                  <SelectField
                    label="Bathrooms"
                    placeholder="Baths"
                    options={bathroomOptions}
                    value={data.bathrooms}
                    onChange={(e) => update("bathrooms", e.target.value)}
                  />
                </div>
                <Input
                  label="Approximate Sq. Ft."
                  type="number"
                  placeholder="e.g. 1500"
                  value={data.sqft}
                  onChange={(e) => update("sqft", e.target.value)}
                />
                <SelectField
                  label="Property Condition"
                  placeholder="Select condition"
                  options={conditionOptions}
                  value={data.condition}
                  onChange={(e) => update("condition", e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <SelectField
                  label="How quickly do you need to sell?"
                  placeholder="Select timeline"
                  options={timelineOptions}
                  value={data.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                />
                <Textarea
                  label="What's motivating your sale? (optional)"
                  placeholder="Tell us a bit about your situation..."
                  value={data.motivation}
                  onChange={(e) => update("motivation", e.target.value)}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  error={errors.phone}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@email.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                />
                <SelectField
                  label="Preferred Contact Method"
                  placeholder="How should we reach you?"
                  options={contactMethodOptions}
                  value={data.contactMethod}
                  onChange={(e) => update("contactMethod", e.target.value)}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={prev}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < totalSteps - 1 ? (
          <Button
            type="button"
            onClick={next}
            className="bg-secondary text-primary hover:bg-secondary-light font-semibold"
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            loading={submitting}
            className="bg-secondary text-primary hover:bg-secondary-light font-semibold"
          >
            Get My Cash Offer
          </Button>
        )}
      </div>
    </form>
  );
}

/* ---------- Compact Form ---------- */

function CompactForm({
  onSubmit,
  className,
}: {
  onSubmit: (data: LeadFormData) => void | Promise<void>;
  className?: string;
}) {
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof LeadFormData, string>> = {};
    if (!data.address.trim()) errs.address = "Address is required";
    if (!data.phone.trim()) errs.phone = "Phone is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full space-y-4", className)} noValidate>
      <Input
        label="Property Address"
        placeholder="123 Main St, City, State ZIP"
        value={data.address}
        onChange={(e) => setData((d) => ({ ...d, address: e.target.value }))}
        error={errors.address}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        value={data.phone}
        onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
        error={errors.phone}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@email.com"
        value={data.email}
        onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
        error={errors.email}
      />
      <Button
        type="submit"
        size="lg"
        loading={submitting}
        className="w-full bg-secondary text-primary hover:bg-secondary-light font-semibold"
      >
        Get My Cash Offer
      </Button>
    </form>
  );
}

/* ---------- Inline Form ---------- */

function InlineForm({
  onSubmit,
  className,
}: {
  onSubmit: (data: LeadFormData) => void | Promise<void>;
  className?: string;
}) {
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof LeadFormData, string>> = {};
    if (!data.address.trim()) errs.address = "Address is required";
    if (!data.phone.trim()) errs.phone = "Phone is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full flex flex-col sm:flex-row gap-3", className)}
      noValidate
    >
      <div className="flex-1">
        <Input
          placeholder="Property address"
          value={data.address}
          onChange={(e) => setData((d) => ({ ...d, address: e.target.value }))}
          error={errors.address}
        />
      </div>
      <div className="sm:w-44">
        <Input
          type="tel"
          placeholder="Phone number"
          value={data.phone}
          onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
          error={errors.phone}
        />
      </div>
      <Button
        type="submit"
        loading={submitting}
        className="bg-secondary text-primary hover:bg-secondary-light font-semibold whitespace-nowrap px-6"
      >
        Get Offer
      </Button>
    </form>
  );
}

/* ---------- Main Export ---------- */

export function LeadCaptureForm({
  variant = "full",
  onSubmit,
  className,
}: LeadCaptureFormProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {variant === "full" && <FullForm onSubmit={onSubmit} />}
      {variant === "compact" && <CompactForm onSubmit={onSubmit} />}
      {variant === "inline" && <InlineForm onSubmit={onSubmit} />}
    </motion.div>
  );
}
