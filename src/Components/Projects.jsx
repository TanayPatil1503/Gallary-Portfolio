import AnimatedSection from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import projects from "./projectData";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 60px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: 12 }}>
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

        <div className="proj-grid" style={{ display: "grid", gap: 30 }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={index * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
