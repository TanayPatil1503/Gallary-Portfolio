import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

export default function ProjectCard({ project, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  const openProject = () => {
    window.location.href = `${window.location.pathname}?project=${project.slug}`;
  };

  return (
    <AnimatedSection delay={delay}>
      <article
        className="glass animated-border"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openProject}
        style={{
          position: "relative",
          height: "100%",
          minHeight: 620,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 26,
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,.08)",
          background:
            "linear-gradient(145deg, rgba(15,23,42,.92), rgba(8,12,28,.96))",
          boxShadow: hovered
            ? "0 25px 70px rgba(0,0,0,.38), 0 0 45px rgba(124,58,237,.10)"
            : "0 18px 50px rgba(0,0,0,.22)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition:
            "transform .35s ease, box-shadow .35s ease, border-color .35s ease",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            right: -100,
            top: -100,
            borderRadius: "50%",
            background: project.gradient,
            opacity: hovered ? 0.16 : 0.08,
            filter: "blur(70px)",
            pointerEvents: "none",
            transition: "opacity .4s ease",
          }}
        />

        {/* ───────────── PROJECT HEADER ───────────── */}
        <div
          style={{
            position: "relative",
            padding: "30px 30px 28px",
            background: project.gradient,
            overflow: "hidden",
          }}
        >
          {/* Header pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.12,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <div style={{ flex: 1 }}>
              {/* Project number / type */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                  color: "rgba(255,255,255,.72)",
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".16em",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 0 12px rgba(255,255,255,.8)",
                  }}
                />

                {project.subtitle}
              </div>

              <h3
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "clamp(24px, 3vw, 30px)",
                  fontWeight: 750,
                  lineHeight: 1.15,
                  letterSpacing: "-.035em",
                }}
              >
                {project.title}
              </h3>
            </div>

            {/* Project icon */}
            <div
              style={{
                width: 54,
                height: 54,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: 16,
                color: "#fff",
                background: "rgba(255,255,255,.13)",
                border: "1px solid rgba(255,255,255,.18)",
                backdropFilter: "blur(14px)",
                boxShadow: hovered
                  ? "0 0 28px rgba(255,255,255,.18)"
                  : "none",
                transform: hovered
                  ? "rotate(4deg) scale(1.05)"
                  : "rotate(0) scale(1)",
                transition: "all .35s ease",
              }}
            >
              {project.icon}
            </div>
          </div>

          {/* Bottom decorative line */}
          <div
            style={{
              position: "relative",
              marginTop: 28,
              width: hovered ? "100%" : "35%",
              height: 2,
              borderRadius: 10,
              background:
                "linear-gradient(90deg, rgba(255,255,255,.8), rgba(255,255,255,0))",
              transition: "width .5s ease",
            }}
          />
        </div>

        {/* ───────────── CONTENT ───────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: 30,
          }}
        >
          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginBottom: 22,
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 11px",
                  borderRadius: 999,
                  border: "1px solid rgba(139,92,246,.22)",
                  background: "rgba(139,92,246,.08)",
                  color: "#c4b5fd",
                  fontSize: 10,
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 680,
            }}
          >
            {project.desc}
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              margin: "25px 0",
              background:
                "linear-gradient(90deg, rgba(255,255,255,.08), transparent)",
            }}
          />

          {/* Highlights */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                color: "#64748b",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: ".16em",
              }}
            >
              <Sparkles size={13} color="#a78bfa" />
              Key Highlights
            </div>

            <div
              style={{
                display: "grid",
                gap: 11,
              }}
            >
              {project.highlights.slice(0, 5).map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      marginTop: 1,
                      borderRadius: "50%",
                      background: "rgba(16,185,129,.1)",
                      border: "1px solid rgba(16,185,129,.18)",
                      color: "#34d399",
                    }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>

                  <span
                    style={{
                      color: "#cbd5e1",
                      fontSize: 13,
                      lineHeight: 1.55,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ───────────── BOTTOM ───────────── */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 28,
            }}
          >
            {/* Tech stack */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,.06)",
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="skill-pill"
                  style={{
                    fontSize: 11,
                    padding: "6px 10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 22,
              }}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openProject();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 17px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.1)",
                  background: hovered
                    ? "rgba(139,92,246,.16)"
                    : "rgba(255,255,255,.035)",
                  color: "#e9e7ff",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .3s ease",
                }}
              >
                View Project
                <ArrowUpRight
                  size={15}
                  style={{
                    transform: hovered
                      ? "translate(2px, -2px)"
                      : "translate(0, 0)",
                    transition: "transform .3s ease",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

function CheckIcon() {
  return (
    <span
      style={{
        width: 15,
        height: 15,
        borderRadius: "50%",
        background: "#10b981",
        display: "inline-block",
        marginTop: 3,
        flexShrink: 0,
      }}
    />
  );
}
