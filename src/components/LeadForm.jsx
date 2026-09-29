import { useState } from "react";
import { Eyebrow } from "./ui";
import { WHATSAPP } from "../data/content";

export default function LeadForm({ id = "lead-form" }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", project: "3 BHK - Starts at 35 Lakhs*", pname: "", location: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const msg = `Hi KariGhars, I am ${form.name} (${form.phone}, ${form.email}). Project: ${form.project}, Name: ${form.pname}, Location: ${form.location}. Please book my free consultation.`;
    window.open(`https://api.whatsapp.com/send?phone=+917022725656&text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div id={id} className="premium-card p-6 md:p-10 relative overflow-hidden scroll-mt-28">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a96a] to-transparent" />
      <Eyebrow>Luxury Made Easy</Eyebrow>
      <h3 className="font-display text-3xl md:text-4xl leading-tight">Get Instant Quotes <span className="italic gold-text">with No Hidden Fees</span></h3>
      {sent ? (
        <div className="mt-6 border border-[#c9a96a]/40 bg-[#c9a96a]/10 p-6 text-center">
          <div className="font-display text-2xl mb-2">Thank you, {form.name.split(" ")[0] || "friend"}.</div>
          <p className="text-white/70 text-sm">Your enquiry has opened in WhatsApp. Our design expert will reach out shortly. Or call <a className="text-[#c9a96a]" href="tel:+917022725656">+91 7022725656</a>.</p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-block mt-4 bg-[#c9a96a] text-black px-6 py-3 text-[11px] tracking-[0.25em] uppercase">Chat Again</a>
        </div>
      ) : (
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 mt-6">
          <input required value={form.name} onChange={set("name")} placeholder="Full Name" className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] placeholder:text-white/35" />
          <input required value={form.phone} onChange={set("phone")} placeholder="Phone No" pattern="[0-9+ ]{10,15}" className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] placeholder:text-white/35" />
          <input required type="email" value={form.email} onChange={set("email")} placeholder="E-mail" className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] placeholder:text-white/35" />
          <select value={form.project} onChange={set("project")} className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] text-white/80">
            <option>3 BHK - Starts at 35 Lakhs*</option>
            <option>4 BHK - Starts at 45 Lakhs*</option>
            <option>Villa - Starts at 50 Lakhs &amp; Above*</option>
          </select>
          <input value={form.pname} onChange={set("pname")} placeholder="Project Name" className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] placeholder:text-white/35" />
          <input value={form.location} onChange={set("location")} placeholder="Your Project Location" className="bg-black/40 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#c9a96a] placeholder:text-white/35" />
          <button className="md:col-span-2 bg-[#c9a96a] text-black py-4 text-[12px] tracking-[0.3em] uppercase font-medium hover:bg-[#e9d5a3] transition">Book A Free Consultation →</button>
          <p className="md:col-span-2 text-[11px] text-white/40 text-center">By submitting, you agree to be contacted over call / WhatsApp / email.</p>
        </form>
      )}
    </div>
  );
}
