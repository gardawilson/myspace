import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import workDataJson from "../../../../public/data/work-data.json";
import { getImgPath } from "@/utils/image";

type CaseChallenge = {
  title: string;
  solution: string;
};

type CaseScreenshot = {
  image: string;
  caption: string;
};

type CaseStudy = {
  overview?: string;
  period?: string;
  team?: string;
  problem?: string;
  goals?: string[];
  responsibilities?: string[];
  architecture?: string;
  keyFeatures?: string[];
  impact?: string[];
  challenges?: CaseChallenge[];
  screenshots?: CaseScreenshot[];
};

type WorkProject = {
  image: string;
  title: string;
  description: string;
  stack: string[];
  role: string;
  slug: string;
  caseStudy?: CaseStudy;
};

const projects: WorkProject[] = workDataJson.workData || [];

const getSlugValue = (fullSlug: string) => fullSlug.split("/").filter(Boolean).pop() || "";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: getSlugValue(project.slug),
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => getSlugValue(item.slug) === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-block text-sm text-gray-600 hover:underline mb-8">
          {"<- Back to Home"}
        </Link>

        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="relative w-full bg-gray-100">
            <Image
              src={getImgPath(project.image)}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="text-gray-700 leading-relaxed mb-8">{project.description}</p>

            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Role</h2>
                <p className="text-lg font-medium text-black">{project.role}</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Period</h2>
                <p className="text-lg font-medium text-black">{project.caseStudy?.period || "-"}</p>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Team</h2>
                <p className="text-black">{project.caseStudy?.team || "-"}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{project.caseStudy?.overview || "-"}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Problem</h2>
              <p className="text-gray-700 leading-relaxed">{project.caseStudy?.problem || "-"}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Goals</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {(project.caseStudy?.goals || []).map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {(project.caseStudy?.responsibilities || []).map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Architecture</h2>
              <p className="text-gray-700 leading-relaxed">{project.caseStudy?.architecture || "-"}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {(project.caseStudy?.keyFeatures || []).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Impact</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {(project.caseStudy?.impact || []).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Challenges and Solutions</h2>
              <div className="space-y-4">
                {(project.caseStudy?.challenges || []).map((item) => (
                  <article key={item.title} className="rounded-xl border border-gray-200 p-4">
                    <h3 className="font-semibold text-black mb-1">{item.title}</h3>
                    <p className="text-gray-700">{item.solution}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Screenshots</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {(project.caseStudy?.screenshots || []).map((item) => (
                  <figure key={item.image} className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={getImgPath(item.image)}
                      alt={item.caption}
                      width={900}
                      height={560}
                      className="w-full h-auto object-cover"
                    />
                    <figcaption className="px-3 py-2 text-sm text-gray-600">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
