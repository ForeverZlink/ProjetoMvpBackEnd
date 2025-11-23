import { X, Clock, TrendingUp, MapPin, Award, Sparkles } from 'lucide-react';
import { Route } from '../lib/supabase';

type RouteDetailProps = {
  route: Route;
  onClose: () => void;
};

export function RouteDetail({ route, onClose }: RouteDetailProps) {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      facil: 'bg-green-100 text-green-700 border-green-200',
      moderado: 'bg-amber-100 text-amber-700 border-amber-200',
      dificil: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      facil: 'Fácil',
      moderado: 'Moderado',
      dificil: 'Difícil',
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      caminhada: 'Caminhada',
      ciclismo: 'Ciclismo',
      trilha: 'Trilha',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      caminhada: '🚶',
      ciclismo: '🚴',
      trilha: '🥾',
    };
    return icons[type as keyof typeof icons] || '🗺️';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative h-80">
          <img
            src={route.image_url || 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg'}
            alt={route.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-4 py-2 bg-white rounded-full text-2xl shadow-lg">{getTypeIcon(route.type)}</span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 bg-white ${getDifficultyColor(route.difficulty)}`}>
              {getDifficultyLabel(route.difficulty)}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <div className="text-sm font-medium text-green-600 mb-2">{getTypeLabel(route.type)}</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{route.name}</h2>
            <p className="text-gray-600 leading-relaxed">{route.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-2xl p-6">
            <div className="text-center">
              <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{route.distance_km} km</p>
              <p className="text-sm text-gray-500">Distância</p>
            </div>

            <div className="text-center">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{route.duration_hours}h</p>
              <p className="text-sm text-gray-500">Duração</p>
            </div>

            {route.elevation_gain_m > 0 && (
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{route.elevation_gain_m}m</p>
                <p className="text-sm text-gray-500">Elevação</p>
              </div>
            )}

            <div className="text-center">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{getDifficultyLabel(route.difficulty)}</p>
              <p className="text-sm text-gray-500">Nível</p>
            </div>
          </div>

          {route.highlights && route.highlights.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">Destaques da Rota</h3>
              </div>
              <ul className="space-y-2">
                {route.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>Dica:</strong> Leve água, protetor solar e use calçado apropriado. Respeite a natureza e não deixe lixo no caminho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
