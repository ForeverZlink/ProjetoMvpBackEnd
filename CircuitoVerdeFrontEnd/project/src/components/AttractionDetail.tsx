import { X, Clock, MapPin, Phone, Navigation } from 'lucide-react';
import { Attraction } from '../lib/supabase';

type AttractionDetailProps = {
  attraction: Attraction;
  onClose: () => void;
};

export function AttractionDetail({ attraction, onClose }: AttractionDetailProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      natureza: 'bg-green-100 text-green-700 border-green-200',
      cultura: 'bg-amber-100 text-amber-700 border-amber-200',
      aventura: 'bg-orange-100 text-orange-700 border-orange-200',
      gastronomia: 'bg-rose-100 text-rose-700 border-rose-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative h-72">
          <img
            src={attraction.image_url || 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getCategoryColor(attraction.category)}`}>
              {getCategoryLabel(attraction.category)}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{attraction.name}</h2>
            <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            {attraction.opening_hours && (
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Horários de Funcionamento</p>
                  <p className="text-gray-600 mt-1">{attraction.opening_hours}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Localização</p>
                <p className="text-gray-600 mt-1">{attraction.location}</p>
              </div>
            </div>

            {attraction.contact && (
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contato</p>
                  <p className="text-gray-600 mt-1">{attraction.contact}</p>
                </div>
              </div>
            )}

            {attraction.latitude && attraction.longitude && (
              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`,
                    '_blank'
                  );
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                <Navigation className="h-5 w-5" />
                <span>Abrir no Google Maps</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
