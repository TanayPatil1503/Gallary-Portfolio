import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ChevronDown,
  Terminal,
  Code2,
  Server,
  Wrench,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

// --- DATA SOURCE (Strictly from TanayPatilCV.pdf) ---
const RESUME_DATA = {
  name: "Tanay Patil",
  title: "Test Automation Engineer",
  email: "tanaypatil1503@gmail.com",
  phone: "9527748093",
  location: "Pune, India",
  summary:
    "Test Automation Engineer with experience in Software Testing, Test Automation, Engineering Testing, Feasibility Analysis, and Quality Assurance. Skilled in Selenium, Playwright, API Testing, Java, JavaScript, Python, Agile/Scrum, Git, and Azure DevOps. Experienced in defect analysis, technical documentation, data analysis, and process improvement.",
  experience: [
    {
      company: "Solvian Codecraft Pvt. Ltd.",
      role: "Test Automation Specialist",
      period: "09/2024 - Present",
      location: "Pune",
      responsibilities: [
        "Developed automated test solutions using Selenium WebDriver and Playwright for functional and regression testing.",
        "Performed engineering testing, feasibility validation, defect analysis, and root cause analysis.",
        "Created test cases, test plans, test reports, defect reports, and technical documentation.",
        "Analyzed test data to identify quality trends, risks, defects, and process improvements.",
        "Collaborated with developers and stakeholders in Agile/Scrum environments.",
        "Used Git and Azure DevOps for version control, defect tracking, and project management.",
      ],
    },
  ],
  skills: {
    "Testing & Automation": [
      "Selenium WebDriver",
      "Playwright",
      "API Testing",
      "Load Testing",
      "TestNG",
    ],
    Programming: ["Java", "JavaScript", "Python", "C#"],
    "Web Development": [
      "React.js",
      "Tailwind CSS",
      "Responsive Design",
      "REST API Integration",
    ],
    "Tools & Technologies": ["Git", "GitHub", "Postman", "Locust", "SQL"],
  },
  projects: [
    {
      name: "XPath Generator",
      subtitle: "Chrome Extension",
      description:
        "A Chrome Extension developed to automate XPath generation for web elements, helping QA engineers and automation testers generate reliable XPath locators quickly.",
      details:
        "The extension improves testing efficiency by reducing manual effort and supports multiple XPath strategies for dynamic web applications.",
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
    },
    {
      name: "Axiomyth",
      subtitle: "Automation Testing Platform",
      description:
        "A no-code automation testing platform designed to simplify software testing workflows.",
      details:
        "Contributed to product testing, API validation, requirement analysis, UX testing, defect reporting, and Agile development processes while collaborating with cross-functional teams.",
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
    },
    {
      name: "Dynamic Web Scraper",
      subtitle: "Python Automation & Data Extraction",
      description:
        "A Python-based web scraping application designed to automate the extraction of structured data from dynamic websites.",
      details:
        "The scraper intelligently navigates multiple pages, handles lazy loading and infinite scrolling, collects detailed information, and exports organized datasets for analysis and reporting.",
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
    },
    {
      name: "Neon Space Match",
      subtitle: "Interactive Memory Matching Game",
      description:
        "A responsive space-themed memory matching game built with React, Framer Motion, and Tailwind CSS.",
      details:
        "The game challenges players to match randomly generated celestial pairs while tracking time, moves, errors, combos, hints, progress, and scores through an animated neon interface.",
      liveUrl: "https://tanaypatil1503.github.io/neon-spacematch/",
      tech: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Framer Motion",
        "Lucide React",
      ],
      tags: ["Frontend Project", "Interactive Game"],
      highlights: [
        "Randomized 18-card celestial matching grid",
        "Animated 3D card flip and hover interactions",
        "Timer, moves, errors, progress and combo tracking",
        "Hint system with limited temporary card reveals",
        "Dynamic scoring with time, combo and move bonuses",
        "Personal best score persistence using localStorage",
      ],
    },
    {
      name: "Online Bus Ticket Booking System",
      subtitle: "Web-Based Booking Platform",
      description:
        "A web application that digitizes the complete bus reservation process by allowing passengers to search buses, check seat availability, reserve tickets, and manage bookings.",
      details:
        "Administrators can efficiently manage buses, routes, schedules, fares, and booking records through a dedicated dashboard.",
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
    },
  ],
  education: [
    {
      degree: "MCA",
      institution: "KCES's Institute of Management & Research",
      period: "2024-2026",
      location: "Jalgaon, India",
      gpa: "CGPA: 8.50",
    },
    {
      degree: "BCA",
      institution: "KCES's Institute of Management & Research",
      period: "2021-2024",
      location: "Jalgaon, India",
      gpa: "CGPA: 8.55",
    },
  ],
};

// Advanced Magnetic Interaction Wrapper
const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * strength);
    position.y.set(middleY * strength);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x.get(), y: position.y.get() }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Premium Spotlight Hover Card
const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          border: "1px solid",
          borderImageSource: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.4),
              transparent 80%
            )
          `,
          borderImageSlice: 1,
        }}
      />
      {children}
    </div>
  );
};

const CinematicBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#030303]">
    {/* Grid Layer */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
        backgroundSize: "4rem 4rem",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)",
      }}
    />
    {/* Ambient Glow Orbs */}
    <motion.div
      className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vh] rounded-full bg-blue-900/20 blur-[120px]"
      animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[-10%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-violet-900/15 blur-[150px]"
      animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
    {/* Noise Texture */}
    <div
      className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

const Loader = ({ onLoadingComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030303]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h1
            className="text-4xl font-light tracking-[0.3em] text-white/80 md:text-6xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            TANAY
          </motion.h1>
        </div>
        <div className="mt-8 h-[1px] w-48 overflow-hidden bg-white/10 md:w-64">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            onAnimationComplete={onLoadingComplete}
          />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[50px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["About", "Experience", "Projects", "Skills"];

  useEffect(() => {
    return scrollY.onChange((latest) => setScrolled(latest > 50));
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) =>
        document.getElementById(link.toLowerCase()),
      );
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= bottom) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      if (window.scrollY < 200) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          scrolled
            ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] py-3 md:py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <nav className="container mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="group relative flex items-center gap-3 overflow-hidden text-lg font-medium tracking-tighter text-white z-10"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
              <span className="font-bold font-mono">TP</span>
            </div>
            <span className="transition-all duration-500">
              Tanay
              <span className="text-white/40 group-hover:text-white transition-colors">
                Patil
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`relative px-5 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:text-white ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-blue-500/20 blur-[10px] rounded-full" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{link}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex ml-8">
            <Magnetic strength={0.2}>
              <a
                href="mailto:tanaypatil1503@gmail.com"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-medium text-white transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                <span className="relative z-10">Contact</span>
              </a>
            </Magnetic>
          </div>

          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white z-50 transition-colors hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#030303]/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

            <div className="flex flex-col items-center gap-6 text-center w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full border-b border-white/5 py-4 text-3xl font-medium tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                href="mailto:tanaypatil1503@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
                className="mt-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-8 py-4 text-sm font-medium text-blue-400 w-full"
              >
                Let's Work Together
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AutomationDashboard = () => {
  const tests = [
    { name: "Authentication Flow", status: "PASSED", duration: "1.24s" },
    { name: "Checkout Validation", status: "RUNNING", duration: "0.82s" },
    { name: "API Integration", status: "PASSED", duration: "0.46s" },
    { name: "Regression Suite", status: "PASSED", duration: "2.18s" },
  ];

  return (
    <div className="relative h-[500px] w-full max-w-[560px]">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[100px]" />

      {/* Floating status badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7 }}
        className="absolute -right-2 top-10 z-20 rounded-xl border border-white/[0.08] bg-[#080808]/80 px-3 py-2 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />

          <span className="font-mono text-[8px] tracking-[0.18em] text-white/50">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </motion.div>

      {/* Main dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 1.25,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-x-4 top-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070707]/90 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {/* Top shine */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
            </div>

            <span className="font-mono text-[9px] tracking-[0.18em] text-white/40">
              AUTOMATION / CI
            </span>
          </div>

          <span className="font-mono text-[8px] text-white/20">
            RUN #2847
          </span>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.05] border-b border-white/[0.06]">
          <div className="px-5 py-5">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              Tests
            </span>

            <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
              248
            </div>

            <span className="font-mono text-[7px] text-emerald-400/60">
              +12 today
            </span>
          </div>

          <div className="px-5 py-5">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              Success
            </span>

            <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
              99.2%
            </div>

            <span className="font-mono text-[7px] text-white/25">
              Last 30 runs
            </span>
          </div>

          <div className="px-5 py-5">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              Runtime
            </span>

            <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
              04:32
            </div>

            <span className="font-mono text-[7px] text-blue-400/60">
              Optimized
            </span>
          </div>
        </div>

        {/* Test progress */}
        <div className="px-5 py-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="font-mono text-[8px] tracking-[0.18em] text-white/30">
                TEST EXECUTION
              </div>

              <div className="mt-1 text-sm font-medium text-white/75">
                Regression Suite
              </div>
            </div>

            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-mono text-[8px] text-blue-400"
            >
              RUNNING
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: ["12%", "74%", "68%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            >
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>

          <div className="mt-2 flex justify-between font-mono text-[7px] text-white/20">
            <span>168 / 248 TESTS</span>
            <span>68%</span>
          </div>
        </div>

        {/* Test list */}
        <div className="border-t border-white/[0.06]">
          {tests.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.7 + i * 0.12,
                duration: 0.5,
              }}
              className="flex items-center justify-between border-b border-white/[0.035] px-5 py-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={
                    test.status === "RUNNING"
                      ? {
                          opacity: [0.4, 1, 0.4],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                  className={`h-1.5 w-1.5 rounded-full ${
                    test.status === "RUNNING"
                      ? "bg-blue-400"
                      : "bg-emerald-400"
                  }`}
                />

                <span className="text-[10px] text-white/45">
                  {test.name}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-mono text-[7px] tracking-wider ${
                    test.status === "RUNNING"
                      ? "text-blue-400/70"
                      : "text-emerald-400/60"
                  }`}
                >
                  {test.status}
                </span>

                <span className="font-mono text-[7px] text-white/20">
                  {test.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-white/[0.015] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[7px] text-white/20">
              PIPELINE
            </span>

            <span className="h-px w-5 bg-white/10" />

            <span className="font-mono text-[7px] text-white/35">
              BUILD → TEST → DEPLOY
            </span>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-3 w-3 rounded-full border border-white/10 border-t-blue-400"
          />
        </div>
      </motion.div>

      {/* Floating metric card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.7 }}
        className="absolute -bottom-2 -left-1 z-20 rounded-xl border border-white/[0.08] bg-[#080808]/90 px-4 py-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
          Coverage
        </div>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-lg font-semibold text-white/80">
            100%
          </span>

          <span className="mb-1 font-mono text-[7px] text-emerald-400/60">
            ↑ 4.8%
          </span>
        </div>

        {/* Mini graph */}
        <div className="mt-2 flex h-5 items-end gap-1">
          {[8, 11, 9, 14, 12, 17, 15, 20].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 2 }}
              animate={{
                height: [2, height, height - 3, height],
              }}
              transition={{
                duration: 2,
                delay: i * 0.08,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 rounded-t-sm bg-gradient-to-t from-blue-500/20 to-blue-400/70"
            />
          ))}
        </div>
      </motion.div>

      {/* Floating CI/CD badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          y: [-3, 3, -3],
        }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -left-3 top-24 z-20 rounded-lg border border-blue-400/10 bg-blue-500/[0.035] px-2.5 py-2 backdrop-blur-xl"
      >
        <div className="font-mono text-[7px] tracking-[0.15em] text-blue-300/60">
          CI/CD
        </div>

        <div className="mt-0.5 font-mono text-[7px] text-white/25">
          AUTO_DEPLOY
        </div>
      </motion.div>
    </div>
  );
};


const Hero = () => {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 900], [0, 220]);
  const visualY = useTransform(scrollY, [0, 900], [0, -70]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.94]);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      filter: "blur(12px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.65 + i * 0.08,
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient lights */}
        <div className="absolute left-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/[0.035] blur-[180px]" />

        <div className="absolute right-[-5%] top-[25%] h-[550px] w-[550px] rounded-full bg-violet-600/[0.04] blur-[180px]" />

        {/* Center glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 48% 45%, rgba(255,255,255,0.035), transparent 32%)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 10%, transparent 72%)",
          }}
        />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 py-28 md:px-12 lg:px-16"
      >
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* =====================================================
              LEFT
          ===================================================== */}
          <div>
            <h1>
              <motion.div className="flex overflow-hidden">
                {["T", "a", "n", "a", "y"].map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block text-[clamp(4.8rem,11vw,10.5rem)] font-bold leading-[0.82] tracking-[-0.075em] text-white"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div className="flex overflow-hidden">
                {["P", "a", "t", "i", "l", "."].map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i + 5}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block bg-gradient-to-b from-white via-white/75 to-white/15 bg-clip-text text-[clamp(4.8rem,11vw,10.5rem)] font-bold leading-[0.82] tracking-[-0.075em] text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 flex max-w-xl items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

              <span className="font-mono text-[8px] tracking-[0.2em] text-white/15">
                ENGINEERING / 01
              </span>
            </motion.div>

            {/* Description */}
            <motion.div
              className="mt-9 max-w-2xl"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.8 }}
            >
              <p className="text-[17px] font-light leading-[1.75] text-white/40 md:text-xl lg:text-[22px]">
                <strong className="font-medium text-white">
                  {RESUME_DATA.title}
                </strong>{" "}
                specializing in engineering{" "}
                <span className="text-white/70">
                  robust, automated systems
                </span>{" "}
                that make software{" "}
                <span className="text-white/80">
                  reliable, scalable, and flawless.
                </span>
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_10px_40px_rgba(255,255,255,0.06)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_50px_rgba(255,255,255,0.12)]"
                >
                  <span>Explore Work</span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.08]">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="mailto:tanaypatil1503@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/[0.09] bg-white/[0.025] px-6 py-3.5 text-sm font-medium text-white/65 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10">
                    <Mail className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-white" />
                  </span>

                  Contact Me
                </a>
              </Magnetic>
            </motion.div>

            {/* Focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-11 flex items-center gap-4"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                Focus
              </span>

              <span className="h-px w-6 bg-white/10" />

              <div className="flex flex-wrap gap-2">
                {["Automation", "QA", "CI/CD", "Backend"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[8px] tracking-wider text-white/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — ANIMATED UI
          ===================================================== */}
          <motion.div
            style={{ y: visualY }}
            className="relative flex items-center justify-center lg:min-h-[560px]"
          >
            <AutomationDashboard />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-6 hidden items-center gap-4 md:flex lg:left-16"
      >
        <div className="relative h-8 w-5 rounded-full border border-white/10">
          <motion.span
            animate={{ y: [4, 15, 4], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-0 h-1 w-px -translate-x-1/2 bg-white/50"
          />
        </div>

        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
          Scroll to explore
        </span>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
};



const SectionHeader = ({ index, title }) => (
  <motion.div
    className="mb-16 flex items-baseline gap-4 md:mb-24"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
  >
    <span className="font-mono text-sm text-blue-400 md:text-base">
      /{index}
    </span>
    <h2 className="text-3xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
      {title}
    </h2>
    <div className="ml-4 h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
  </motion.div>
);

const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 w-full px-6 py-32 md:px-12 md:py-48"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader index="01" title="About" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              className="text-xl font-light leading-relaxed tracking-wide text-white/70 md:text-3xl md:leading-snug"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="mb-8">
                I am a{" "}
                <strong className="font-medium text-white">
                  Test Automation Engineer
                </strong>{" "}
                focused on software testing, engineering validation, and quality
                assurance.
              </p>
              <p>
                With expertise in{" "}
                <span className="text-blue-400">
                  Selenium, Playwright, and API Testing
                </span>
                , I build robust automated solutions and perform deep defect
                analysis to drive process improvements in Agile environments.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            <SpotlightCard className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Profile Data
                </h3>
              </div>
              <ul className="flex flex-col gap-5 text-sm text-white/80">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 text-white/30" />
                  <span>
                    {RESUME_DATA.location}
                    <br />
                    <span className="text-xs text-white/40">
                      Base of Operations
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-4 w-4 text-white/30" />
                  <span className="break-all">
                    {RESUME_DATA.email}
                    <br />
                    <span className="text-xs text-white/40">
                      Direct Contact
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Terminal className="mt-0.5 h-4 w-4 text-white/30" />
                  <span>
                    {RESUME_DATA.title}
                    <br />
                    <span className="text-xs text-white/40">Current Focus</span>
                  </span>
                </li>
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-10 w-full px-6 py-32 md:px-12 md:py-48"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader index="02" title="Experience" />

        <div className="relative mx-auto max-w-5xl">
          {/* Animated Timeline Line */}
          <div className="absolute bottom-0 left-[27px] top-0 w-[1px] bg-white/5 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-violet-500"
              style={{ height }}
            />
          </div>

          {RESUME_DATA.experience.map((job, idx) => (
            <div
              key={idx}
              className="relative mb-24 flex flex-col md:flex-row md:items-center md:justify-between group"
            >
              {/* Timeline Node */}
              <div className="absolute left-[27px] top-0 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[#030303] border border-white/20 transition-colors duration-500 group-hover:border-blue-500 group-hover:bg-blue-500/20 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                <div className="h-1.5 w-1.5 rounded-full bg-white/50 transition-colors duration-500 group-hover:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              </div>

              {/* Left Side (Date & Meta) */}
              <motion.div
                className="mb-8 ml-16 md:mb-0 md:ml-0 md:w-[45%] md:pr-12 md:text-right"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-2 font-mono text-sm tracking-widest text-blue-400/80">
                  {job.period}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {job.company}
                </h3>
                <p className="mt-2 text-lg text-white/60">{job.role}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/40">
                  <MapPin className="h-3 w-3" /> {job.location}
                </div>
              </motion.div>

              {/* Right Side (Details Card) */}
              <motion.div
                className="ml-16 w-auto md:ml-0 md:w-[45%] md:pl-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SpotlightCard className="p-8 group-hover:bg-white/[0.03] transition-colors duration-500">
                  <ul className="flex flex-col gap-4">
                    {job.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-sm leading-relaxed text-white/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500/50"></span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AbstractProjectVisual = ({ index }) => {
  // Return completely abstract, decorative CSS visuals depending on the project
  const visuals = [
    // 0: XPath Generator - DOM/Node Paths
    <div
      key="0"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0"
    >
      <div className="absolute top-[20%] left-[10%] w-32 h-[1px] bg-gradient-to-r from-transparent to-blue-500 group-hover:w-64 transition-all duration-1000 ease-out" />
      <div className="absolute top-[20%] left-[10%] w-[1px] h-32 bg-gradient-to-b from-blue-500 to-transparent group-hover:h-64 transition-all duration-1000 ease-out delay-100" />
      <div className="absolute bottom-[30%] right-[20%] w-48 h-[1px] bg-gradient-to-l from-transparent to-violet-500 group-hover:-translate-x-10 transition-transform duration-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-1000" />
    </div>,

    // 1: Axiomyth - Structured Grid/Automation
    <div
      key="1"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-700 z-0"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div className="absolute top-20 right-20 w-40 h-40 border border-violet-500/30 rounded-lg group-hover:scale-110 transition-transform duration-1000" />
      <motion.div className="absolute bottom-10 left-10 w-20 h-20 border border-blue-500/30 rounded-lg group-hover:-translate-y-10 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#050505]" />
    </div>,

    // 2: Dynamic Web Scraper - Data Extraction/Nodes
    <div
      key="2"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0"
    >
      <div className="absolute top-1/3 left-1/3 w-3 h-3 rounded-full bg-blue-400 group-hover:shadow-[0_0_20px_#60a5fa] transition-shadow duration-500" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-violet-400 group-hover:shadow-[0_0_20px_#a78bfa] transition-shadow duration-500" />
      <svg className="absolute inset-0 w-full h-full stroke-white/10 stroke-[1px] fill-none group-hover:stroke-white/20 transition-colors duration-700">
        <path
          d="M150 150 Q 250 50 350 200 T 500 100"
          className="group-hover:[stroke-dasharray:10_10] group-hover:animate-[dash_20s_linear_infinite]"
        />
      </svg>
      <div className="absolute inset-0 bg-blue-900/5 blur-[80px]" />
    </div>,

    // 3: Neon Space Match - Cosmic Orbs/Neon
    <div
      key="3"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700 z-0"
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full group-hover:bg-fuchsia-500/20 group-hover:scale-125 transition-all duration-1000" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 blur-[100px] rounded-full group-hover:bg-violet-500/20 transition-all duration-1000" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-48 h-48 border border-dashed border-white/10 rounded-full"
      />
    </div>,

    // 4: Online Bus Ticket - Routes/Mapping
    <div
      key="4"
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0"
    >
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-full h-[1px] border-b border-dashed border-white/10" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 group-hover:ring-emerald-400/40 transition-all duration-500" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-400/20 group-hover:ring-blue-400/40 transition-all duration-500" />
    </div>,
  ];

  return visuals[index % visuals.length];
};

const ProjectCard = ({ project, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative w-full flex flex-col md:flex-row mb-24 md:mb-40 group ${isLeft ? "md:justify-start" : "md:justify-end"}`}
      initial={{ opacity: 0, y: 50, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Central Timeline Connection Node (Desktop) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-[#030303] z-20 transition-all duration-700 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110
        ${isLeft ? "right-0 translate-x-[50%]" : "left-0 -translate-x-[50%]"}`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors duration-700" />
      </div>

      {/* Timeline Connection Node (Mobile) */}
      <div className="absolute top-10 left-[27px] -translate-x-1/2 flex md:hidden items-center justify-center w-4 h-4 rounded-full border border-white/10 bg-[#030303] z-20 transition-all duration-700 group-hover:border-blue-500">
        <div className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors duration-700" />
      </div>

      <div
        className={`w-full md:w-[48%] pl-[60px] md:pl-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <SpotlightCard className="relative flex flex-col h-full p-8 md:p-10 bg-[#050505]/90 backdrop-blur-md border-white/5 overflow-hidden transition-all duration-500 hover:border-white/15 hover:bg-[#070707] hover:-translate-y-2">
          <AbstractProjectVisual index={index} />

          {/* Giant Background Number */}
          <div className="absolute -top-8 -right-4 text-[10rem] md:text-[12rem] font-black text-white/[0.015] pointer-events-none select-none tracking-tighter transition-all duration-700 group-hover:text-white/[0.03] group-hover:-translate-y-4 group-hover:scale-105 z-0 leading-none">
            0{index + 1}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-blue-400/80 group-hover:text-blue-400 transition-colors">
                0{index + 1} / SELECTED WORK
              </span>
              <div className="h-[1px] w-8 bg-white/10 group-hover:w-16 group-hover:bg-white/20 transition-all duration-500" />
            </div>

            <div className="mb-4">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                {project.name}
              </h3>
              <p className="text-sm font-medium text-white/50 tracking-wide uppercase group-hover:text-white/70 transition-colors">
                {project.subtitle}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-white/60 mb-6 group-hover:text-white/80 transition-colors duration-300 max-w-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white/60 group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:text-white/80 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="border-t border-white/10 pt-6 group-hover:border-white/20 transition-colors duration-500">
              <div className="flex flex-col gap-3">
                {project.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="text-xs text-white/50 flex items-start gap-3 group/item"
                  >
                    <ChevronDown className="w-4 h-4 text-white/20 -rotate-90 shrink-0 group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all duration-300" />
                    <span className="leading-relaxed group-hover/item:text-white/80 transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable CTA - Only shown if liveUrl exists per instructions */}
            {project.liveUrl && (
              <div className="mt-10">
                <Magnetic strength={0.2}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 overflow-hidden rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  >
                    Live Demo
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </a>
                </Magnetic>
              </div>
            )}
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 w-full px-6 py-32 md:px-12 md:py-48 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-24 flex flex-col items-center justify-center text-center md:mb-40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="mb-4 font-mono text-sm tracking-widest text-blue-400 uppercase">
            03 / Selected Work
          </span>
          <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl">
            A collection of tools, platforms,
            <br className="hidden md:block" />
            <span className="text-white/30">and interactive experiences.</span>
          </h2>
          <div className="mt-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-6xl">
          {/* Central connecting spine (Desktop) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-white/5 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              style={{ height, originY: 0 }}
            />
          </div>

          {/* Left connecting spine (Mobile) */}
          <div className="absolute top-0 bottom-0 left-[27px] w-[1px] bg-white/5 block md:hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              style={{ height, originY: 0 }}
            />
          </div>

          {RESUME_DATA.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = Object.entries(RESUME_DATA.skills);

  const iconMap = {
    "Testing & Automation": <Wrench className="h-5 w-5 text-blue-400" />,
    Programming: <Code2 className="h-5 w-5 text-violet-400" />,
    "Web Development": <Terminal className="h-5 w-5 text-emerald-400" />,
    "Tools & Technologies": <Server className="h-5 w-5 text-orange-400" />,
  };

  return (
    <section
      id="skills"
      className="relative z-10 w-full px-6 py-32 md:px-12 md:py-48"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader index="04" title="Technical Expertise" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {categories.map(([category, skills], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full p-8 lg:p-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                    {iconMap[category]}
                  </div>
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, sIdx) => (
                    <Magnetic key={skill} strength={0.2}>
                      <div className="group relative cursor-default overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 transition-colors hover:border-white/30 hover:bg-white/[0.08]">
                        <span className="relative z-10 text-sm text-white/70 transition-colors group-hover:text-white">
                          {skill}
                        </span>
                      </div>
                    </Magnetic>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Education seamlessly integrated here */}
        <div className="mt-32">
          <SectionHeader index="05" title="Education" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {RESUME_DATA.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <SpotlightCard className="flex h-full flex-col p-8 lg:p-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                      <GraduationCap className="h-5 w-5 text-white/50" />
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/40">
                      {edu.period}
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {edu.degree}
                  </h3>
                  <p className="mb-8 text-white/60">{edu.institution}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="flex items-center gap-2 text-xs text-white/40">
                      <MapPin className="h-3 w-3" /> {edu.location}
                    </span>
                    <span className="font-mono text-sm font-medium text-blue-400">
                      {edu.gpa}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#020202] pt-40 pb-12">
      {/* Huge Background Typography */}
      <div className="pointer-events-none absolute left-1/2 top-20 w-full -translate-x-1/2 select-none overflow-hidden text-center">
        <motion.h1
          className="text-[18vw] font-bold leading-none text-white/[0.02]"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          CONNECT
        </motion.h1>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Let's build something remarkable
          </motion.div>

          <h2 className="mb-12 text-4xl font-bold tracking-tighter text-white md:text-6xl lg:text-7xl">
            Have a vision? <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Let's automate it.
            </span>
          </h2>

          <Magnetic strength={0.3}>
            <a
              href={`mailto:${RESUME_DATA.email}`}
              className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-white text-lg font-medium text-black transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex flex-col items-center gap-2">
                Say Hello
                <ArrowRight className="h-5 w-5 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-100 to-violet-100 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </Magnetic>
        </div>

        <div className="mt-40 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm md:flex-row md:gap-0">
          <div className="flex items-center gap-6">
            <span className="text-white/40">
              © {new Date().getFullYear()} Tanay Patil.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
    document.body.style.background = "#030303";
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#030303] font-sans text-white selection:bg-blue-500/30 selection:text-white">
      <CinematicBackground />
      <AnimatePresence mode="wait">
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
