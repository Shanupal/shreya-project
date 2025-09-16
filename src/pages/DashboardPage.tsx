import { Dashboard } from "@/components/Dashboard";
import { Navigation } from "@/components/Navigation";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/dashboard";
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Helmet>
        <title>MindWell Dashboard – Student Mental Health</title>
        <meta name="description" content="Track your wellness with insights, trends, and progress on the MindWell student mental health dashboard." />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <header className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
