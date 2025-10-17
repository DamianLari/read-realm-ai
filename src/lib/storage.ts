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
  books: [],
  comments: [],
  stats: []
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
