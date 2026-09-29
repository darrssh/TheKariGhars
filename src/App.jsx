import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Preloader } from "./components/ui";
import Home from "./pages/Home";
import { Portfolio, Gallery, About, Contact, Videos, ClientLens, ExperienceCenter, NewsMedia, Blog, NotFound } from "./pages/Subpages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <HashRouter>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <div className="pt-[72px] md:pt-[102px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/client-lens" element={<ClientLens />} />
          <Route path="/experience-center" element={<ExperienceCenter />} />
          <Route path="/news-media" element={<NewsMedia />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
}
