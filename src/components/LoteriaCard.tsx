// src/components/LoteriaCard.tsx
import Image from 'next/image';

interface LoteriaCardProps {
  title: string;
  logo: string;
  mainNumbers: string[];
  specialNumbers?: string[];
  additionalText?: string;
  color: string;
}

export default function LoteriaCard({
  title,
  logo,
  mainNumbers,
  specialNumbers,
  additionalText,
  color,
}: LoteriaCardProps) {
  return (
    <div className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: `${color}10`, borderColor: color }}>
      <div className="flex items-center space-x-4 mb-4">
        <Image src={logo} alt={`${title} logo`} width={40} height={40} />
        <h2 className="font-bold" style={{ color }}>{title}</h2>
      </div>
      <div className="flex space-x-2 mb-4">
        {mainNumbers.map((num, idx) => (
          <span key={idx} className="w-8 h-8 flex items-center justify-center rounded-full border" style={{ color, borderColor: color }}>
            {num}
          </span>
        ))}
      </div>
      <div className="flex space-x-2 mb-4">
        {specialNumbers?.map((num, idx) => (
          <span key={idx} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200" style={{ color }}>
            {num}
          </span>
        ))}
      </div>
      {additionalText && (
        <p className="text-sm font-semibold text-gray-700 mt-2">{additionalText}</p>
      )}
    </div>
  );
}
