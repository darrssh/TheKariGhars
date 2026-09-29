import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Reveal({ children, delay = 0, y = 36, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, center = false }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-10 bg-[#c9a96a]" />
      <span className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#c9a96a]">{children}</span>
      {center && <span className="h-px w-10 bg-[#c9a96a]" />}
    </div>
  );
}

// Numbered editorial section head — makes every section feel distinct
export function SectionHead({ index, eyebrow, title, desc, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <div className={`flex items-end gap-5 ${center ? "justify-center" : ""}`}>
          <span className="section-index text-stroke-gold select-none">{index}</span>
          <div className="pb-2">
            <Eyebrow center={center}>{eyebrow}</Eyebrow>
            <h2 className="headline-lg max-w-3xl">{title}</h2>
          </div>
        </div>
        {desc && <p className={`text-white/60 mt-5 max-w-3xl leading-relaxed ${center ? "mx-auto" : ""}`}>{desc}</p>}
      </Reveal>
    </div>
  );
}

// Word-by-word cinematic reveal for hero headlines
export function WordReveal({ text, className = "", delay = 0.15, as: Tag = "span" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, k) => (
        <span key={k} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + k * 0.07, ease: [0.19, 1, 0.22, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Full-bleed scroll section: background image parallaxes + darkens, content floats above
export function ScrollScene({ img, children, minH = "min-h-[110vh]", overlay = true, id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const fade = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.35, 0.6]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden grain ${minH} flex items-center`}>
      <motion.div style={{ y, scale }} className="absolute inset-[-12%]">
        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
      {overlay && (
        <>
          <motion.div style={{ opacity: fade }} className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0a] via-transparent to-[#0e0c0a]" />
        </>
      )}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32">{children}</div>
    </section>
  );
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

// Shared scroll-or-navigate behavior: smooth-scrolls when the target exists
// on the current page, otherwise routes to Contact (which always has a form).
function ScrollButton({ target = "lead-form", onClick, className, children }) {
  const navigate = useNavigate();
  const go = (e) => {
    onClick?.(e);
    if (target === "lead-form" && !scrollToId("lead-form")) navigate("/contact");
    else scrollToId(target);
  };
  return <button type="button" onClick={go} className={className}>{children}</button>;
}

export function GoldButton({ children, to, scroll = "lead-form", onClick }) {
  const cls =
    "group inline-flex items-center gap-3 bg-[#c9a96a] text-[#0e0c0a] px-8 py-4 text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-[#f3e3b3] transition-all duration-500";
  const inner = (<><span>{children}</span><span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span></>);
  if (to) return <Link to={to} onClick={onClick} className={cls}>{inner}</Link>;
  return <ScrollButton target={scroll} onClick={onClick} className={cls}>{inner}</ScrollButton>;
}

export function OutlineButton({ children, to, scroll = "lead-form", href, onClick }) {
  const cls =
    "group inline-flex items-center gap-3 border border-[#f7f3ec]/30 text-[#f7f3ec] px-8 py-4 text-[12px] tracking-[0.25em] uppercase hover:border-[#c9a96a] hover:text-[#c9a96a] transition-all duration-500 backdrop-blur-sm";
  const inner = (<><span>{children}</span><span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span></>);
  if (href) return <a href={href} onClick={onClick} className={cls}>{inner}</a>;
  if (to) return <Link to={to} onClick={onClick} className={cls}>{inner}</Link>;
  return <ScrollButton target={scroll} onClick={onClick} className={cls}>{inner}</ScrollButton>;
}

// In-page lead CTA safe for HashRouter: plain "#..." anchors would be
// swallowed as routes, so this scrolls (or routes to Contact as fallback).
export function LeadLink({ children, className, onDone }) {
  const navigate = useNavigate();
  const go = (e) => {
    e.preventDefault();
    onDone?.();
    if (!scrollToId("lead-form")) navigate("/contact");
  };
  return <a href="#lead-form" onClick={go} className={className}>{children}</a>;
}

// Infinite logo / text marquee strip
export function Marquee({ items, fast = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div className={`flex w-max gap-0 ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row.map((t, k) => (
          <span key={k} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span className="font-display text-2xl md:text-4xl italic text-white/85">{t}</span>
            <span className="text-[#c9a96a]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Brand preloader
export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      className={`fixed inset-0 z-[100] bg-[#0a0908] flex flex-col items-center justify-center gap-5 ${show ? "" : "pointer-events-none"}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.img src="images/logo.webp" alt="The KariGhars" className="h-14 w-auto brightness-0 invert"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: show ? 1 : 0.4, y: 0 }} transition={{ duration: 0.8 }} />
      <div className="font-display text-3xl tracking-wide">The <span className="italic gold-text">KariGhars</span></div>
      <div className="text-[10px] tracking-[0.5em] uppercase text-[#c9a96a]">As Unique As You</div>
      <div className="w-48 h-px bg-white/10 overflow-hidden">
        <motion.div className="h-full bg-[#c9a96a] origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
      </div>
    </motion.div>
  );
}
