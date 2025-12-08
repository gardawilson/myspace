import Link from "next/link";

const skills = [
  { name: "Figma", icon: "/images/home/education-skill/figma-icon.svg", rating: 5 },
  { name: "Photoshop", icon: "/images/home/education-skill/photoshop-icon.svg", rating: 5 },
  { name: "Sketch", icon: "/images/home/education-skill/sketch-icon.svg", rating: 4 },
  { name: "Adobe XD", icon: "/images/home/education-skill/adobe-icon.svg", rating: 4 },
  { name: "Framer", icon: "/images/home/education-skill/framer-icon.svg", rating: 5 },
  { name: "Invasion", icon: "/images/home/education-skill/invision-icon.svg", rating: 3 },
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Static params for dynamic routing
export function generateStaticParams() {
  return skills.map(skill => ({
    slug: slugify(skill.name),
  }));
}

// Gunakan Page type dari Next.js
export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Temukan skill berdasarkan slug
  const { slug } = await params;
  const skill = skills.find(s => slugify(s.name) === slug);

  if (!skill) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <h2>Skill Tidak Ditemukan</h2>
        <Link href="/">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <section style={{ padding: "40px 0" }}>
      <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        <img src={skill.icon} alt={skill.name} style={{ width: "80px", height: "80px", marginBottom: "16px" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{skill.name}</h1>
        <div style={{ margin: "12px 0" }}>
          {[...Array(5)].map((_, i) => (
            <span key={i}
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: i < skill.rating ? "#F97316" : "#e5e7eb",
                margin: "0 2px"
              }}
            />
          ))}
        </div>
        <div style={{ color: "#666", marginTop: "8px" }}>
          Level Keahlian: <strong>{skill.rating}/5</strong>
        </div>
        <div style={{ marginTop: "24px" }}>
          <p>Saya berpengalaman menggunakan <strong>{skill.name}</strong> dalam proyek profesional dengan rating keahlian <strong>{skill.rating}/5</strong>.</p>
          <ul style={{ marginTop: "16px", color: "#555", textAlign: "left" }}>
            <li>Pengembangan aplikasi production-ready</li>
            <li>Implementasi best practices dan clean code</li>
            <li>Kolaborasi dalam tim development</li>
          </ul>
        </div>
        <Link href="/" style={{
          display: "inline-block",
          marginTop: "32px",
          padding: "10px 22px",
          background: "#F97316",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none"
        }}>
          Kembali ke Skill List
        </Link>
      </div>
    </section>
  );
}
