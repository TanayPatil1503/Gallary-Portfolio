import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Layers3,
  Sparkles,
} from "lucide-react";
import projects from "./projectData";
import AnimatedSection from "./AnimatedSection";

export default function ProjectDetail() {
  const query = new URLSearchParams(window.location.search);
  const slug = query.get("project");

  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [slug],
  );

  const goToProjects = () => {
    window.location.href = `${window.location.origin}${window.location.pathname}#projects`;
  };

  if (!project) {
    return (
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "80px 24px",
          overflow: "hidden",
          background: "#070a14",
          color: "#e2e8f0",
        }}
      >
        <BackgroundGlow />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 620,
            padding: "44px",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(15,23,42,.72)",
            backdropFilter: "blur(24px)",
            textAlign: "center",
            boxShadow: "0 30px 100px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              margin: "0 auto 24px",
              display: "grid",
              placeItems: "center",
              borderRadius: 20,
              color: "#c4b5fd",
              background: "rgba(139,92,246,.1)",
              border: "1px solid rgba(139,92,246,.2)",
            }}
          >
            <Layers3 size={28} />
          </div>

          <div
            style={{
              color: "#a78bfa",
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              letterSpacing: ".2em",
              textTransform: "uppercase",
            }}
          >
            404 / PROJECT NOT FOUND
          </div>

          <h2
            style={{
              margin: "14px 0 12px",
              color: "#fff",
              fontSize: "clamp(30px, 5vw, 44px)",
              letterSpacing: "-.04em",
            }}
          >
            Project unavailable
          </h2>

          <p
            style={{
              margin: "0 auto",
              maxWidth: 500,
              color: "#94a3b8",
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            The project you're looking for doesn't exist or may have been
            removed. Return to the projects section to explore available
            work.
          </p>

          <button
            onClick={goToProjects}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              marginTop: 28,
              padding: "12px 18px",
              border: "1px solid rgba(167,139,250,.25)",
              borderRadius: 13,
              background: "rgba(139,92,246,.1)",
              color: "#ddd6fe",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: ".08em",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={15} />
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "80px 24px 100px",
        overflow: "hidden",
        background: "#070a14",
      }}
    >
      <BackgroundGlow />

      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        {/* ───────────── BACK BUTTON ───────────── */}
        <AnimatedSection>
          <button
            onClick={goToProjects}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 36,
              padding: "10px 15px",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 12,
              background: "rgba(255,255,255,.025)",
              color: "#a5b4fc",
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".06em",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
            }}
          >
            <ArrowLeft size={15} />
            BACK TO PROJECTS
          </button>
        </AnimatedSection>

        {/* ───────────── HERO ───────────── */}
        <AnimatedSection>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 32,
              border: "1px solid rgba(255,255,255,.08)",
              background:
                "linear-gradient(145deg, rgba(15,23,42,.9), rgba(8,12,28,.96))",
              boxShadow: "0 30px 100px rgba(0,0,0,.35)",
            }}
          >
            {/* Gradient glow */}
            <div
              style={{
                position: "absolute",
                width: 500,
                height: 500,
                right: -180,
                top: -240,
                borderRadius: "50%",
                background: project.gradient,
                opacity: 0.15,
                filter: "blur(100px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.035,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.5fr) minmax(260px, .5fr)",
                gap: 50,
                padding: "54px",
                alignItems: "center",
              }}
            >
              {/* Hero content */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 18,
                    color: "#a78bfa",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 12px #34d399",
                    }}
                  />
                  PROJECT DETAILS
                </div>

                <h1
                  style={{
                    margin: 0,
                    maxWidth: 800,
                    color: "#fff",
                    fontSize: "clamp(40px, 6vw, 76px)",
                    lineHeight: 0.98,
                    fontWeight: 800,
                    letterSpacing: "-.055em",
                  }}
                >
                  {project.title}
                </h1>

                <p
                  style={{
                    margin: "24px 0 0",
                    maxWidth: 720,
                    color: "#94a3b8",
                    fontSize: 16,
                    lineHeight: 1.85,
                  }}
                >
                  {project.desc}
                </p>

                {project.details && (
                  <p
                    style={{
                      margin: "14px 0 0",
                      maxWidth: 720,
                      color: "#64748b",
                      fontSize: 14,
                      lineHeight: 1.8,
                    }}
                  >
                    {project.details}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 9,
                    marginTop: 28,
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "7px 12px",
                        borderRadius: 999,
                        border: "1px solid rgba(167,139,250,.2)",
                        background: "rgba(139,92,246,.08)",
                        color: "#c4b5fd",
                        fontSize: 10,
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace",
                        textTransform: "uppercase",
                        letterSpacing: ".07em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                      marginTop: 30,
                      padding: "13px 18px",
                      borderRadius: 13,
                      background: project.gradient,
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      boxShadow: "0 12px 35px rgba(0,0,0,.25)",
                    }}
                  >
                    <ExternalLink size={15} />
                    View Live Project
                  </a>
                )}
              </div>

              {/* Hero visual */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "min(260px, 100%)",
                    aspectRatio: "1",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 34,
                    background: project.gradient,
                    boxShadow:
                      "0 30px 80px rgba(0,0,0,.35), 0 0 80px rgba(139,92,246,.12)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 12,
                      borderRadius: 27,
                      border: "1px solid rgba(255,255,255,.2)",
                      background: "rgba(255,255,255,.06)",
                      backdropFilter: "blur(8px)",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "grid",
                      placeItems: "center",
                      width: 92,
                      height: 92,
                      borderRadius: 26,
                      background: "rgba(255,255,255,.12)",
                      border: "1px solid rgba(255,255,255,.22)",
                      color: "#fff",
                      boxShadow: "0 0 45px rgba(255,255,255,.12)",
                    }}
                  >
                    {project.icon}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 24,
                      left: 24,
                      right: 24,
                      padding: "10px 12px",
                      borderRadius: 12,
                      background: "rgba(0,0,0,.18)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "rgba(255,255,255,.8)",
                      fontSize: 9,
                      fontWeight: 600,
                      fontFamily: "'JetBrains Mono', monospace",
                      textAlign: "center",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ───────────── CONTENT GRID ───────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, .65fr)",
            gap: 24,
            marginTop: 24,
          }}
        >
          {/* Highlights */}
          <AnimatedSection delay={0.08}>
            <div
              style={{
                height: "100%",
                padding: 30,
                borderRadius: 26,
                border: "1px solid rgba(255,255,255,.07)",
                background: "rgba(15,23,42,.58)",
                backdropFilter: "blur(20px)",
              }}
            >
              <SectionHeading
                icon={<Sparkles size={15} />}
                label="Key Highlights"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 12,
                }}
              >
                {project.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "16px",
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,.055)",
                      background: "rgba(255,255,255,.018)",
                    }}
                  >
                    <div
                      style={{
                        width: 25,
                        height: 25,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 9,
                        color: "#34d399",
                        background: "rgba(16,185,129,.08)",
                        border: "1px solid rgba(16,185,129,.16)",
                      }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>

                    <div>
                      <div
                        style={{
                          marginBottom: 5,
                          color: "#475569",
                          fontSize: 9,
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: ".1em",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <p
                        style={{
                          margin: 0,
                          color: "#cbd5e1",
                          fontSize: 13,
                          lineHeight: 1.65,
                        }}
                      >
                        {highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Technology */}
          <AnimatedSection delay={0.14}>
            <div
              style={{
                height: "100%",
                padding: 30,
                borderRadius: 26,
                border: "1px solid rgba(255,255,255,.07)",
                background: "rgba(15,23,42,.58)",
                backdropFilter: "blur(20px)",
              }}
            >
              <SectionHeading
                icon={<Code2 size={15} />}
                label="Technology Stack"
              />

              <div
                style={{
                  display: "grid",
                  gap: 9,
                }}
              >
                {project.tech.map((tech, index) => (
                  <div
                    key={tech}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 13,
                      border: "1px solid rgba(255,255,255,.055)",
                      background: "rgba(255,255,255,.018)",
                    }}
                  >
                    <span
                      style={{
                        color: "#e2e8f0",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>

                    <span
                      style={{
                        color: "#475569",
                        fontSize: 9,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  color: "#475569",
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1.7,
                }}
              >
                BUILT WITH MODERN
                <br />
                DEVELOPMENT TOOLS
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ───────────── BOTTOM CTA ───────────── */}
        <AnimatedSection delay={0.2}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              marginTop: 24,
              padding: "28px 30px",
              borderRadius: 24,
              border: "1px solid rgba(139,92,246,.12)",
              background:
                "linear-gradient(90deg, rgba(124,58,237,.08), rgba(6,182,212,.04))",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#a78bfa",
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                }}
              >
                Explore More Work
              </div>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#64748b",
                  fontSize: 13,
                }}
              >
                Discover more projects and experiments from the portfolio.
              </p>
            </div>

            <button
              onClick={goToProjects}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 17px",
                border: "1px solid rgba(167,139,250,.2)",
                borderRadius: 12,
                background: "rgba(139,92,246,.1)",
                color: "#ddd6fe",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: ".07em",
                cursor: "pointer",
              }}
            >
              All Projects
              <ArrowUpRight size={15} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */

function SectionHeading({ icon, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        marginBottom: 22,
        color: "#a78bfa",
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: ".16em",
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          display: "grid",
          placeItems: "center",
          borderRadius: 9,
          background: "rgba(139,92,246,.08)",
          border: "1px solid rgba(139,92,246,.15)",
        }}
      >
        {icon}
      </span>

      {label}
    </div>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -220,
          left: "20%",
          borderRadius: "50%",
          background: "rgba(124,58,237,.10)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          bottom: -180,
          right: "10%",
          borderRadius: "50%",
          background: "rgba(6,182,212,.06)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
