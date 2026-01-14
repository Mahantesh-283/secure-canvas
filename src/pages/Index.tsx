import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckSquare, Shield, Zap, BarChart3, ArrowRight, Check } from "lucide-react";

export default function Index() {
  const { user } = useAuth();

  const features = [
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Create, update, and organize tasks with ease. Track progress and stay on top of your work.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "JWT-based authentication with password hashing. Your data is safe and encrypted.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant feedback on all your actions. No refresh needed to see changes.",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Visual overview of your tasks and productivity. Filter and search with ease.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-accent rounded-lg">
              <CheckSquare className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Scalable Web App with Authentication
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Manage Your Tasks with{" "}
            <span className="text-gradient">TaskFlow</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A powerful, secure task management dashboard built with React, TailwindCSS, 
            and Lovable Cloud. Complete with JWT authentication and CRUD operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8">
              <Link to="/auth">
                {user ? "Go to Dashboard" : "Start Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies and best practices for scalability and security.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border bg-card card-hover"
            >
              <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built With Modern Tech</h2>
            <p className="text-muted-foreground">
              Scalable architecture ready for production
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "React.js with TypeScript",
              "TailwindCSS for styling",
              "Lovable Cloud (PostgreSQL)",
              "JWT Authentication",
              "Password Hashing (bcrypt)",
              "Row Level Security (RLS)",
              "Real-time Updates",
              "Responsive Design",
            ].map((tech) => (
              <div key={tech} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                <div className="p-1 rounded-full bg-success/10">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-primary text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Sign up now and start managing your tasks with a powerful, secure dashboard.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/auth">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 TaskFlow. Built with React, TailwindCSS & Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
}
