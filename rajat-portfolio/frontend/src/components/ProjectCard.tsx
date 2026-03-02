type ProjectCardProps = {
  title: string;
  description: string;
};

export default function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article className="rounded-clay border border-white/20 bg-glass p-6 shadow-glass backdrop-blur-md">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-300">{description}</p>
    </article>
  );
}
