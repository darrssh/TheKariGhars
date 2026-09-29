import { Link } from "react-router-dom";
import { Reveal, Eyebrow, ScrollScene, GoldButton } from "../components/ui";
import LeadForm from "../components/LeadForm";
import { SERVICES, PROJECTS, PROCESS } from "../data/content";

export function PageHero({ eyebrow, title, sub, img }) {
  return (
    <section className="relative min-h-[62vh] flex items-end overflow-hidden">
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-transparent to-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-24 w-full">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.0]">{title}</h1>
          {sub && <p className="text-white/65 mt-4 max-w-3xl leading-relaxed">{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-[#0a0908] border-t hairline py-16">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <Reveal>
          <p className="font-display text-3xl md:text-4xl">Take the first step towards a home <span className="italic gold-text">tailored to your lifestyle.</span></p>
          <div className="mt-6"><GoldButton>Book A Free Consultation</GoldButton></div>
        </Reveal>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <main>
      <PageHero eyebrow="Portfolio" title={<>Interior Design <span className="italic gold-text">Portfolio</span></>} sub="Pooja mandirs, balconies, bathrooms, bedrooms, kitchens, living rooms, foyers & dining — bespoke spaces across Bangalore's finest residences." img="images/living-room.webp" />
      <section className="bg-[#0e0c0a] py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, k) => (
            <Reveal key={s.title} delay={(k % 3) * 0.06}>
              <div id={s.title.toLowerCase().replace(/[^a-z]+/g, "")} className="premium-card overflow-hidden img-zoom">
                <div className="h-64 overflow-hidden"><img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="p-6"><h3 className="font-display text-2xl">{s.title}</h3><p className="text-sm text-white/60 mt-2">{s.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ScrollScene img="images/Villa-Interiors.webp">
        <Reveal><Eyebrow>Completed Homes</Eyebrow><h2 className="font-display text-4xl md:text-6xl">Residences We've <span className="italic gold-text">Transformed</span></h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {PROJECTS.map((p) => (
            <div key={p.name} className="relative h-80 overflow-hidden border border-white/10 group">
              <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-1000" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 p-5 font-display text-xl uppercase">{p.name}</div>
            </div>
          ))}
        </div>
      </ScrollScene>
      <CtaBand />
    </main>
  );
}

export function Gallery() {
  const imgs = ["images/living-room.webp","images/bedroom.webp","images/bathroom.webp","images/modular-kitchen.webp","images/pooja-room.webp","images/wardrobe.webp","images/balcony-design.webp","images/Foyer-Design-1.webp","images/false-ceiling.webp","images/Apartment-Interiors.webp","images/Villa-Interiors.webp","images/Penthouse-Interiors.webp","images/3-BHK-Apartments.webp","images/4-BHK-Apartments.webp","images/Villa.webp"];
  const names = ["Aspen Greens","Adarsh Tranqville","Balaji Urban Retreat","Gran Carmen","Chaithanya Samarth","Secret Soil","Epitome Elan","Embassy Lake Terraces"];
  return (
    <main>
      <PageHero eyebrow="Gallery" title={<>Project <span className="italic gold-text">Gallery</span></>} sub="Home tours of completed interiors — Aspen Greens, Adarsh Tranqville, Balaji Urban Retreat, Gran Carmen, Chaithanya Samarth, Secret Soil, Epitome Elan, Embassy Lake Terraces." img="images/Apartment-Interiors.webp" />
      <section className="bg-[#0e0c0a] py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-wrap gap-2 mb-8">{names.map((n) => <span key={n} className="text-[11px] tracking-[0.25em] uppercase border hairline px-4 py-2 text-white/60">{n}</span>)}</div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {imgs.map((im, k) => (
              <Reveal key={im + k} className="mb-5 break-inside-avoid">
                <div className="relative overflow-hidden border border-white/10 img-zoom group">
                  <img src={im} alt={`Gallery ${k}`} className="w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}

export function About() {
  return (
    <main>
      <PageHero eyebrow="About Us" title={<>We Design Lifestyles, <span className="italic gold-text">Not Just Spaces</span></>} sub="15+ years, 650+ team members, 8000+ finished projects. Karigars + Ghars — expert craftsmen crafting homes." img="images/bedroom.webp" />
      <ScrollScene img="images/living-room.webp">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">A renowned brand in <span className="italic gold-text">luxury interiors</span></h2>
            <div className="mt-5 space-y-4 text-white/70 leading-relaxed text-[15px]">
              <p>At The KariGhars, we create bespoke home interiors that bring together thoughtful design, functionality and refined finishes. From space planning and material selection to execution and finishing, our team creates customised interiors backed by a lifetime warranty.</p>
              <p>We focus on finesse, quality and attention to detail at every stage. If you are looking to create a home that is distinctly yours, our team brings your vision to life with personalised design and end-to-end execution.</p>
              <p>Headquartered in HSR Layout, we serve homeowners across Bellandur, Indiranagar, Koramangala, Sarjapur, Whitefield and other localities in Bangalore — plus Delhi, Gurgaon and Noida.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[["15+", "Years Of Legacy"], ["650+", "Team Members"], ["8000+", "Finished Projects"], ["Lifetime", "Warranty"]].map(([v, l]) => (
                <div key={l} className="premium-card p-8 text-center"><div className="font-display text-4xl gold-text">{v}</div><div className="text-[11px] tracking-[0.3em] uppercase text-white/55 mt-2">{l}</div></div>
              ))}
            </div>
            <div className="mt-6"><LeadForm /></div>
          </Reveal>
        </div>
      </ScrollScene>
      <section className="bg-[#0e0c0a] py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal><Eyebrow>How We Work</Eyebrow><h2 className="font-display text-4xl md:text-5xl">Our Design Process</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {PROCESS.map((p) => <div key={p.step} className="premium-card p-7"><div className="font-display text-5xl text-stroke">{p.step}</div><h3 className="font-display text-2xl mt-2 text-[#e9d5a3]">{p.title}</h3><p className="text-sm text-white/60 mt-2">{p.desc}</p></div>)}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}

export function Contact() {
  return (
    <main>
      <PageHero eyebrow="Contact Us" title={<>Let's Craft Your <span className="italic gold-text">Dream Home</span></>} sub="Book a free consultation — design experts will reach out to discuss preferences, scope, timelines and customised solutions." img="images/Foyer-Design-1.webp" />
      <section className="bg-[#0e0c0a] py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="premium-card p-8 space-y-5">
              <div><div className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a]">Visit</div><a className="text-white/75 hover:text-white" href="https://maps.app.goo.gl/jFvsxbS5A5eVR27A8" target="_blank" rel="noreferrer">The KariGhars, 1st Floor, 2798, 27th Main Rd, Agara Village, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102</a></div>
              <div><div className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a]">Call</div><a className="font-display text-3xl hover:text-[#c9a96a]" href="tel:+917022725656">+91 7022725656</a></div>
              <div><div className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a]">Email</div><a className="text-white/75 hover:text-white" href="mailto:support@thekarighars.com">support@thekarighars.com</a></div>
              <iframe title="map" src="https://www.google.com/maps?q=The+KariGhars+HSR+Layout+Bengaluru&output=embed" className="w-full h-64 border border-white/10 grayscale contrast-[0.92]" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}><LeadForm /></Reveal>
        </div>
      </section>
    </main>
  );
}

function Simple({ eyebrow, title, sub, img, points }) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} sub={sub} img={img} />
      <section className="bg-[#0e0c0a] py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-5">
            {points.map((p, k) => (
              <Reveal key={k} delay={(k % 2) * 0.07}>
                <div className="premium-card p-8"><h3 className="font-display text-2xl text-[#e9d5a3]">{p[0]}</h3><p className="text-sm text-white/60 mt-2 leading-relaxed">{p[1]}</p></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10"><LeadForm /></div>
          <div className="mt-8 text-center"><Link to="/" className="text-[11px] tracking-[0.3em] uppercase text-[#c9a96a] border-b border-[#c9a96a] pb-1">← Back To Home</Link></div>
        </div>
      </section>
    </main>
  );
}

export const Videos = () => Simple({ eyebrow: "Videos", title: <>Client Stories <span className="italic gold-text">On Film</span></>, sub: "Watch customer experiences working with The KariGhars — from consultation to final reveal.", img: "images/modular-kitchen.webp", points: [["Home Tours", "Walkthroughs of Aspen Greens, Embassy Lake Terraces, Epitome Elan and more."], ["Testimonials", "Homeowners share consultation-to-handover journeys."], ["Design Explainers", "Materials, lighting, space planning and 3D visualisation process."], ["Subscribe", "Follow youtube.com/@thekarighars1 for latest reveals."]] });
export const ClientLens = () => Simple({ eyebrow: "The Client Lens", title: <>Through Our Clients' <span className="italic gold-text">Eyes</span></>, sub: "4.9★ rated on Google — real reviews from Vignesh, Dharmesh, Deepa, Mythily and 8000+ happy clients.", img: "images/bathroom.webp", points: [["Vignesh", "Professional, smooth process. Loved designs and attention to detail."], ["Dharmesh", "Tasteful, elegant, never overdone. Thoughtful execution by Sreera & team."], ["Deepa Joy", "Easy, collaborative process balancing look and function."], ["The Real Poetry", "They didn't just build interiors — they turned our dream into reality."]] });
export const ExperienceCenter = () => Simple({ eyebrow: "Experience Center", title: <>Visit The KariGhars <span className="italic gold-text">Experience Center</span></>, sub: "HSR Layout, Bengaluru — touch materials, see finishes, meet designers.", img: "images/wardrobe.webp", points: [["What You'll See", "Modular kitchens, wardrobes, lighting, tiles, finishes and 3D walkthroughs."], ["Address", "1st Floor, 2798, 27th Main Rd, Agara Village, HSR Layout, Bengaluru 560102."], ["Hours", "Open all days — book a free consultation before visiting."], ["Call", "+91 7022725656 — support@thekarighars.com"]] });
export const NewsMedia = () => Simple({ eyebrow: "News & Media", title: <>Featured <span className="italic gold-text">In The Press</span></>, sub: "Architectural Digest, Vogue India, Luxe Code, Society Interiors, Archello and more.", img: "images/Penthouse-Interiors.webp", points: [["Architectural Digest", "A new way of crafting modern homes."], ["Vogue India", "Meet the woman behind this people-first interiors brand."], ["Luxe Code", "Warm minimalism feature."], ["Awards", "Luxury Lifestyle Awards NY + National Architecture & Interior Design Excellence."]] });
export const Blog = () => Simple({ eyebrow: "Blog", title: <>Design Notes <span className="italic gold-text">&amp; Guides</span></>, sub: "Costs, timelines, materials, sustainability and Bangalore locality guides.", img: "images/false-ceiling.webp", points: [["Cost Guides", "How much do interiors cost in Bangalore? 3BHK from 35L, 4BHK from 45L."], ["Turnkey Explained", "One team from design to handover — no vendor juggling."], ["3D Consultations", "See layouts, colours and furniture before execution."], ["Sustainability", "Durable materials, efficient lighting, less waste."]] });

export function NotFound() {
  return (
    <main>
      <PageHero eyebrow="404" title={<>Lost in <span className="italic gold-text">the mansion?</span></>} sub="This room doesn't exist — but your dream home does. Let's get you back." img="images/living-room.webp" />
      <section className="bg-[#0e0c0a] py-20 text-center">
        <div className="max-w-xl mx-auto px-5 flex justify-center gap-4 flex-wrap">
          <GoldButton to="/">Back To Home</GoldButton>
          <GoldButton to="/contact">Contact Us</GoldButton>
        </div>
      </section>
    </main>
  );
}
