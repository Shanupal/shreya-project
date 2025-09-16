import { AISupport } from "@/components/AISupport";
import { Navigation } from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const Support = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/support";
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Helmet>
        <title>AI Support Chat – MindWell</title>
        <meta name="description" content="Get immediate coping strategies and guidance with MindWell’s AI support chat for students." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <header className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold">AI Support</h1>
      </header>
      <main>
        <AISupport />
      </main>
    </div>
  );
};

export default Support;
