import { Link } from "react-router-dom";
import { ADDRESS, EMAIL, MAPS_URL, PHONE, PHONE_HREF, LOCALITIES_BLR, LOCALITIES_NCR } from "../data/content";
import { LeadLink } from "./ui";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0908] border-t hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16">
        <div className="font-display uppercase text-center leading-none select-none text-stroke opacity-60" style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}>KariGhars</div>
        <div className="text-center text-[10px] tracking-[0.5em] uppercase text-[#c9a96a] -mt-2 mb-10">As Unique As You · Bangalore · Delhi NCR</div>
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <img src="images/logo.webp" alt="The KariGhars" className="h-12 w-auto brightness-0 invert mb-4" />
          <p className="text-sm text-white/60 leading-relaxed">Your home should be a true reflection of who you are. As a premium interior designer in Bangalore, we bring your vision to life through exquisitely crafted luxury spaces — from first sketch to final handover.</p>
          <p className="text-sm text-white/60 leading-relaxed mt-4">High-end style meets everyday comfort. We don't follow trends — we follow your vision.</p>
          <div className="flex gap-3 mt-5 text-xs tracking-widest uppercase">
            <a className="border hairline px-3 py-2 hover:bg-[#c9a96a] hover:text-black transition" href="https://www.instagram.com/the_karighars/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="border hairline px-3 py-2 hover:bg-[#c9a96a] hover:text-black transition" href="https://www.facebook.com/thekarighars/" target="_blank" rel="noreferrer">Facebook</a>
            <a className="border hairline px-3 py-2 hover:bg-[#c9a96a] hover:text-black transition" href="https://www.linkedin.com/company/the-karighars/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="border hairline px-3 py-2 hover:bg-[#c9a96a] hover:text-black transition" href="https://www.youtube.com/user/thekarighars1" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a96a] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/experience-center" className="hover:text-[#c9a96a]">Our Experience Center</Link></li>
            <li><Link to="/news-media" className="hover:text-[#c9a96a]">News &amp; Media</Link></li>
            <li><Link to="/contact" className="hover:text-[#c9a96a]">Contact Us</Link></li>
            <li><Link to="/blog" className="hover:text-[#c9a96a]">Blogs</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#c9a96a]">Portfolio</Link></li>
            <li><Link to="/gallery" className="hover:text-[#c9a96a]">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-[#c9a96a]">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a96a] mb-4">Bangalore</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {LOCALITIES_BLR.map((l) => <li key={l}><Link to="/contact" className="hover:text-[#c9a96a]">Interior Designers in {l}</Link></li>)}
          </ul>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a96a] mt-6 mb-3">Delhi NCR</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {LOCALITIES_NCR.map((l) => <li key={l}><Link to="/contact" className="hover:text-[#c9a96a]">Interior Designers in {l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a96a] mb-4">Reach Us</h4>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-[#c9a96a] leading-relaxed block">{ADDRESS}</a>
          <a href={PHONE_HREF} className="block mt-4 font-display text-2xl text-white hover:text-[#c9a96a]">{PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="block text-sm text-white/70 hover:text-[#c9a96a] mt-1">{EMAIL}</a>
          <LeadLink className="inline-block mt-5 bg-[#c9a96a] text-black px-6 py-3 text-[11px] tracking-[0.25em] uppercase">Book Consultation</LeadLink>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-white/40">
          <span>© 2026 The KariGhars. All rights reserved.</span>
          <span className="flex gap-4"><Link to="/contact" className="hover:text-white">Privacy Policy</Link><Link to="/contact" className="hover:text-white">Terms &amp; Conditions</Link></span>
        </div>
      </div>
      {/* floating actions */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a href="https://api.whatsapp.com/send?phone=+917022725656&text=I%20am%20looking%20for%20your%20interiors" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full bg-[#25D366] text-white grid place-items-center text-xl shadow-xl hover:scale-110 transition">✆</a>
        <a href={PHONE_HREF} aria-label="Call" className="w-12 h-12 rounded-full bg-[#c9a96a] text-black grid place-items-center text-xl shadow-xl hover:scale-110 transition">☎</a>
      </div>
    </footer>
  );
}
