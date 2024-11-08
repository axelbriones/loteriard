interface ScrapingResultProps {
    title: string;
    numbers: number[];
    date: string;
  }
  
  export default function ScrapingResult({ title, numbers, date }: ScrapingResultProps) {
    return (
      <div>
        <h3>{title}</h3>
        <p>Números: {numbers.join(', ')}</p>
        <p>Fecha: {date}</p>
      </div>
    );
  }
  