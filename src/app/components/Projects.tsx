import Image from "next/image";
import { projects } from "./data";

export default function Projects() {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project, i) => (
          <a
            key={i + "+" + project.headline}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group border border-gray-100"
          >
            <div className="relative w-full aspect-[16/9] h-80 bg-gray-100 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.name + " thumbnail"}
                fill
                className="object-cover transition-transform duration-300 rounded-t-2xl group-hover:brightness-95"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={project.name === "Room Homepage"}
              />
            </div>
            <div className="p-6 flex flex-col justify-center w-full">
              <h2 className="text-2xl font-semibold mb-2">
                {project.headline}
              </h2>
              <p className="text-gray-600 mb-4 text-base">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
