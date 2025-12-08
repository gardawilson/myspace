import Link from "next/link";

// Data skill
const skills = [
  { name: "Figma", icon: "/images/home/education-skill/figma-icon.svg", rating: 5 },
  { name: "Photoshop", icon: "/images/home/education-skill/photoshop-icon.svg", rating: 5 },
  { name: "Sketch", icon: "/images/home/education-skill/sketch-icon.svg", rating: 4 },
  { name: "Adobe XD", icon: "/images/home/education-skill/adobe-icon.svg", rating: 4 },
  { name: "Framer", icon: "/images/home/education-skill/framer-icon.svg", rating: 5 },
  { name: "Invision", icon: "/images/home/education-skill/invision-icon.svg", rating: 3 },
];

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// ✅ Static params untuk SSG
export async function generateStaticParams() {
  return skills.map(skill => ({
    slug: slugify(skill.name)
  }));
}

// Tipe props page
type PageProps = {
  params: {
    slug: string;
  };
};

// Page component
export default function SkillDetailPage({ params }: PageProps) {
  const { slug } = params;

  // Cari skill sesuai slug
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
        <img
          src={skill.icon}
          alt={skill.name}
          style={{ width: "80px", height: "80px", marginBottom: "16px" }}
        />
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{skill.name}</h1>
        <div style={{ margin: "12px 0" }}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
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
          <p>
            Saya berpengalaman menggunakan <strong>{skill.name}</strong> dalam
            proyek profesional dengan rating keahlian <strong>{skill.rating}/5</strong>.
          </p>
          <ul style={{ textAlign: "left", display: "inline-block", margin: "16px auto 0" }}>
            <li>Pengembangan aplikasi production-ready</li>
            <li>Implementasi best practices dan clean code</li>
            <li>Kolaborasi dalam tim development</li>
          </ul>
        </div>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "32px",
            padding: "10px 22px",
            background: "#F97316",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none"
          }}
        >
          Kembali ke Skill List
        </Link>
      </div>
    </section>
  );
}
