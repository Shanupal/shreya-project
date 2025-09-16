import { ResourceHub } from "@/components/ResourceHub";
import { Navigation } from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const Resources = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/resources";
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Helmet>
        <title>Psychoeducational Hub – MindWell Resources</title>
        <meta name="description" content="Psychoeducational hub with videos, relaxation audio, and mental wellness guides in regional languages for students." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <header className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold">Psychoeducational Hub</h1>
      </header>
      <main>
        <ResourceHub />
      </main>
    </div>
  );
};

export default Resources;
