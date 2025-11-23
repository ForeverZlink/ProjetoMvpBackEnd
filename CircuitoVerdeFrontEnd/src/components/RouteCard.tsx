import { Clock, TrendingUp, MapPin, Award } from 'lucide-react';
import { Route } from '../lib/supabase';

type RouteCardProps = {
  route: Route;
  onClick: () => void;
};

export function RouteCard({ route, onClick }: RouteCardProps) {
  const getTypeIcon = (type: string) => {
    const icons = {
      caminhada: '🚶',
      ciclismo: '🚴',
      trilha: '🥾',
    };
    return icons[type as keyof typeof icons] || '🗺️';
  };

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

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={route.image_url || 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg'}
          alt={route.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="px-3 py-1 bg-white rounded-full text-2xl">{getTypeIcon(route.type)}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getDifficultyColor(route.difficulty)}`}>
            {getDifficultyLabel(route.difficulty)}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-green-600">{getTypeLabel(route.type)}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {route.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{route.description}</p>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Distância</p>
              <p className="text-sm font-semibold text-gray-900">{route.distance_km} km</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Duração</p>
              <p className="text-sm font-semibold text-gray-900">{route.duration_hours}h</p>
            </div>
          </div>

          {route.elevation_gain_m > 0 && (
            <>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Elevação</p>
                  <p className="text-sm font-semibold text-gray-900">{route.elevation_gain_m}m</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Nível</p>
                  <p className="text-sm font-semibold text-gray-900">{getDifficultyLabel(route.difficulty)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
