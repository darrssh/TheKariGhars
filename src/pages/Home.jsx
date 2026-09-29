import { useEffect, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { HERO_SLIDES, STATS, SERVICES, PROPERTY_TYPES, PROJECTS, WHY, PACKAGES, PROCESS, PRESS, REVIEWS, FAQS } from "../data/content";
import { Reveal, Eyebrow, ScrollScene, GoldButton, OutlineButton, WordReveal, SectionHead, Marquee } from "../components/ui";
import LeadForm from "../components/LeadForm";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now(), dur = 1800;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

/* --------- SCROLL-DRIVEN PINNED HERO: 8 slides unfold on scroll, then release --------- */
function Hero() {
  const N = HERO_SLIDES.length;
  const wrapRef = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setI(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  const goTo = (k) => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (scrollable * (k + 0.5)) / N, behavior: "smooth" });
  };

  const s = HERO_SLIDES[i];

  return (
    <section ref={wrapRef} className="relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden flex flex-col justify-end grain">
        {/* stacked crossfading backgrounds — one per slide */}
        {HERO_SLIDES.map((sl, k) => (
          <motion.div
            key={sl.title}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.12 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            style={{ zIndex: k === i ? 1 : 0 }}
          >
            <img src={sl.img} alt={sl.title} className="w-full h-full object-cover" loading={k < 2 ? "eager" : "lazy"} />
          </motion.div>
        ))}
        <div className="absolute inset-0 z-[2] bg-black/45 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0e0c0a] via-[#0e0c0a]/10 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0e0c0a]/70 via-transparent to-transparent pointer-events-none" />

        {/* top-left award chips */}
        <div className="absolute top-28 md:top-32 left-5 md:left-10 z-10 flex flex-wrap gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase border border-[#c9a96a]/40 bg-black/40 backdrop-blur px-4 py-2 text-[#e9d5a3]">Luxury Lifestyle Awards · New York</span>
          <span className="text-[10px] tracking-[0.3em] uppercase border border-white/15 bg-black/40 backdrop-blur px-4 py-2 text-white/70 hidden sm:inline">8000+ Homes · Bangalore</span>
        </div>

        {/* scroll progress: fills across all 8 slides */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
          <motion.div className="h-full bg-[#c9a96a] origin-left" style={{ scaleX: scrollYProgress }} />
        </div>

        {/* vertical side label */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
          <span className="text-[10px] tracking-[0.5em] uppercase [writing-mode:vertical-lr] text-white/50">Scroll — 8 Stories — As Unique As You</span>
          <span className="w-px h-20 bg-gradient-to-b from-[#c9a96a] to-transparent" />
        </div>

        {/* main copy */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pb-8">
          <AnimatePresence mode="wait">
            <motion.div key={i}>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-5">
                <span className="h-px w-14 bg-[#c9a96a]" />
                <span className="text-[11px] md:text-sm tracking-[0.45em] uppercase text-[#e9d5a3]">{s.eyebrow}</span>
              </motion.div>
              <WordReveal text={s.title} delay={0.05} className="headline-xl block max-w-6xl" />
              <motion.div key={`sub-${i}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>
                <span className="font-display italic gold-text block mt-2" style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}>{s.sub}</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap gap-4 mt-8">
                <GoldButton to={s.to}>{s.cta}</GoldButton>
                <OutlineButton>Book Free Consultation</OutlineButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* control deck — dots scroll the page to each slide */}
          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
            <div className="font-display text-2xl whitespace-nowrap"><span className="text-[#c9a96a]">0{i + 1}</span><span className="text-white/35 text-lg"> / 0{N}</span></div>
            <div className="flex-1 flex gap-2">
              {HERO_SLIDES.map((sl, k) => (
                <button key={sl.title} onClick={() => goTo(k)} aria-label={`Go to ${sl.title}`} className={`h-[3px] flex-1 transition-all duration-500 ${k === i ? "bg-[#c9a96a]" : k < i ? "bg-[#c9a96a]/50 hover:bg-[#c9a96a]" : "bg-white/20 hover:bg-white/50"}`} />
              ))}
            </div>
            <div className="hidden md:flex gap-2">
              {HERO_SLIDES.map((sl, k) => (
                <button key={sl.title} onClick={() => goTo(k)} className={`relative w-16 h-11 overflow-hidden border transition-all duration-500 ${k === i ? "border-[#c9a96a]" : "border-white/15 opacity-50 hover:opacity-100"}`}>
                  <img src={sl.img} alt={sl.title} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            {i === 0 ? (
              <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-[10px] tracking-[0.4em] uppercase text-[#e9d5a3] whitespace-nowrap hidden sm:inline">Scroll ↓</motion.span>
            ) : (
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 whitespace-nowrap hidden sm:inline">{i === N - 1 ? "Keep scrolling →" : "Scroll ↓"}</span>
            )}
          </div>
        </div>

        {/* bottom marquee */}
        <div className="relative z-10 border-t border-white/10 bg-black/45 backdrop-blur-md py-3">
          <Marquee fast items={["As Unique As You", "Pooja Rooms", "Modular Kitchens", "Villas & Penthouses", "Lifetime Warranty", "8000+ Projects"]} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS CAROUSEL ---------------- */
function ProjectsCarousel() {
  const track = useRef(null);
  const [pos, setPos] = useState(0);
  const scroll = (dir) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const f = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPos(max > 0 ? el.scrollLeft / max : 0);
    };
    f();
    el.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => { el.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, []);
  return (
    <div>
      <div ref={track} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-5 px-5 md:mx-0 md:px-0">
        {PROJECTS.map((p, k) => (
          <Link to="/gallery" key={p.name} className="group relative h-[440px] w-[82vw] sm:w-[380px] shrink-0 snap-start overflow-hidden border border-white/10 img-zoom block">
            <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
            <span className="absolute top-5 left-5 font-display text-lg text-stroke">0{k + 1}</span>
            <span className="absolute top-5 right-5 text-[10px] tracking-[0.3em] uppercase border border-white/20 bg-black/40 px-3 py-1.5 text-white/70">Bangalore</span>
            <div className="absolute bottom-0 p-7">
              <div className="font-display text-3xl uppercase leading-none">{p.name}</div>
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a] border-b border-[#c9a96a] pb-1 mt-3 inline-block group-hover:gap-3">View Gallery →</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-6">
        <button onClick={() => scroll(-1)} className="w-12 h-12 border hairline hover:bg-[#c9a96a] hover:text-black transition" aria-label="Previous">←</button>
        <button onClick={() => scroll(1)} className="w-12 h-12 border hairline hover:bg-[#c9a96a] hover:text-black transition" aria-label="Next">→</button>
        <div className="flex-1 h-px bg-white/10 relative"><div className="absolute left-0 top-0 h-px bg-[#c9a96a] transition-all" style={{ width: `${18 + pos * 82}%` }} /></div>
        <span className="text-xs text-white/40 tracking-[0.3em] uppercase">Drag / Scroll →</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [faq, setFaq] = useState(0);
  const [rev, setRev] = useState(0);

  return (
    <main>
      <Hero />

      {/* 01 — Stats: dark band with dividers */}
      <section className="relative bg-[#0a0908] border-b hairline overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, k) => (
            <Reveal key={s.label} delay={k * 0.06} className={k > 0 ? "md:border-l md:border-white/10 md:pl-10" : ""}>
              <div className="font-display gold-text" style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-white/55 mt-2">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02 — Intro: editorial split + sticky form */}
      <ScrollScene img="images/Villa-Interiors.webp">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-start">
          <div>
            <SectionHead index="02" eyebrow="Interior Designers in Bangalore"
              title={<>The KariGhars — the <span className="italic gold-text">best interior designers</span> in Bangalore</>}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-white/75 leading-relaxed font-light">Full home interiors with <span className="text-white">bespoke designs, premium finishes</span> and turnkey execution for independent homes, apartments and villas. Get a dream interior that is <span className="italic text-[#e9d5a3]">As Unique As You</span>.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
                {[
                  ["Karigars + Ghars", "Expert craftsmen crafting homes — skill meets thoughtful design, backed by lifetime warranty."],
                  ["15+ yrs · 8000 homes", "Space planning to execution and finishing — finesse, quality and detail at every stage."],
                ].map(([t, d]) => (
                  <div key={t} className="bg-[#0e0c0a]/90 p-7"><div className="font-display text-2xl text-[#e9d5a3]">{t}</div><p className="text-sm text-white/60 mt-2 leading-relaxed">{d}</p></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8"><GoldButton>Discuss Your Vision</GoldButton><OutlineButton scroll="process">Our Process ↓</OutlineButton></div>
            </Reveal>
          </div>
          <div className="lg:sticky lg:top-24"><Reveal delay={0.15}><LeadForm /></Reveal></div>
        </div>
      </ScrollScene>

      {/* 03 — Services: sticky stacking editorial cards */}
      <section className="relative bg-[#0e0c0a] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHead index="03" eyebrow="What We Craft"
            title={<>Interior design <span className="italic gold-text">services</span>, nine ways</>}
            desc="From modular kitchens and living rooms to complete home transformations — each discipline, one obsession with detail." />
          <div className="mt-14 space-y-6">
            {SERVICES.map((s, k) => (
              <Reveal key={s.title}>
                <div className="lg:sticky premium-card overflow-hidden grid md:grid-cols-2 img-zoom" style={{ top: `${96 + k * 14}px` }}>
                  <div className={`h-72 md:h-[380px] overflow-hidden ${k % 2 ? "md:order-2" : ""}`}>
                    <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4"><span className="font-display text-5xl text-stroke-gold">0{k + 1}</span><span className="h-px flex-1 bg-white/10" /><span className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96a]">Bespoke</span></div>
                    <h3 className="font-display text-3xl md:text-5xl mt-4">{s.title}</h3>
                    <p className="text-white/60 mt-4 leading-relaxed">{s.desc}</p>
                    <Link to={s.link} className="mt-6 text-[11px] tracking-[0.3em] uppercase text-[#c9a96a]">Know More <span className="inline-block transition-transform hover:translate-x-1">→</span></Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Property: alternating full-bleed rows */}
      <div className="border-t hairline">
        <div className="bg-[#0a0908] py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <SectionHead index="04" eyebrow="Interiors By Property"
              title={<>Apartments, villas <span className="italic gold-text">&amp; penthouses</span></>}
              desc="As luxury interior designers in Bangalore, we create spaces that feel distinctive and truly yours." />
          </div>
        </div>
        {PROPERTY_TYPES.map((p, k) => (
          <ScrollScene key={p.title} img={p.img} minH="min-h-[95vh]">
            <Reveal>
              <div className={`max-w-xl premium-card p-8 md:p-12 grain relative ${k % 2 ? "ml-auto" : ""}`}>
                <span className="section-index text-stroke absolute -top-10 right-6 select-none">0{k + 1}</span>
                <Eyebrow>{p.title}</Eyebrow>
                <h3 className="headline-lg">{p.title}</h3>
                <p className="text-white/70 mt-4 leading-relaxed">{p.desc}</p>
                <div className="mt-7"><GoldButton to={p.link}>Explore {p.title}</GoldButton></div>
              </div>
            </Reveal>
          </ScrollScene>
        ))}
      </div>

      {/* 05 — Projects carousel */}
      <section className="bg-[#0e0c0a] py-24 md:py-32 border-t hairline">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHead index="05" eyebrow="Signature Work"
            title={<>Residential <span className="italic gold-text">masterpieces</span></>}
            desc="From Embassy Lake Terraces apartments to Aspen Greens villas — HSR Layout headquartered, serving Bellandur, Indiranagar, Koramangala, Sarjapur, Whitefield and beyond." />
          <div className="mt-12"><ProjectsCarousel /></div>
        </div>
      </section>

      {/* 06 — Why choose: glass tiles */}
      <ScrollScene img="images/living-room.webp">
        <div className="text-center max-w-3xl mx-auto">
          <SectionHead index="06" center eyebrow="Why Choose Us"
            title={<>Why <span className="italic gold-text">The KariGhars?</span></>}
            desc="Original designs to execution, lifetime warranty, transparent pricing — space optimization, quality materials, timely delivery." />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {WHY.map((w, k) => (
            <Reveal key={w.title + k} delay={k * 0.08}>
              <div className="premium-card p-8 text-center group hover:-translate-y-2 transition-transform duration-500">
                <span className="font-display text-4xl text-stroke-gold">0{k + 1}</span>
                <img src="images/Life-Time-Warranty.webp" alt="" className="w-11 h-11 mx-auto mt-4 object-contain brightness-0 invert opacity-80" />
                <h3 className="font-display text-2xl mt-4">{w.title}</h3>
                <p className="text-sm text-white/60 mt-2">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10"><GoldButton>Book A Free Consultation</GoldButton></div>
      </ScrollScene>

      {/* 07 — Packages: pricing editorial */}
      <section className="bg-[#0a0908] py-24 md:py-32 border-t hairline">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionHead index="07" eyebrow="Transparent Pricing"
            title={<>Interior design <span className="italic gold-text">packages</span></>}
            desc="Tailored, refined, functional, personalised homes. Final cost depends on size, scope, materials and customisation." />
          <div className="grid md:grid-cols-3 gap-5 mt-12 items-stretch">
            {PACKAGES.map((p, k) => (
              <Reveal key={p.title} delay={k * 0.08} className="h-full">
                <div className={`h-full overflow-hidden img-zoom flex flex-col ${k === 1 ? "border border-[#c9a96a]/60 bg-gradient-to-b from-[#1d1712] to-[#0e0c0a]" : "premium-card"}`}>
                  {k === 1 && <div className="text-center text-[10px] tracking-[0.4em] uppercase bg-[#c9a96a] text-black py-2">Most Loved</div>}
                  <div className="h-64 overflow-hidden"><img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover" /></div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-display text-3xl">{p.title}</h3>
                    <div className="gold-text font-display text-2xl mt-2">{p.price}</div>
                    <ul className="text-sm text-white/55 mt-4 space-y-2 flex-1">
                      <li>✦ Bespoke 3D design + execution</li>
                      <li>✦ Premium materials &amp; finishes</li>
                      <li>✦ Lifetime warranty cover</li>
                    </ul>
                    <Link to={p.link} className={`mt-6 text-center py-4 text-[11px] tracking-[0.28em] uppercase transition ${k === 1 ? "bg-[#c9a96a] text-black hover:bg-white" : "border border-[#c9a96a]/50 hover:bg-[#c9a96a] hover:text-black"}`}>Book Consultation →</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Process timeline */}
      <ScrollScene img="images/bedroom.webp" id="process">
        <SectionHead index="08" eyebrow="How We Work"
          title={<>Our <span className="italic gold-text">design process</span></>}
          desc="From understanding your vision to final execution — thoughtful planning, personalised design, meticulous detail." />
        <div className="relative mt-12">
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-white/15" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, k) => (
              <Reveal key={p.step} delay={k * 0.09}>
                <div className="relative">
                  <div className="hidden lg:flex w-[72px] h-[72px] rounded-full premium-card items-center justify-center font-display text-xl text-[#e9d5a3] relative z-10">{p.step}</div>
                  <div className="premium-card p-7 mt-0 lg:mt-6">
                    <div className="lg:hidden font-display text-4xl text-stroke">{p.step}</div>
                    <h3 className="font-display text-2xl text-[#e9d5a3] mt-1">{p.title}</h3>
                    <p className="text-sm text-white/60 mt-2">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ScrollScene>

      {/* 09 — Press marquee */}
      <section className="bg-[#0a0908] py-20 border-t hairline overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <SectionHead index="09" center eyebrow="Press & Recognition" title={<>Featured <span className="italic gold-text">in</span></>} desc="Humbled to be featured in prestigious publications — recognition of our commitment to excellence." />
        </div>
        <div className="mt-10 border-y border-white/10 bg-white/[0.02] py-6">
          <div className="overflow-hidden marquee-mask">
            <div className="flex w-max animate-marquee items-center gap-12 pr-12">
              {[...PRESS, ...PRESS].map((p, k) => (
                <span key={k} className="flex items-center gap-4 whitespace-nowrap">
                  <img src={p.img} alt={p.name} className="h-9 object-contain brightness-0 invert opacity-90" loading="lazy" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/45">{p.name}</span>
                  <span className="text-[#c9a96a] pl-8">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto px-5">
          <div className="premium-card p-8 flex items-center gap-5">
            <img src="images/Best-Interior-Design-Company-Awarded-by-Luxury-Lifestyle-Awards-New-York.webp" alt="Luxury Lifestyle Awards" className="w-24 object-contain" />
            <div className="text-left"><div className="font-display text-xl">Luxury Lifestyle Awards, New York</div><div className="text-sm text-white/50">Best Interior Design Company — Villa Interiors</div></div>
          </div>
          <div className="premium-card p-8 flex items-center gap-5">
            <img src="images/NATIONAL-ARCHITECTURE-AND-INTERIOR-DESIGN-EXCELLENCE-AWARDS.webp" alt="National Architecture Award" className="w-24 object-contain bg-white/90 p-1" />
            <div className="text-left"><div className="font-display text-xl">Architecture &amp; Interior Design Excellence</div><div className="text-sm text-white/50">National Award + SiliconIndia Company of the Year</div></div>
          </div>
        </div>
        <div className="mt-8 text-center"><Link to="/news-media" className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a] border-b border-[#c9a96a] pb-1">Know More →</Link></div>
      </section>

      {/* 10 — Reviews */}
      <ScrollScene img="images/bathroom.webp">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
          <Reveal>
            <SectionHead index="10" eyebrow="Client Love" title={<>Loved, rated, <span className="italic gold-text">remembered</span></>} desc="Video testimonials and 4.9★ Google reviews — from consultation to final reveal." />
            <div className="flex gap-3 mt-7">
              <button onClick={() => setRev((rev - 1 + REVIEWS.length) % REVIEWS.length)} className="w-12 h-12 border hairline hover:bg-[#c9a96a] hover:text-black transition" aria-label="Previous">←</button>
              <button onClick={() => setRev((rev + 1) % REVIEWS.length)} className="w-12 h-12 border hairline hover:bg-[#c9a96a] hover:text-black transition" aria-label="Next">→</button>
              <span className="self-center text-sm text-white/50 ml-2 font-display text-lg">{rev + 1} / {REVIEWS.length}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.figure key={rev} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.6 }} className="premium-card p-8 md:p-12 relative overflow-hidden">
                <span className="font-display text-[7rem] leading-none text-[#c9a96a]/20 absolute -top-4 left-4 select-none">“</span>
                <div className="text-[#c9a96a] tracking-widest relative">★★★★★ <span className="text-white/40 text-xs ml-2 uppercase tracking-[0.3em]">Posted on Google</span></div>
                <blockquote className="font-display text-xl md:text-2xl leading-relaxed mt-4 italic relative">“{REVIEWS[rev].text}”</blockquote>
                <figcaption className="mt-6 text-[12px] tracking-[0.3em] uppercase text-[#c9a96a] relative">— {REVIEWS[rev].name}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="flex gap-2 mt-4">{REVIEWS.map((_, k) => <button key={k} onClick={() => setRev(k)} aria-label={`review ${k}`} className={`h-1 flex-1 transition-all ${k === rev ? "bg-[#c9a96a]" : "bg-white/15 hover:bg-white/30"}`} />)}</div>
          </Reveal>
        </div>
      </ScrollScene>

      {/* 11 — FAQ + final form */}
      <section className="bg-[#0e0c0a] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <SectionHead index="11" eyebrow="Good To Know" title={<>Questions, <span className="italic gold-text">answered</span></>} />
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f, k) => (
              <div key={k}>
                <button onClick={() => setFaq(faq === k ? -1 : k)} className="w-full flex justify-between items-center gap-6 py-5 text-left group">
                  <span className="flex gap-4 items-baseline"><span className="font-display text-sm text-[#c9a96a]/70">0{k + 1}</span><span className={`font-display text-lg md:text-2xl ${faq === k ? "text-[#c9a96a]" : "group-hover:text-[#c9a96a]"} transition`}>{f.q}</span></span>
                  <span className={`text-2xl shrink-0 transition-transform duration-500 ${faq === k ? "rotate-45 text-[#c9a96a]" : ""}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {faq === k && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden">
                      <p className="pb-6 pl-0 md:pl-10 text-white/60 leading-relaxed text-[15px] max-w-3xl">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <Reveal className="mt-14"><LeadForm id="lead-form-faq" /></Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-[#0a0908] border-t hairline py-20 text-center overflow-hidden grain">
        <Reveal>
          <div className="text-[10px] tracking-[0.5em] uppercase text-[#c9a96a]">Begin Your Story</div>
          <div className="font-display leading-none mt-4 select-none" style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)" }}>Take the first step towards<br /><span className="italic gold-text">a home tailored to you.</span></div>
          <div className="mt-8 flex justify-center gap-4 flex-wrap"><GoldButton>Book A Free Consultation</GoldButton><OutlineButton href="tel:+917022725656">Call +91 7022725656</OutlineButton></div>
        </Reveal>
      </section>
    </main>
  );
}
