import { Clock, MapPin, Phone } from 'lucide-react';
import { Attraction } from '../lib/supabase';

type AttractionCardProps = {
  attraction: Attraction;
  onClick: () => void;
};

export function AttractionCard({ attraction, onClick }: AttractionCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      natureza: 'bg-green-100 text-green-700',
      cultura: 'bg-amber-100 text-amber-700',
      aventura: 'bg-orange-100 text-orange-700',
      gastronomia: 'bg-rose-100 text-rose-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      natureza: 'Natureza',
      cultura: 'Cultura',
      aventura: 'Aventura',
      gastronomia: 'Gastronomia',
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={attraction.image_url || 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(attraction.category)}`}>
            {getCategoryLabel(attraction.category)}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
          {attraction.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">{attraction.description}</p>

        <div className="space-y-2 pt-2">
          {attraction.opening_hours && (
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{attraction.opening_hours}</span>
            </div>
          )}

          <div className="flex items-start space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{attraction.location}</span>
          </div>

          {attraction.contact && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{attraction.contact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
