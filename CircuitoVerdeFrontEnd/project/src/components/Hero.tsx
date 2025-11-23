import { ArrowRight, Compass, Map, Mountain } from 'lucide-react';

type HeroProps = {
  onNavigate: (view: string) => void;
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Descubra o{' '}
            <span className="text-green-600 relative inline-block">
              Circuito Verde
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C20 5 60 2 100 5C140 8 180 7 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-green-600"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore trilhas, cachoeiras, atrações culturais e rotas de ciclismo em um dos destinos mais belos da região.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('attractions')}
              className="group px-8 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Explorar Atrações</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('routes')}
              className="group px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-medium hover:bg-green-50 transition-all flex items-center space-x-2"
            >
              <span>Ver Rotas</span>
              <Map className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mountain className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Natureza Preservada</h3>
            <p className="text-gray-600 text-sm">
              Paisagens deslumbrantes e ecossistemas únicos te esperam
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Compass className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aventuras Guiadas</h3>
            <p className="text-gray-600 text-sm">
              Rotas detalhadas para todos os níveis de experiência
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Map className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cultura Local</h3>
            <p className="text-gray-600 text-sm">
              Conheça tradições, gastronomia e história da região
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
