"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  ChevronDown,
  Code2,
  TestTube,
  Layers,
  Database,
  GitBranch,
  Zap,
  Terminal,
  Shield,
  ArrowRight,
  Star,
  CheckCircle,
  Train,
  Bus,
} from "lucide-react";
import "../styles/HomePageTP.css";

/* ─── Helpers ───────────────────────────────────────────────────────── */
function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15, ...options },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}
``;

function AnimatedSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Typewriter ─────────────────────────────────────────────────────── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let timer;
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText((prev) =>
            deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1),
          );
        },
        deleting ? 60 : 90,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words]);
  return (
    <span
      className="gradient-text-2"
      style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}
    >
      {text}
      <span
        style={{
          animation: "blink 1s step-end infinite",
          borderRight: "2px solid #8b5cf6",
          marginLeft: 2,
        }}
      />
    </span>
  );
}

/* ─── Terminal Block ─────────────────────────────────────────────────── */
function TerminalBlock() {
  const lines = [
    { prompt: "$", cmd: " tanay.init()", color: "#67e8f9" },
    { out: "▸ Loading profile...", color: "#94a3b8" },
    { out: "✔ Test Automation Specialist", color: "#6ee7b7" },
    { out: "✔ Selenium · Playwright · Postman", color: "#c4b5fd" },
    { out: "✔ React · Vite · Tailwind", color: "#67e8f9" },
    { out: "✔ Java · JavaScript · Python", color: "#fcd34d" },
    { prompt: "$", cmd: " git log --oneline", color: "#67e8f9" },
    { out: "a1b2c3 XPath Generator Chrome Ext", color: "#f9a8d4" },
    { out: "d4e5f6 Axiomyth – No-Code Platform", color: "#f9a8d4" },
    { prompt: "$", cmd: " status", color: "#67e8f9" },
    { out: "✔ Available · Pune, India 🇮🇳", color: "#6ee7b7" },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 280);
      return () => clearTimeout(t);
    }
  }, [shown]);
  return (
    <div
      className="glass"
      style={{
        borderRadius: 16,
        padding: "24px 28px",
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 13,
        lineHeight: 1.8,
        minHeight: 320,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#ef4444",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#f59e0b",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#10b981",
          }}
        />
        <span style={{ marginLeft: 12, color: "#475569", fontSize: 12 }}>
          tanay@portfolio ~ zsh
        </span>
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} style={{ animation: "fadeIn .3s ease" }}>
          {l.prompt ? (
            <div>
              <span style={{ color: "#10b981" }}>tanay</span>
              <span style={{ color: "#475569" }}>@dev</span>
              <span style={{ color: "#e2e8f0" }}>:</span>
              <span style={{ color: l.color }}>{l.cmd}</span>
            </div>
          ) : (
            <div style={{ color: l.color, paddingLeft: 12 }}>{l.out}</div>
          )}
        </div>
      ))}
      {shown >= lines.length && (
        <div>
          <span style={{ color: "#10b981" }}>tanay</span>
          <span style={{ color: "#475569" }}>@dev</span>
          <span style={{ color: "#e2e8f0" }}>:~$</span>
          <span
            style={{
              animation: "blink 1s step-end infinite",
              borderRight: "2px solid #8b5cf6",
              marginLeft: 4,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(3,7,18,.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none",
        transition: "all .3s ease",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        <span className="gradient-text">TANAY PATIL</span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["about", "skills", "projects", "experience", "contact"].map((s) => (
          <span
            key={s}
            className="nav-link"
            onClick={() => scroll(s)}
            style={{ textTransform: "capitalize" }}
          >
            {s}
          </span>
        ))}
        <a
          href="mailto:tanaypatil1503@gmail.com"
          className="btn-primary"
          style={{ padding: "8px 20px", fontSize: 13 }}
        >
          <Mail size={14} /> Get In Touch
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) =>
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        padding: "120px 60px 60px",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(139,92,246,.25) 0%,transparent 70%)",
            top: `${10 + mouse.y * 10}%`,
            left: `${5 + mouse.x * 8}%`,
            animation: "orb1 8s ease infinite",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(6,182,212,.2) 0%,transparent 70%)",
            top: `${40 + mouse.y * -8}%`,
            right: `${10 + mouse.x * -6}%`,
            animation: "orb2 10s ease infinite",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(236,72,153,.15) 0%,transparent 70%)",
            bottom: "15%",
            left: "40%",
            animation: "orb3 12s ease infinite",
            filter: "blur(40px)",
          }}
        />
        {/* Grid */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.05,
          }}
        >
          <defs>
            <pattern
              id="g"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <div
        className="hero-split"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 60,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div style={{ flex: 1 }}>
          <div
            className="section-label"
            style={{ marginBottom: 24, animation: "fadeUp .8s ease both" }}
          >
            Test Automation Specialist
          </div>
          <h1
            className="hero-heading"
            style={{
              fontSize: "clamp(48px,6vw,88px)",
              marginBottom: 20,
              animation: "fadeUp .8s ease .1s both",
            }}
          >
            <span style={{ color: "#f1f5f9" }}>Hello, I'm</span>
            <br />
            <span className="gradient-text">Tanay Patil</span>
          </h1>
          <div
            style={{
              fontSize: "clamp(18px,2vw,24px)",
              marginBottom: 32,
              color: "#94a3b8",
              lineHeight: 1.5,
              animation: "fadeUp .8s ease .2s both",
            }}
          >
            I build &nbsp;
            <Typewriter
              words={[
                "automation frameworks",
                "quality systems",
                "React apps",
                "testing solutions",
                "Chrome extensions",
              ]}
            />
          </div>
          <p
            style={{
              color: "#64748b",
              fontSize: 16,
              lineHeight: 1.75,
              maxWidth: 480,
              marginBottom: 40,
              animation: "fadeUp .8s ease .3s both",
            }}
          >
            Detail-oriented engineer at{" "}
            <span style={{ color: "#c4b5fd" }}>Solvian Codecraft</span> crafting
            intelligent test automation with Selenium, Playwright, and modern
            web tech.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              animation: "fadeUp .8s ease .4s both",
            }}
          >
            <a href="mailto:tanaypatil1503@gmail.com" className="btn-primary">
              <Mail size={16} /> Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/tanay-patil-48b442311/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 40,
              animation: "fadeUp .8s ease .5s both",
            }}
          >
            {[
              {
                icon: <Mail size={18} />,
                href: "mailto:tanaypatil1503@gmail.com",
                label: "Email",
              },
              {
                icon: <Phone size={18} />,
                href: "tel:9527748093",
                label: "Phone",
              },
              {
                icon: <Linkedin size={18} />,
                href: "https://www.linkedin.com/in/tanay-patil-48b442311/",
                label: "LinkedIn",
              },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#475569",
                  transition: "color .2s",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b5fd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Terminal */}
        <div
          className="terminal-hero"
          style={{
            flex: 1,
            maxWidth: 480,
            animation: "fadeUp .8s ease .3s both",
          }}
        >
          <TerminalBlock />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "float 2s ease infinite",
          color: "#475569",
        }}
      >
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

/* ─── About / Stats ──────────────────────────────────────────────────── */
function About() {
  const stats = [
    { value: "1+", label: "Year at Solvian", icon: <Zap size={20} /> },
    { value: "2", label: "Key Projects", icon: <Code2 size={20} /> },
    { value: "8.55", label: "BCA CGPA", icon: <Star size={20} /> },
    { value: "10+", label: "Tech Skills", icon: <Layers size={20} /> },
  ];
  const values = [
    {
      title: "Quality First",
      desc: "Every line of test code is a commitment to reliability.",
    },
    {
      title: "Continuous Learning",
      desc: "Pursuing MCA while building real-world automation systems.",
    },
    {
      title: "Cross-functional",
      desc: "Bridging dev, QA, and product teams through clear communication.",
    },
    {
      title: "Process-driven",
      desc: "Agile ceremonies, structured reports, and systematic root-cause analysis.",
    },
  ];
  return (
    <section id="about" style={{ padding: "100px 60px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
            About
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 16 }}
          >
            Engineering meets{" "}
            <span className="gradient-text">craftsmanship</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              lineHeight: 1.8,
              maxWidth: 680,
              marginBottom: 60,
            }}
          >
            From Jalgaon to Pune — a journey of academic excellence to
            professional automation engineering, with a 8.55 CGPA BCA degree and
            a passion for building systems that never break.
          </p>
        </AnimatedSection>

        {/* Stats row */}
        <AnimatedSection delay={0.1}>
          <div
            className="stat-row"
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 60,
              flexWrap: "wrap",
            }}
          >
            {stats.map(({ value, label, icon }) => (
              <div
                key={label}
                className="glass card-hover animated-border"
                style={{
                  flex: "1 1 180px",
                  borderRadius: 16,
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#8b5cf6",
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#c4b5fd,#67e8f9)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {value}
                </div>
                <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Values bento */}
        <div
          className="bento-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {values.map(({ title, desc }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div
                className="glass card-hover"
                style={{
                  borderRadius: 16,
                  padding: "28px 28px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#e2e8f0",
                    }}
                  >
                    {title}
                  </span>
                </div>
                <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ─────────────────────────────────────────────────────────── */
const skillGroups = [
  {
    title: "Testing & Automation",
    icon: <TestTube size={20} />,
    color: "purple",
    skills: [
      "Selenium WebDriver",
      "Playwright",
      "TestNG",
      "Rest Assured",
      "API Testing",
      "Postman",
    ],
  },
  {
    title: "Web Development",
    icon: <Code2 size={20} />,
    color: "cyan",
    skills: [
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "REST API Integration",
    ],
  },
  {
    title: "CI/CD & DevOps",
    icon: <GitBranch size={20} />,
    color: "green",
    skills: ["Git", "GitHub", "Jenkins", "Azure DevOps", "SQL"],
  },
  {
    title: "Programming",
    icon: <Terminal size={20} />,
    color: "pink",
    skills: ["Java", "JavaScript", "Python"],
  },
  {
    title: "Engineering & Analysis",
    icon: <Shield size={20} />,
    color: "amber",
    skills: [
      "Engineering Testing",
      "Feasibility Analysis",
      "Root Cause Analysis",
      "Data Analysis",
      "Process Improvement",
    ],
  },
  {
    title: "Project Management",
    icon: <Layers size={20} />,
    color: "purple",
    skills: [
      "Agile / Scrum",
      "Sprint Planning",
      "Risk Management",
      "Technical Documentation",
    ],
  },
];

function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "100px 60px", background: "rgba(15,23,42,.3)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
            Skills
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 16 }}
          >
            My <span className="gradient-text">tech arsenal</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              marginBottom: 60,
              maxWidth: 540,
            }}
          >
            A cross-functional stack spanning test automation, modern web
            development, and engineering process management.
          </p>
        </AnimatedSection>
        <div
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
          }}
        >
          {skillGroups.map(({ title, icon, color, skills }, i) => {
            const accentMap = {
              purple: "#8b5cf6",
              cyan: "#06b6d4",
              green: "#10b981",
              pink: "#ec4899",
              amber: "#f59e0b",
            };
            const accent = accentMap[color];
            return (
              <AnimatedSection key={title} delay={i * 0.07}>
                <div
                  className="glass card-hover"
                  style={{
                    borderRadius: 16,
                    padding: "28px 24px",
                    height: "100%",
                    borderTop: `2px solid ${accent}30`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        color: accent,
                        background: `${accent}18`,
                        padding: 8,
                        borderRadius: 10,
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#e2e8f0",
                      }}
                    >
                      {title}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map((s) => (
                      <span key={s} className={`skill-pill ${color}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ───────────────────────────────────────────────────────── */
const projects = [
  {
    title: "XPath Generator",
    subtitle: "Chrome Extension",
    desc: "A Chrome Extension developed to automate XPath generation for web elements, helping QA engineers and automation testers generate reliable XPath locators quickly. The extension improves testing efficiency by reducing manual effort and supports multiple XPath strategies for dynamic web applications.",
    tech: ["JavaScript", "Chrome API", "XPath", "Selenium"],
    tags: ["Open Source", "Testing Tool"],
    highlights: [
      "Automated XPath generation for web elements",
      "Supports multiple XPath strategies",
      "Improved software testing efficiency",
      "Compatible with modern web applications",
      "Cross-browser XPath validation",
      "Comprehensive technical documentation",
    ],
    gradient: "linear-gradient(135deg,#8b5cf6 0%,#06b6d4 100%)",
    icon: <Code2 size={28} />,
  },

  {
    title: "Axiomyth",
    subtitle: "Automation Testing Platform",
    desc: "A no-code automation testing platform designed to simplify software testing workflows. Contributed to product testing, API validation, requirement analysis, UX testing, defect reporting, and Agile development processes while collaborating with cross-functional teams.",
    tech: ["No-Code", "API Testing", "Azure DevOps", "Agile"],
    tags: ["Enterprise", "Testing Platform"],
    highlights: [
      "No-code automation workflow testing",
      "API and functional testing",
      "Requirement analysis & validation",
      "UX testing and usability verification",
      "Bug reporting using Azure DevOps",
      "Agile team collaboration",
    ],
    gradient: "linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%)",
    icon: <TestTube size={28} />,
  },

  {
    title: "Dynamic Web Scraper",
    subtitle: "Python Automation & Data Extraction",
    desc: "A Python-based web scraping application designed to automate the extraction of structured data from dynamic websites. The scraper intelligently navigates multiple pages, handles lazy loading and infinite scrolling, collects detailed information, and exports organized datasets for analysis and reporting.",
    tech: [
      "Python",
      "Selenium",
      "Pandas",
      "OpenPyXL",
      "XPath",
      "Chrome WebDriver",
    ],
    tags: ["Automation", "Web Scraping"],
    highlights: [
      "Automated extraction of structured web data",
      "Handles dynamic content, lazy loading & infinite scrolling",
      "Multi-page navigation with duplicate detection",
      "Robust XPath-based element identification",
      "Exports cleaned data into Excel spreadsheets",
      "Resilient architecture with comprehensive exception handling",
    ],
    gradient: "linear-gradient(135deg,#f97316 0%,#ef4444 100%)",
    icon: <Database size={28} />,
  },

  {
    title: "Railway Reservation Management System",
    subtitle: "Full Stack Web Application",
    desc: "A web-based Railway Reservation Management System developed using Django to automate train ticket booking and reservation management. The system allows passengers to register, search trains, check seat availability, book or cancel tickets, while administrators manage trains, schedules, users, and bookings through a centralized dashboard.",
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "JavaScript"],
    tags: ["Academic Project", "Full Stack"],
    highlights: [
      "Secure user authentication and authorization",
      "Train search with real-time seat availability",
      "Online ticket booking and cancellation",
      "Admin dashboard for train & booking management",
      "Database-driven reservation management",
      "ERD, DFD, Use Case & Class Diagram implementation",
    ],
    gradient: "linear-gradient(135deg,#0ea5e9 0%,#2563eb 100%)",
    icon: <Train size={28} />,
  },

  {
    title: "Online Bus Ticket Booking System",
    subtitle: "Web-Based Booking Platform",
    desc: "A web application that digitizes the complete bus reservation process by allowing passengers to search buses, check seat availability, reserve tickets, and manage bookings. Administrators can efficiently manage buses, routes, schedules, fares, and booking records through a dedicated dashboard.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    tags: ["Minor Project", "Web Application"],
    highlights: [
      "Passenger registration and secure login",
      "Real-time bus search & seat availability",
      "Online ticket booking with booking history",
      "Admin dashboard for buses, routes & schedules",
      "Booking reports and centralized database",
      "Three-tier architecture with ERD & DFD design",
    ],
    gradient: "linear-gradient(135deg,#10b981 0%,#059669 100%)",
    icon: <Bus size={28} />,
  },
];

function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "100px 60px",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <div
            className="section-label"
            style={{ marginBottom: 12 }}
          >
            Projects
          </div>

          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(32px,4vw,56px)",
              marginBottom: 16,
            }}
          >
            Things I've <span className="gradient-text">Built</span>
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              marginBottom: 60,
              maxWidth: 650,
              lineHeight: 1.7,
            }}
          >
            A collection of automation tools, web applications, and software
            projects focused on solving real-world problems using modern
            technologies.
          </p>
        </AnimatedSection>

        {/* Projects Grid */}

        <div
          className="proj-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))",
            gap: 30,
          }}
        >
          {projects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              delay={index * 0.12}
            >
              <div
                className="glass animated-border card-hover"
                style={{
                  borderRadius: 22,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Banner */}

                <div
                  style={{
                    background: project.gradient,
                    padding: "34px 30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "rgba(255,255,255,.75)",
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        textTransform: "uppercase",
                        letterSpacing: ".12em",
                        marginBottom: 8,
                      }}
                    >
                      {project.subtitle}
                    </div>

                    <h3
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: 27,
                        fontWeight: 700,
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div
                    style={{
                      background: "rgba(255,255,255,.15)",
                      padding: 12,
                      borderRadius: 14,
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {project.icon}
                  </div>
                </div>

                {/* Body */}

                <div
                  style={{
                    padding: 30,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Tags */}

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 20,
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "rgba(139,92,246,.12)",
                          border: "1px solid rgba(139,92,246,.25)",
                          color: "#c4b5fd",
                          padding: "5px 12px",
                          borderRadius: 50,
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: 15,
                      lineHeight: 1.8,
                      marginBottom: 28,
                    }}
                  >
                    {project.desc}
                  </p>

                  {/* Highlights */}

                  <div style={{ marginBottom: 30 }}>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: ".1em",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: 15,
                      }}
                    >
                      Key Highlights
                    </div>

                    {project.highlights.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                          marginBottom: 10,
                        }}
                      >
                        <CheckCircle
                          size={15}
                          style={{
                            color: "#10b981",
                            flexShrink: 0,
                            marginTop: 3,
                          }}
                        />

                        <span
                          style={{
                            color: "#cbd5e1",
                            fontSize: 14,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: "auto",
                    }}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="skill-pill"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ─────────────────────────────────────────────────────── */
function Experience() {
  const responsibilities = [
    "Developed and maintained automated testing solutions using Selenium WebDriver and Playwright",
    "Conducted engineering testing and feasibility validation of software solutions",
    "Created and maintained technical documentation, test plans, and defect reports",
    "Collected and analyzed test execution data to identify trends and process improvements",
    "Collaborated with cross-functional teams including developers, BAs, and stakeholders",
    "Participated in sprint reviews, risk discussions, and progress reporting in Agile",
    "Utilized Git, Azure DevOps, and project management tools for work tracking",
  ];
  return (
    <section
      id="experience"
      style={{ padding: "100px 60px", background: "rgba(15,23,42,.4)" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
            Experience
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 60 }}
          >
            Where I've <span className="gradient-text">worked</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div
            className="glass"
            style={{
              borderRadius: 20,
              padding: "40px 44px",
              borderLeft: "3px solid #8b5cf6",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow accent */}
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#e2e8f0",
                    marginBottom: 4,
                  }}
                >
                  Test Automation Specialist
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      color: "#8b5cf6",
                      fontWeight: 600,
                      fontSize: 16,
                      fontFamily: "'Space Grotesk',sans-serif",
                    }}
                  >
                    Solvian Codecraft Pvt. Ltd.
                  </span>
                  <ExternalLink size={14} style={{ color: "#475569" }} />
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(139,92,246,.2),rgba(6,182,212,.2))",
                    border: "1px solid rgba(139,92,246,.3)",
                    color: "#c4b5fd",
                    padding: "6px 16px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Sep 2024 – Present
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#64748b",
                    fontSize: 13,
                    marginTop: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <MapPin size={13} /> Pune, India
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 24px",
              }}
            >
              {responsibilities.map((r) => (
                <div
                  key={r}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}
                  >
                    {r}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 28,
              }}
            >
              {[
                "Selenium",
                "Playwright",
                "Git",
                "Azure DevOps",
                "Agile",
                "TestNG",
                "Postman",
                "SQL",
              ].map((t) => (
                <span
                  key={t}
                  className="skill-pill cyan"
                  style={{ fontSize: 12 }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Education ──────────────────────────────────────────────────────── */
function Education() {
  const degrees = [
    {
      degree: "MCA — Master of Computer Applications",
      institute: "KCES's Institute of Management & Research",
      duration: "2024 – Present",
      location: "Jalgaon, India",
      status: "In Progress",
      color: "#8b5cf6",
    },
    {
      degree: "BCA — Bachelor of Computer Applications",
      institute: "KCES's Institute of Management & Research",
      duration: "2021 – 2024",
      location: "Jalgaon, India",
      cgpa: "8.55 / 10",
      status: "Completed",
      color: "#06b6d4",
    },
  ];
  return (
    <section id="education" style={{ padding: "100px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
            Education
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 60 }}
          >
            Academic <span className="gradient-text">foundation</span>
          </h2>
        </AnimatedSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {degrees.map(
            (
              { degree, institute, duration, location, cgpa, status, color },
              i,
            ) => (
              <AnimatedSection key={degree} delay={i * 0.12}>
                <div
                  className="glass card-hover"
                  style={{
                    borderRadius: 18,
                    padding: "32px 36px",
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: `${color}20`,
                      border: `1.5px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color,
                      }}
                    >
                      {degree.slice(0, 3)}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#e2e8f0",
                        marginBottom: 6,
                      }}
                    >
                      {degree}
                    </div>
                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: 15,
                        marginBottom: 12,
                      }}
                    >
                      {institute}
                    </div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: 13,
                          fontFamily: "'JetBrains Mono',monospace",
                        }}
                      >
                        {duration}
                      </span>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: 13,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <MapPin size={12} />
                        {location}
                      </span>
                      {cgpa && (
                        <span
                          style={{
                            color: "#6ee7b7",
                            fontSize: 13,
                            fontFamily: "'JetBrains Mono',monospace",
                          }}
                        >
                          CGPA: {cgpa}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      background:
                        status === "In Progress"
                          ? "rgba(139,92,246,.15)"
                          : "rgba(16,185,129,.15)",
                      border: `1px solid ${status === "In Progress" ? "rgba(139,92,246,.35)" : "rgba(16,185,129,.35)"}`,
                      color: status === "In Progress" ? "#c4b5fd" : "#6ee7b7",
                      padding: "5px 14px",
                      borderRadius: 100,
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono',monospace",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {status}
                  </span>
                </div>
              </AnimatedSection>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const contacts = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: "tanaypatil1503@gmail.com",
      href: "mailto:tanaypatil1503@gmail.com",
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: "+91 9527748093",
      href: "tel:9527748093",
    },
    {
      icon: <MapPin size={18} />,
      label: "Location",
      value: "Pune, Maharashtra, India",
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      value: "tanay-patil-48b442311",
      href: "https://www.linkedin.com/in/tanay-patil-48b442311/",
    },
  ];
  const inputStyle = {
    width: "100%",
    background: "rgba(15,23,42,.8)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 10,
    padding: "13px 16px",
    color: "#e2e8f0",
    fontFamily: "'Inter',sans-serif",
    fontSize: 15,
    outline: "none",
    transition: "border-color .2s",
    display: "block",
  };
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  };
  return (
    <section
      id="contact"
      style={{ padding: "100px 60px", background: "rgba(15,23,42,.4)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
            Contact
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 16 }}
          >
            Let's <span className="gradient-text">build together</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: 17,
              marginBottom: 60,
              maxWidth: 500,
            }}
          >
            Open to new opportunities, collaborations, and challenging
            automation problems.
          </p>
        </AnimatedSection>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}
        >
          {/* Info */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contacts.map(({ icon, label, value, href }) => (
                <div
                  key={label}
                  className="glass"
                  style={{
                    borderRadius: 14,
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      color: "#8b5cf6",
                      background: "rgba(139,92,246,.15)",
                      padding: 10,
                      borderRadius: 10,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono',monospace",
                        textTransform: "uppercase",
                        letterSpacing: ".08em",
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e2e8f0",
                          fontSize: 14,
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        style={{
                          color: "#e2e8f0",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div
                className="glass"
                style={{
                  borderRadius: 14,
                  padding: "22px",
                  background:
                    "linear-gradient(135deg,rgba(139,92,246,.1),rgba(6,182,212,.1))",
                  border: "1px solid rgba(139,92,246,.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: "#c4b5fd",
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Currently available
                </div>
                <div
                  style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}
                >
                  Open to full-time roles, freelance projects, and automation
                  consulting opportunities.
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.15}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: "36px 40px" }}
            >
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 600,
                      fontSize: 22,
                      color: "#e2e8f0",
                      marginBottom: 8,
                    }}
                  >
                    Message sent!
                  </div>
                  <p style={{ color: "#64748b" }}>
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          color: "#64748b",
                          marginBottom: 6,
                          fontFamily: "'Space Grotesk',sans-serif",
                        }}
                      >
                        Name
                      </label>
                      <input
                        style={inputStyle}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.target.style.borderColor = "rgba(139,92,246,.5)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,.1)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 13,
                          color: "#64748b",
                          marginBottom: 6,
                          fontFamily: "'Space Grotesk',sans-serif",
                        }}
                      >
                        Email
                      </label>
                      <input
                        style={inputStyle}
                        placeholder="your@email.com"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        onFocus={(e) =>
                          (e.target.style.borderColor = "rgba(139,92,246,.5)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,.1)")
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "#64748b",
                        marginBottom: 6,
                        fontFamily: "'Space Grotesk',sans-serif",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      style={{
                        ...inputStyle,
                        minHeight: 140,
                        resize: "vertical",
                      }}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(139,92,246,.5)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,.1)")
                      }
                    />
                  </div>
                  <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={handleSubmit}
                  >
                    Send Message <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        padding: "40px 60px",
        borderTop: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 14,
          color: "#475569",
        }}
      >
        © {new Date().getFullYear()}{" "}
        <span className="gradient-text" style={{ fontWeight: 600 }}>
          Tanay Patil
        </span>{" "}
        · Built with React
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {[
          { icon: <Mail size={16} />, href: "mailto:tanaypatil1503@gmail.com" },
          { icon: <Phone size={16} />, href: "tel:9527748093" },
          {
            icon: <Linkedin size={16} />,
            href: "https://www.linkedin.com/in/tanay-patil-48b442311/",
          },
        ].map(({ icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#475569",
              transition: "color .2s",
              padding: 8,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,.06)",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#c4b5fd";
              e.currentTarget.style.borderColor = "rgba(139,92,246,.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#475569";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────────────── */
export default function TanayPortfolio() {
  return (
    <div
      style={{ background: "#030712", color: "#e2e8f0", minHeight: "100vh" }}
    >
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
