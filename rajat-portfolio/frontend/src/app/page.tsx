import ChatbotWindow from "../components/ChatbotWindow";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Rajat Khandelwal</h1>
        <p className="mt-4 text-lg text-slate-300">
          Building AI-native products with full-stack engineering.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ProjectCard
            title="AI Portfolio Assistant"
            description="LangChain-powered assistant with Supabase retrieval and Groq inference."
          />
          <ProjectCard
            title="Full-Stack Web Apps"
            description="Modern frontend experiences connected with production-ready APIs."
          />
        </div>

        <div className="mt-10">
          <ChatbotWindow />
        </div>
      </section>
    </main>
  );
}
