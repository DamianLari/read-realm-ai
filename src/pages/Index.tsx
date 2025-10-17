import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, LogOut, BookMarked, Search } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-foreground">
              Ma Pile à Lire
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
            <TabsTrigger value="library" className="gap-2">
              <BookMarked className="w-4 h-4" />
              Ma Bibliothèque
            </TabsTrigger>
            <TabsTrigger value="explore" className="gap-2">
              <Search className="w-4 h-4" />
              Explorer
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-playfair font-bold text-foreground">
                Mes Livres
              </h2>
              <Button className="bg-gradient-to-r from-primary to-accent">
                Ajouter un livre
              </Button>
            </div>

            <div className="grid gap-4">
              <BookCard
                title="L'Étranger"
                authors={["Albert Camus"]}
                categories={["Classique", "Philosophie"]}
                status="read"
                rating={5}
              />
              <BookCard
                title="1984"
                authors={["George Orwell"]}
                categories={["Science-fiction", "Dystopie"]}
                status="reading"
              />
              <BookCard
                title="Le Petit Prince"
                authors={["Antoine de Saint-Exupéry"]}
                categories={["Classique", "Conte"]}
                status="to_read"
              />
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Découvrir de nouveaux livres
              </h2>
              <p className="text-muted-foreground">
                Explorez des recommandations basées sur vos lectures
              </p>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Vos statistiques de lecture
              </h2>
              <p className="text-muted-foreground">
                Suivez votre progression par catégorie
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;