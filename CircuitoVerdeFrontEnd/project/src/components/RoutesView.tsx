import { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { supabase, Route } from '../lib/supabase';
import { RouteCard } from './RouteCard';
import { RouteDetail } from './RouteDetail';

export function RoutesView() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    let filtered = routes;

    if (selectedType !== 'all') {
      filtered = filtered.filter((r) => r.type === selectedType);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((r) => r.difficulty === selectedDifficulty);
    }

    setFilteredRoutes(filtered);
  }, [selectedType, selectedDifficulty, routes]);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('routes')
        .select('*')
        .order('difficulty', { ascending: true });

      if (error) throw error;
      setRoutes(data || []);
      setFilteredRoutes(data || []);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const types = [
    { id: 'all', label: 'Todos os Tipos', icon: '🗺️' },
    { id: 'caminhada', label: 'Caminhada', icon: '🚶' },
    { id: 'ciclismo', label: 'Ciclismo', icon: '🚴' },
    { id: 'trilha', label: 'Trilha', icon: '🥾' },
  ];

  const difficulties = [
    { id: 'all', label: 'Todos os Níveis', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { id: 'facil', label: 'Fácil', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: 'moderado', label: 'Moderado', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'dificil', label: 'Difícil', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando rotas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Rotas e Trilhas</h1>
          <p className="text-lg text-emerald-50 max-w-2xl">
            Explore caminhos para caminhada, ciclismo e trilhas. Encontre a rota perfeita para o seu nível de experiência.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Tipo de Atividade</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                  selectedType === type.id
                    ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Nível de Dificuldade</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty.id
                    ? `${difficulty.color} ring-2 ring-offset-2 ring-green-600`
                    : difficulty.color
                }`}
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>

        {filteredRoutes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhuma rota encontrada com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} onClick={() => setSelectedRoute(route)} />
            ))}
          </div>
        )}
      </div>

      {selectedRoute && <RouteDetail route={selectedRoute} onClose={() => setSelectedRoute(null)} />}
    </div>
  );
}
