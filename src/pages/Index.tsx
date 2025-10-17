import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookMarked, Search, Download, Upload } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { 
  STORAGE_KEY, 
  getInitialData, 
  downloadJSON, 
  importData,
  type AppData 
} from "@/lib/storage";

const Index = () => {
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, getInitialData());

  const handleExport = () => {
    downloadJSON(data);
    toast.success("Données exportées avec succès !");
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonString = e.target?.result as string;
            const importedData = importData(jsonString);
            setData(importedData);
            toast.success("Données importées avec succès !");
          } catch (error) {
            toast.error("Erreur lors de l'import du fichier");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Exporter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImport}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Importer
            </Button>
          </div>
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

            {data.books.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                  Aucun livre pour le moment
                </h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter votre premier livre !
                </p>
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Ajouter un livre
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {data.books.map((book) => (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    categories={book.categories}
                    thumbnail={book.thumbnail}
                    status={book.status}
                    rating={book.rating}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Découvrir de nouveaux livres
              </h2>
              <p className="text-muted-foreground mb-6">
                Recherchez des livres via l'API Google Books
              </p>
              <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Fonctionnalité de recherche à venir
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
                Vos statistiques de lecture
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-card p-6 rounded-lg border border-border shadow-[var(--shadow-soft)]">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {data.books.filter(b => b.status === 'read').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Livres lus</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border shadow-[var(--shadow-soft)]">
                  <div className="text-4xl font-bold text-accent mb-2">
                    {data.books.filter(b => b.status === 'reading').length}
                  </div>
                  <div className="text-sm text-muted-foreground">En cours</div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border shadow-[var(--shadow-soft)]">
                  <div className="text-4xl font-bold text-secondary-foreground mb-2">
                    {data.books.filter(b => b.status === 'to_read').length}
                  </div>
                  <div className="text-sm text-muted-foreground">À lire</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
