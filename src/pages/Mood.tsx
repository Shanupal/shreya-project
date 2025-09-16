import { MoodTracker } from "@/components/MoodTracker";
import { Navigation } from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const Mood = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/mood";
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Helmet>
        <title>Log Today’s Mood – MindWell Tracker</title>
        <meta name="description" content="Log today’s mood and notes to build awareness and insights with MindWell’s student mood tracker." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <header className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
      </header>
      <main>
        <MoodTracker />
      </main>
    </div>
  );
};

export default Mood;
