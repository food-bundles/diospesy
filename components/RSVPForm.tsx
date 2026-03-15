'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  attending: string;
  events: string[];
  has_plusone: string;
  p1_first: string;
  p1_last: string;
  p1_rel: string;
  p1_phone: string;
  p1_diet: string;
  dep_city: string;
  arr_date: string;
  arr_time: string;
  accom: string;
  visa: string;
  nationality: string;
  passport_exp: string;
  dietary: string[];
  message: string;
}

const EVENTS = [
  { value: 'yacht', label: ' Cultural Evening on Yacht', detail: '13 June · 18:00–23:00 · Behry Square' },
  { value: 'church', label: ' Catholic Ceremony', detail: '14 June · 14:00–15:30 · St. Catherine Cathedral' },
  { value: 'reception', label: ' Wedding Reception', detail: '14 June · 16:00–Late · Sunrise Alex Avenue' },
  { value: 'afterparty', label: ' After Party', detail: '14 June · Late Night · Sunrise Alex Avenue' },
];

const DIETARY_OPTIONS = [
  { value: 'vegan', label: 'Vegan' },
  { value: 'halal', label: 'Halal' },
  { value: 'gluten_free', label: 'Gluten-free' },
  { value: 'none', label: 'No restrictions' },
];

/* Reusable field label matching .fg label */
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-[Cinzel,'Palatino_Linotype',serif] text-[0.6rem] tracking-[0.22em] uppercase text-w-700 mb-2">
      {children}
      {required && <span className="text-red-600 ml-0.5">*</span>}
    </label>
  );
}

/* Section header matching .f-hdr */
function SectionHeader({ num, children, sub }: { num: string; children: React.ReactNode; sub?: boolean }) {
  return (
    <div className="flex items-center gap-[0.7rem] mb-5 pb-2 border-b border-form-section font-[Cormorant_Garamond,'Georgia',serif] text-[1.38rem] font-light text-dark-bg">
      <span
        className={`font-[Cinzel,'Palatino_Linotype',serif] text-[0.65rem] text-w-accent border border-w-300 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          sub ? 'bg-w-100' : 'bg-form-highlight'
        }`}
      >
        {num}
      </span>
      {children}
    </div>
  );
}

/* Shared input/select/textarea classes matching .fg input */
const inputCls =
  'w-full px-4 py-[0.82rem] border border-form-border rounded-[3px] font-[Lato,sans-serif] text-[0.9rem] font-light text-w-950 bg-form-bg transition-all focus:outline-none focus:border-w-accent focus:ring-[3px] focus:ring-w-accent/10';

/* Radio / checkbox row matching .ri / .ci */
function ChoiceRow({
  selected,
  onClick,
  type = 'radio',
  name,
  value,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  type?: 'radio' | 'checkbox';
  name: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <label
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer text-[0.88rem] text-w-950 px-[0.95rem] py-[0.6rem] border rounded-[3px] transition-all leading-snug ${
        selected
          ? 'border-w-accent bg-form-highlight'
          : 'border-form-border bg-form-bg hover:border-w-accent hover:bg-form-highlight'
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={selected}
        onChange={() => {}}
        className="accent-w-accent w-[14px] h-[14px] flex-shrink-0"
      />
      {children}
    </label>
  );
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    first_name: '', last_name: '', email: '', phone: '',
    attending: '', events: [], has_plusone: '',
    p1_first: '', p1_last: '', p1_rel: '', p1_phone: '', p1_diet: '',
    dep_city: '', arr_date: '', arr_time: '',
    accom: '', visa: '', nationality: '', passport_exp: '',
    dietary: [], message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: string, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    // Auto-submit when attending = no and name + contact are filled
    if (
      name === 'attending' &&
      value === 'no' &&
      updated.first_name &&
      updated.last_name &&
      updated.email &&
      updated.phone
    ) {
      submitForm(updated);
    }
  };

  const toggleMulti = (name: 'events' | 'dietary', value: string) =>
    setFormData(prev => {
      const cur = prev[name];
      return { ...prev, [name]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
    });

  const submitForm = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error ?? 'Something went wrong. Please try again.');
      else setSubmitted(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(formData);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="max-w-[700px] mx-auto px-8 py-20 bg-white">
        <div className="text-center p-[2.8rem_1.5rem] bg-gradient-to-br from-form-highlight to-w-200 border border-w-300 rounded-[6px] mt-4">
          <div className="text-[2.2rem] mb-3">✓</div>
          <h3 className="font-[Cormorant_Garamond,'Georgia',serif] text-[1.85rem] font-light text-dark-bg mb-2">
            Thank You!
          </h3>
          <p className="text-w-900 text-[0.9rem] leading-[1.75]">
            {formData.attending === 'no'
              ? <>We’re sorry you won’t be able to make it, <strong>{formData.first_name}</strong>. Your response has been noted and we’ll be thinking of you on the day.</>
              : <>Your RSVP has been received. A confirmation email will be sent to{' '}<strong>{formData.email}</strong>. We look forward to celebrating with you on 14 June 2026 in Alexandria!</>}
          </p>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="max-w-[700px] mx-auto px-8 py-8 bg-white">
      {/* Page heading */}
      <p className="font-[Cinzel,'Palatino_Linotype',serif] text-[0.6rem] tracking-[0.42em] uppercase text-w-700 mb-3 flex items-center gap-3 after:content-['']  after:h-px after:bg-w-700 after:opacity-45">
        RSVP &amp; Logistics
      </p>
      <h2 className="font-[Cormorant_Garamond,'Georgia',serif] text-[clamp(1.8rem,4.5vw,2.7rem)] font-light leading-[1.2] text-dark-bg mb-5">
        Confirm Your <em className="italic text-w-700">Attendance</em>
      </h2>

      {/* Deadline box */}
      <div className="flex items-center gap-4 bg-gradient-to-br from-form-highlight-deep to-w-200 border-l-[3px] border-w-accent px-[1.4rem] py-[0.95rem] mb-9 text-[0.86rem] text-w-900 rounded-r-[4px] leading-[1.7]">
        <CalendarDays />
        <div>
          <strong className="text-w-700">
            Response deadline: 15 days from today.
          </strong>{" "}
          A copy of your full response will be emailed to you automatically.
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* ── STEP 1: Name ── */}
        <div>
          <SectionHeader num="1">Your Name</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <FieldLabel required>First Name</FieldLabel>
              <input
                className={inputCls}
                type="text"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleInput}
              />
            </div>
            <div>
              <FieldLabel required>Last Name</FieldLabel>
              <input
                className={inputCls}
                type="text"
                name="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <hr className="border-none border-t border-form-section my-7" />

        {/* ── STEP 2: Contact ── */}
        <div>
          <SectionHeader num="2">Your Contact Details</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <FieldLabel required>Email Address</FieldLabel>
              <input
                className={inputCls}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <FieldLabel required>Phone / WhatsApp</FieldLabel>
              <input
                className={inputCls}
                type="tel"
                name="phone"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <hr className="border-none border-t border-form-section my-7" />

        {/* ── STEP 3: Attendance ── */}
        <div>
          <SectionHeader num="3">Will You Attend?</SectionHeader>
          <div className="flex flex-col gap-2 mb-6">
            {[
              { value: "yes", label: "✓ Yes — I will be there!" },
              { value: "no", label: "✗ Unfortunately I cannot attend" },
              { value: "maybe", label: "? Not sure yet — I will confirm soon" },
            ].map((opt) => (
              <ChoiceRow
                key={opt.value}
                selected={formData.attending === opt.value}
                onClick={() => handleSelect("attending", opt.value)}
                name="attending"
                value={opt.value}
              >
                {opt.label}
              </ChoiceRow>
            ))}
          </div>
        </div>

        {/* ── STEP 4–10: only shown when attending yes/maybe ── */}
        {formData.attending !== "no" && (
          <>
            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 4: Events ── */}
            <div>
              <SectionHeader num="4">
                Which Events Will You Attend?
              </SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.55rem] mb-6">
                {EVENTS.map((ev) => (
                  <label
                    key={ev.value}
                    onClick={() => toggleMulti("events", ev.value)}
                    className={`flex items-start gap-[0.65rem] border rounded-[3px] p-[0.8rem] cursor-pointer transition-all ${
                      formData.events.includes(ev.value)
                        ? "border-w-accent bg-form-highlight shadow-[0_0_0_1px_var(--amber-accent)]"
                        : "border-form-border bg-form-bg hover:border-w-accent hover:bg-form-highlight"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="events"
                      value={ev.value}
                      checked={formData.events.includes(ev.value)}
                      onChange={() => {}}
                      className="accent-w-accent mt-[3px] flex-shrink-0"
                    />
                    <div>
                      <div className="font-normal text-[0.85rem] text-dark-bg">
                        {ev.label}
                      </div>
                      <div className="text-[0.72rem] text-w-900 mt-[2px]">
                        {ev.detail}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 5: +1 ── */}
            <div>
              <SectionHeader num="5">
                Are You Bringing a Guest? (+1)
              </SectionHeader>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  { value: "yes", label: "Yes, I will bring a guest" },
                  { value: "no", label: "No, I will attend alone" },
                ].map((opt) => (
                  <ChoiceRow
                    key={opt.value}
                    selected={formData.has_plusone === opt.value}
                    onClick={() => handleSelect("has_plusone", opt.value)}
                    name="has_plusone"
                    value={opt.value}
                  >
                    {opt.label}
                  </ChoiceRow>
                ))}
              </div>
            </div>

            {/* ── STEP 5b: Guest Details ── */}
            {formData.has_plusone === "yes" && (
              <>
                <hr className="border-none border-t border-form-section my-7" />
                <div>
                  <SectionHeader num="+" sub>
                    Your Guest's Details
                  </SectionHeader>
                  <div className="bg-form-highlight border border-w-300 rounded-[4px] p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <FieldLabel required>Guest First Name</FieldLabel>
                        <input
                          className={inputCls}
                          type="text"
                          name="p1_first"
                          placeholder="First name"
                          value={formData.p1_first}
                          onChange={handleInput}
                        />
                      </div>
                      <div>
                        <FieldLabel required>Guest Last Name</FieldLabel>
                        <input
                          className={inputCls}
                          type="text"
                          name="p1_last"
                          placeholder="Last name"
                          value={formData.p1_last}
                          onChange={handleInput}
                        />
                      </div>
                      <div>
                        <FieldLabel required>Relationship to you</FieldLabel>
                        <Select
                          onValueChange={(v) => handleSelect("p1_rel", v)}
                          value={formData.p1_rel}
                        >
                          <SelectTrigger className={inputCls + " h-auto"}>
                            <SelectValue placeholder="— Select —" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Spouse / Partner",
                              "Fiancé(e)",
                              "Parent",
                              "Brother / Sister",
                              "Son / Daughter",
                              "Friend",
                              "Colleague",
                              "Other",
                            ].map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <FieldLabel>Guest Phone</FieldLabel>
                        <input
                          className={inputCls}
                          type="tel"
                          name="p1_phone"
                          placeholder="+1 234 567 890"
                          value={formData.p1_phone}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Guest Dietary Requirements</FieldLabel>
                      <input
                        className={inputCls}
                        type="text"
                        name="p1_diet"
                        placeholder="e.g. vegetarian, halal, none"
                        value={formData.p1_diet}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <p className="text-[0.78rem] text-muted-gold italic mt-2">
                    Please fill in your guest's name and relationship to
                    continue.
                  </p>
                </div>
              </>
            )}

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 6: Travel ── */}
            <div>
              <SectionHeader num="6">Travel &amp; Arrival</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <FieldLabel required>Departure City / Country</FieldLabel>
                  <input
                    className={inputCls}
                    type="text"
                    name="dep_city"
                    placeholder="Departure City / Country "
                    value={formData.dep_city}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <FieldLabel>Planned Arrival Date in Egypt</FieldLabel>
                  <input
                    className={inputCls}
                    type="date"
                    name="arr_date"
                    min="2026-06-10"
                    max="2026-06-15"
                    value={formData.arr_date}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-6">
                <FieldLabel>Preferred Arrival Time</FieldLabel>
                <Select
                  onValueChange={(v) => handleSelect("arr_time", v)}
                  value={formData.arr_time}
                >
                  <SelectTrigger className={inputCls + " h-auto"}>
                    <SelectValue placeholder="— Select —" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Morning (before 12:00)",
                      "Afternoon (12:00–18:00)",
                      "Evening (18:00–22:00)",
                      "Night (after 22:00)",
                      "Flexible",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 7: Accommodation ── */}
            <div>
              <SectionHeader num="7">Accommodation</SectionHeader>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  {
                    value: "sunrise",
                    label:
                      "Yes — I'd like to stay at Sunrise Alex Avenue Hotel",
                  },
                  {
                    value: "other",
                    label: "Yes — please recommend another hotel nearby",
                  },
                  { value: "no", label: "No — I have my own arrangements" },
                ].map((opt) => (
                  <ChoiceRow
                    key={opt.value}
                    selected={formData.accom === opt.value}
                    onClick={() => handleSelect("accom", opt.value)}
                    name="accom"
                    value={opt.value}
                  >
                    {opt.label}
                  </ChoiceRow>
                ))}
              </div>
            </div>

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 8: Visa ── */}
            <div>
              <SectionHeader num="8">Visa &amp; Entry into Egypt</SectionHeader>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  {
                    value: "yes",
                    label: "Yes — I need a visa and would appreciate help",
                  },
                  {
                    value: "evisa",
                    label: "I can apply for an e-Visa myself but want guidance",
                  },
                  {
                    value: "no",
                    label: "No — I don't need a visa / I already have one",
                  },
                  {
                    value: "unsure",
                    label: "Unsure — please contact me with information",
                  },
                ].map((opt) => (
                  <ChoiceRow
                    key={opt.value}
                    selected={formData.visa === opt.value}
                    onClick={() => handleSelect("visa", opt.value)}
                    name="visa"
                    value={opt.value}
                  >
                    {opt.label}
                  </ChoiceRow>
                ))}
              </div>
            </div>

            {/* ── STEP 8b: Passport ── */}
            {(formData.visa === "yes" || formData.visa === "evisa") && (
              <>
                <hr className="border-none border-t border-form-section my-7" />
                <div>
                  <SectionHeader num="+" sub>
                    Passport Details
                  </SectionHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div>
                      <FieldLabel required>
                        Nationality / Passport Country
                      </FieldLabel>
                      <input
                        className={inputCls}
                        type="text"
                        name="nationality"
                        placeholder="e.g. Rwandan, Canadian"
                        value={formData.nationality}
                        onChange={handleInput}
                      />
                    </div>
                    <div>
                      <FieldLabel>Passport Expiry (approx.)</FieldLabel>
                      <input
                        className={inputCls}
                        type="date"
                        name="passport_exp"
                        min="2026-12-01"
                        value={formData.passport_exp}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 9: Dietary ── */}
            <div>
              <SectionHeader num="9">Dietary Requirements</SectionHeader>
              <p className="text-[0.88rem] text-w-950 mb-3">
                Select all that apply
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {DIETARY_OPTIONS.map((opt) => (
                  <ChoiceRow
                    key={opt.value}
                    type="checkbox"
                    selected={formData.dietary.includes(opt.value)}
                    onClick={() => toggleMulti("dietary", opt.value)}
                    name="dietary"
                    value={opt.value}
                  >
                    {opt.label}
                  </ChoiceRow>
                ))}
              </div>
            </div>

            <hr className="border-none border-t border-form-section my-7" />

            {/* ── STEP 10: Message + Submit ── */}
            <div className=''>
              <SectionHeader num="10">Final Message</SectionHeader>
              <div className="mb-2">
                <textarea
                  className={inputCls + " resize-y min-h-[80px]"}
                  name="message"
                  placeholder="A message for Dioscore & Specy (optional)"
                  value={formData.message}
                  onChange={handleInput}
                />
              </div>
              {error && (
                <p className="text-[0.82rem] text-red-600 bg-red-50 border border-red-200 rounded-[3px] px-4 py-3 mb-3">
                  {error}
                </p>
              )}
              <div className="flex w-full items center justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-4 lg:px-4 bg-gradient-to-br from-w-800 to-w-accent text-white border-none rounded-full font-[Cinzel,'Palatino_Linotype',serif] text-[0.60rem] tracking-[0.28em] uppercase cursor-pointer font-semibold mt-2 transition-all hover:opacity-[0.88] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {submitting ? "Sending..." : "Submit Your RSVP"}
                </button>
              </div>
              <p className="text-center text-[0.76rem] text-w-900 mt-[0.9rem] italic leading-[1.6]">
                By submitting, you confirm your attendance and details. A
                confirmation email will be sent to your inbox.
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
