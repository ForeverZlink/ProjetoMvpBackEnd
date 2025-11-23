import { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { supabase, Attraction } from '../lib/supabase';
import { AttractionCard } from './AttractionCard';
import { AttractionDetail } from './AttractionDetail';

export function AttractionsView() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttractions();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredAttractions(attractions);
    } else {
      setFilteredAttractions(attractions.filter((a) => a.category === selectedCategory));
    }
  }, [selectedCategory, attractions]);

  const fetchAttractions = async () => {
    try {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setAttractions(data || []);
      setFilteredAttractions(data || []);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'Todas', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { id: 'natureza', label: 'Natureza', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: 'cultura', label: 'Cultura', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'aventura', label: 'Aventura', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { id: 'gastronomia', label: 'Gastronomia', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando atrações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Atrações do Circuito Verde</h1>
          <p className="text-lg text-green-50 max-w-2xl">
            Descubra lugares incríveis para visitar, desde cachoeiras e trilhas até restaurantes e centros culturais.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrar por Categoria</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} ring-2 ring-offset-2 ring-green-600`
                    : category.color
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {filteredAttractions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhuma atração encontrada nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                onClick={() => setSelectedAttraction(attraction)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedAttraction && (
        <AttractionDetail
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </div>
  );
}
