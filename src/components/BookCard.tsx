import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star } from "lucide-react";

interface BookCardProps {
  title: string;
  authors?: string[];
  thumbnail?: string;
  categories?: string[];
  rating?: number;
  status: 'to_read' | 'reading' | 'read';
  onClick?: () => void;
}

export const BookCard = ({ 
  title, 
  authors, 
  thumbnail, 
  categories, 
  rating, 
  status,
  onClick 
}: BookCardProps) => {
  const statusColors = {
    'to_read': 'bg-secondary text-secondary-foreground',
    'reading': 'bg-accent text-accent-foreground',
    'read': 'bg-primary text-primary-foreground'
  };

  const statusLabels = {
    'to_read': 'À lire',
    'reading': 'En cours',
    'read': 'Lu'
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-[var(--shadow-book)] border-border/50"
      onClick={onClick}
    >
      <div className="flex gap-4 p-4">
        <div className="relative flex-shrink-0 w-24 h-32 bg-muted rounded-md overflow-hidden">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <Badge className={`absolute top-2 right-2 ${statusColors[status]} text-xs`}>
            {statusLabels[status]}
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-playfair font-bold text-lg text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {authors && authors.length > 0 && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
              {authors.join(', ')}
            </p>
          )}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {categories.slice(0, 2).map((cat, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'fill-accent text-accent' : 'text-muted'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};