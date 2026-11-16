import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import projects from "./projects.json";

type Project = (typeof projects)[number];
const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;

function App() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const total = projects.length + 2;

  const goTo = (index: number) => {
    const safe = Math.max(0, Math.min(index, total - 1));
    const target = document.getElementById(`panel-${safe}`);
    target?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
      inline: "start",
    });
    setActive(safe);
    setMobileMenu(false);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number(visible.target.id.replace("panel-", "")));
      },
      { root: el, threshold: [0.3, 0.55, 0.75] },
    );
    el.querySelectorAll(".panel").forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") setSelectedImage(null);
        return;
      }
      if (
        !isDesktop() ||
        ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      )
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, selectedImage]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const wheel = (e: WheelEvent) => {
      if (!isDesktop() || selectedImage) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [selectedImage]);

  return (
    <>
      <header className="site-header">
        <button
          className="brand"
          onClick={() => goTo(0)}
          aria-label="Torna all'inizio"
        >
          GB<span className="brand-dot">.</span>
        </button>
        <div className="header-label">
          ARCHITETTURA <span>&</span> VISUAL DESIGN
        </div>
        <nav
          className={mobileMenu ? "nav open" : "nav"}
          aria-label="Navigazione principale"
        >
          <button onClick={() => goTo(0)}>Home</button>
          <button onClick={() => goTo(1)}>Progetti</button>
          <button onClick={() => goTo(total - 1)}>
            Contatti <ArrowUpRight size={14} />
          </button>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Chiudi menu" : "Apri menu"}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      <main className="horizontal-track" ref={track}>
        <section className="panel hero" id="panel-0" aria-label="Introduzione">
          <div className="hero-copy">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.8 }}
            >
              Giulia
              <br />
              <em>
                Belloni<span>.</span>
              </em>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hero-bottom"
            >
              <p>
                Architetto &<br />
                Visual Designer
              </p>
              <p>Visual storytelling per architettura, interni e materiali.</p>
            </motion.div>
            <button className="hero-cta" onClick={() => goTo(1)}>
              Esplora i progetti{" "}
              <span>
                <ArrowRight size={20} />
              </span>
            </button>
          </div>
          <div className="hero-visual">
            <img
              src={projects[3].images[0]}
              alt="Architettura contemporanea immersa nella luce del tramonto"
            />
            <span className="hero-image-tag">SPAZIO · MATERIA · LUCE</span>
          </div>
          <span className="vertical-label">SELECTED WORKS — 2026</span>
        </section>

        <section className="panel intro" id="panel-1">
          <div className="intro-top">
            <span className="eyebrow">01 / UNA SELEZIONE</span>
            <span className="tiny-label">
              ARCHITECTURE & VISUAL STORYTELLING
            </span>
          </div>
          <div className="intro-content">
            <span className="accent-asterisk">✳</span>
            <h2>
              Progetti
              <br />
              <em>selezionati.</em>
            </h2>
            <p>
              Sei storie visive, sei modi di esplorare la relazione tra
              architettura, materia e atmosfera.
            </p>
          </div>
          <div className="intro-index">
            {projects.map((p, i) => (
              <button key={p.id} onClick={() => goTo(i + 2)}>
                <span>{p.id}</span>
                <strong>{p.title}</strong>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
        </section>

        {projects.map((project, i) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={i}
            onImage={setSelectedImage}
          />
        ))}

        <section className="panel contact" id={`panel-${total - 1}`}>
          <div className="contact-meta">
            <span className="eyebrow">PARLIAMO DEL TUO PROGETTO</span>
            <span>COLLECCHIO (PR) · ITALIA</span>
          </div>
          <div className="contact-center">
            <span className="contact-sun">✳</span>
            <h2>
              Creiamo
              <br />
              <em>qualcosa insieme.</em>
            </h2>
            <a className="contact-mail" href="mailto:giulia.belloni@outlook.it">
              giulia.belloni@outlook.it <ArrowUpRight />
            </a>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} GIULIA BELLONI</span>
            <a href="tel:+393331234567">+39 333 1234567</a>
            <button onClick={() => goTo(0)}>TORNA ALL'INIZIO ↑</button>
          </footer>
        </section>
      </main>

    
      {selectedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Immagine ingrandita"
          onClick={() => setSelectedImage(null)}
        >
          <button aria-label="Chiudi immagine">
            <X />
          </button>
          <img src={selectedImage} alt="Dettaglio del progetto" />
        </div>
      )}
    </>
  );
}

function ProjectPanel({
  project,
  index,
  onImage,
}: {
  project: Project;
  index: number;
  onImage: (src: string) => void;
}) {
  return (
    <section
      className="panel project-panel"
      id={`panel-${index + 2}`}
      aria-label={project.title}
    >
      <div className="project-copy">
        <div className="project-heading">
          <span className="project-number">
            {project.id} <span>/ 06</span>
          </span>
          <span className="eyebrow">PROGETTO SELEZIONATO</span>
        </div>
        <div className="project-main">
          <span className="project-rule" />
          <h2>
            {project.title}
            <span>.</span>
          </h2>
          <p className="project-category">{project.category}</p>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-services">
          <span>AMBITI DI INTERVENTO</span>
          <div>
            {project.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="project-gallery">
        <button
          className="gallery-primary"
          onClick={() => onImage(project.images[0])}
          aria-label={`Ingrandisci ${project.title}`}
        >
          <img
            src={project.images[0]}
            alt={`${project.title} — immagine principale`}
            loading="lazy"
          />
        </button>
        <div className="gallery-secondary">
          {project.images.slice(1, 3).map((src, i) => (
            <button
              key={src}
              onClick={() => onImage(src)}
              aria-label={`Ingrandisci dettaglio ${i + 1}`}
            >
              <img
                src={src}
                alt={`${project.title} — dettaglio ${i + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <span className="gallery-note">GIULIA BELLONI © 2026</span>
      </div>
    </section>
  );
}
export default App;
