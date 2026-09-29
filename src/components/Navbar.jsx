import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NAV, PHONE, PHONE_HREF, WHATSAPP } from "../data/content";
import { LeadLink } from "./ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Lock background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0e0c0a]/92 backdrop-blur-xl border-b hairline" : "bg-gradient-to-b from-black/75 to-transparent"}`}>
        <div className="block text-center text-[10px] tracking-[0.3em] uppercase text-[#e9d5a3]/90 bg-black/50 backdrop-blur border-b border-white/5 py-1.5 px-3">
          <span className="hidden md:inline">Luxury Lifestyle Awards Winner · New York — </span><LeadLink className="underline underline-offset-4 hover:text-white">Book Your Free Consultation</LeadLink>
        </div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3">
            <img src="images/logo.webp" alt="The KariGhars" className="h-9 md:h-11 w-auto brightness-0 invert" />
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-xl tracking-wide">The KariGhars</div>
              <div className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96a]">As Unique As You</div>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-5 text-[13px] tracking-wide">
            <a href={PHONE_HREF} className="text-[#c9a96a] hover:text-white">{PHONE}</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="border border-[#c9a96a]/50 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:bg-[#c9a96a] hover:text-black transition">WhatsApp</a>
            <LeadLink className="bg-[#c9a96a] text-black px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#e9d5a3] transition">Free Consultation</LeadLink>
            <button onClick={() => setOpen(true)} className="ml-2 flex flex-col gap-1.5 p-2" aria-label="Open menu">
              <span className="w-8 h-px bg-white" /><span className="w-8 h-px bg-white" /><span className="w-5 h-px bg-[#c9a96a]" />
            </button>
          </div>
          <button onClick={() => setOpen(true)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
            <span className="w-8 h-px bg-white" /><span className="w-8 h-px bg-white" /><span className="w-5 h-px bg-[#c9a96a]" />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#14110d] border-l hairline overflow-y-auto transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b hairline">
            <span className="font-display text-2xl">Menu</span>
            <button onClick={close} aria-label="Close menu" className="text-3xl leading-none px-2 hover:text-[#c9a96a]">×</button>
          </div>
          <nav className="p-6">
            {NAV.map((n) => (
              n.to ? (
                <Link key={n.label} to={n.to} onClick={close} className="flex items-baseline gap-4 py-3 border-b border-white/5 hover:pl-2 transition-all group">
                  <span className="text-[11px] text-[#c9a96a] font-display">{n.n}</span>
                  <span className="font-display text-2xl uppercase tracking-wide group-hover:text-[#c9a96a] transition">{n.label}</span>
                </Link>
              ) : (
                <a key={n.label} href={n.href} target="_blank" rel="noreferrer" className="flex items-baseline gap-4 py-3 border-b border-white/5 hover:pl-2 transition-all group">
                  <span className="text-[11px] text-[#c9a96a] font-display">{n.n}</span>
                  <span className="font-display text-2xl uppercase tracking-wide group-hover:text-[#c9a96a] transition">{n.label}</span>
                </a>
              )
            ))}
          </nav>
          <div className="p-6 space-y-3">
            <a href={PHONE_HREF} className="block text-center bg-[#c9a96a] text-black py-3 text-xs tracking-[0.25em] uppercase">{PHONE}</a>
            <LeadLink onDone={close} className="block text-center border border-[#c9a96a]/60 py-3 text-xs tracking-[0.25em] uppercase">Book Free Consultation</LeadLink>
          </div>
        </aside>
      </div>
    </>
  );
}
