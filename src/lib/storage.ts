export interface Book {
  id: string;
  google_book_id: string;
  title: string;
  authors?: string[];
  description?: string;
  thumbnail?: string;
  categories?: string[];
  page_count?: number;
  published_date?: string;
  status: 'to_read' | 'reading' | 'read';
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface BookComment {
  id: string;
  book_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ReadingStats {
  category: string;
  books_read: number;
}

export interface AppData {
  books: Book[];
  comments: BookComment[];
  stats: ReadingStats[];
}

export const STORAGE_KEY = 'pile-a-lire-data';

export const getInitialData = (): AppData => ({
  books: [
    {
      id: '1',
      google_book_id: 'fict_1',
      title: "L'Étranger",
      authors: ['Albert Camus'],
      description: "Un roman emblématique de la littérature française explorant l'absurdité de l'existence.",
      thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      categories: ['Classique', 'Philosophie', 'Fiction'],
      page_count: 159,
      published_date: '1942',
      status: 'read',
      rating: 5,
      created_at: new Date('2024-01-15').toISOString(),
      updated_at: new Date('2024-01-15').toISOString(),
    },
    {
      id: '2',
      google_book_id: 'fict_2',
      title: '1984',
      authors: ['George Orwell'],
      description: "Un roman dystopique qui décrit un monde totalitaire où la liberté n'existe plus.",
      thumbnail: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400',
      categories: ['Science-fiction', 'Dystopie', 'Classique'],
      page_count: 328,
      published_date: '1949',
      status: 'reading',
      rating: 4,
      created_at: new Date('2024-02-01').toISOString(),
      updated_at: new Date('2024-02-01').toISOString(),
    },
    {
      id: '3',
      google_book_id: 'fict_3',
      title: 'Le Petit Prince',
      authors: ['Antoine de Saint-Exupéry'],
      description: "Un conte poétique et philosophique pour enfants et adultes.",
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      categories: ['Classique', 'Conte', 'Philosophie'],
      page_count: 96,
      published_date: '1943',
      status: 'to_read',
      created_at: new Date('2024-02-10').toISOString(),
      updated_at: new Date('2024-02-10').toISOString(),
    },
    {
      id: '4',
      google_book_id: 'fict_4',
      title: 'Les Misérables',
      authors: ['Victor Hugo'],
      description: "Une fresque sociale de la France du XIXe siècle centrée sur le personnage de Jean Valjean.",
      thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
      categories: ['Classique', 'Drame', 'Histoire'],
      page_count: 1488,
      published_date: '1862',
      status: 'to_read',
      created_at: new Date('2024-02-12').toISOString(),
      updated_at: new Date('2024-02-12').toISOString(),
    },
    {
      id: '5',
      google_book_id: 'fict_5',
      title: 'Sapiens: Une brève histoire de l\'humanité',
      authors: ['Yuval Noah Harari'],
      description: "Une exploration fascinante de l'histoire de l'humanité depuis l'âge de pierre.",
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      categories: ['Histoire', 'Science', 'Essai'],
      page_count: 512,
      published_date: '2011',
      status: 'read',
      rating: 5,
      created_at: new Date('2024-01-20').toISOString(),
      updated_at: new Date('2024-01-20').toISOString(),
    },
    {
      id: '6',
      google_book_id: 'fict_6',
      title: 'Le Rouge et le Noir',
      authors: ['Stendhal'],
      description: "L'ascension et la chute de Julien Sorel dans la société française de la Restauration.",
      thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      categories: ['Classique', 'Romance', 'Drame'],
      page_count: 576,
      published_date: '1830',
      status: 'reading',
      rating: 4,
      created_at: new Date('2024-02-05').toISOString(),
      updated_at: new Date('2024-02-05').toISOString(),
    },
  ],
  comments: [
    {
      id: 'c1',
      book_id: '1',
      content: "Un chef-d'œuvre absolu ! La prose de Camus est à la fois simple et profonde. Le personnage de Meursault m'a beaucoup marqué.",
      created_at: new Date('2024-01-16').toISOString(),
      updated_at: new Date('2024-01-16').toISOString(),
    },
    {
      id: 'c2',
      book_id: '5',
      content: "Livre fascinant qui remet en question beaucoup de nos certitudes. La section sur la révolution cognitive est particulièrement intéressante.",
      created_at: new Date('2024-01-25').toISOString(),
      updated_at: new Date('2024-01-25').toISOString(),
    },
  ],
  stats: [
    { category: 'Classique', books_read: 3 },
    { category: 'Philosophie', books_read: 2 },
    { category: 'Science-fiction', books_read: 1 },
    { category: 'Histoire', books_read: 1 },
    { category: 'Essai', books_read: 1 },
  ]
});

export const exportData = (data: AppData): string => {
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonString: string): AppData => {
  try {
    const data = JSON.parse(jsonString);
    return {
      books: data.books || [],
      comments: data.comments || [],
      stats: data.stats || []
    };
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('Invalid JSON format');
  }
};

export const downloadJSON = (data: AppData) => {
  const dataStr = exportData(data);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = `pile-a-lire-backup-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};
