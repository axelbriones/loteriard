// Tipo para los posts de WordPress
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WordpressPost {
    id: number;
    title: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
  }
  
  // Tipo para los resultados del scraping
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ScrapingResultType {
    id: number;
    title: string;
    date: string;
    numbers: number[];
    extra?: number;
    description: string;
  }
  