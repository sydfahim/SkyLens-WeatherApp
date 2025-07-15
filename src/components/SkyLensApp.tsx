import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sun, Moon, Thermometer, Droplets, Eye, Gauge, Wind } from 'lucide-react';
import { Button } from './ui/button';
import { WeatherIcon } from './WeatherIcon';
import { cn } from '@/lib/utils';

interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  uvIndex: number;
}

interface ForecastData {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export const SkyLensApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [savedLocations] = useState(['New York', 'London', 'Tokyo']);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  // Mock weather data
  const mockWeatherData: Record<string, WeatherData> = {
    'New York': {
      location: 'New York',
      temp: 22,
      condition: 'sunny',
      description: 'Clear sky',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      pressure: 1013,
      feelsLike: 25,
      uvIndex: 6
    },
    'London': {
      location: 'London',
      temp: 15,
      condition: 'rainy',
      description: 'Light rain',
      humidity: 80,
      windSpeed: 8,
      visibility: 8,
      pressure: 1008,
      feelsLike: 13,
      uvIndex: 2
    },
    'Tokyo': {
      location: 'Tokyo',
      temp: 28,
      condition: 'cloudy',
      description: 'Partly cloudy',
      humidity: 70,
      windSpeed: 15,
      visibility: 12,
      pressure: 1015,
      feelsLike: 31,
      uvIndex: 7
    }
  };

  const mockForecast: ForecastData[] = [
    { day: 'Tomorrow', high: 25, low: 18, condition: 'sunny' },
    { day: 'Thursday', high: 23, low: 16, condition: 'cloudy' },
    { day: 'Friday', high: 20, low: 14, condition: 'rainy' }
  ];

  // Get weather background gradient
  const getWeatherBackground = (condition: string) => {
    const backgrounds = {
      sunny: 'bg-gradient-sunny',
      rainy: 'bg-gradient-rainy',
      cloudy: 'bg-gradient-cloudy',
      snowy: 'bg-gradient-snowy',
      night: 'bg-gradient-night'
    };
    return backgrounds[condition as keyof typeof backgrounds] || 'bg-gradient-default';
  };

  // Convert temperature units
  const convertTemp = (temp: number) => {
    if (tempUnit === 'F') {
      return Math.round(temp * 9/5 + 32);
    }
    return Math.round(temp);
  };

  // Simulate API call
  const fetchWeather = async (city: string) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const weatherData = mockWeatherData[city] || mockWeatherData['New York'];
    setWeather(weatherData);
    setForecast(mockForecast);
    setLoading(false);
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('Current Location');
          fetchWeather('New York'); // Mock for demo
        },
        (error) => {
          console.error('Error getting location:', error);
          fetchWeather('New York');
        }
      );
    } else {
      fetchWeather('New York');
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  // Initialize with current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      isDarkMode ? 'bg-gray-900' : weather ? getWeatherBackground(weather.condition) : 'bg-gradient-default'
    )}>
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-glass border border-white/30">
            <Eye size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Skylens</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
            variant="glass-round"
            size="sm"
          >
            °{tempUnit}
          </Button>
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="glass-round"
            size="sm"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-6">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search for a city..."
              className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-glass rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/30 transition-smooth"
            />
            <Search size={20} className="absolute left-4 top-3.5 text-white/70" />
            <Button
              type="submit"
              variant="glass"
              size="sm"
              className="absolute right-3 top-2"
            >
              Search
            </Button>
          </form>
          
          {/* Quick Location Access */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              onClick={getCurrentLocation}
              variant="glass-round"
              size="sm"
              className="flex items-center space-x-1"
            >
              <MapPin size={16} />
              <span>Current</span>
            </Button>
            {savedLocations.map(city => (
              <Button
                key={city}
                onClick={() => fetchWeather(city)}
                variant="glass-round"
                size="sm"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Weather Card */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : weather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              <div className="bg-white/20 backdrop-blur-glass rounded-3xl p-8 h-full border border-white/30 shadow-glass">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{weather.location}</h2>
                    <p className="text-white/80">{weather.description}</p>
                  </div>
                  <div className="text-right">
                    <WeatherIcon condition={weather.condition} size={64} />
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-6xl font-light text-white">{convertTemp(weather.temp)}</span>
                  <span className="text-2xl text-white/80">°{tempUnit}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Thermometer size={18} />
                    <span>Feels like {convertTemp(weather.feelsLike)}°</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind size={18} />
                    <span>{weather.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets size={18} />
                    <span>{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge size={18} />
                    <span>{weather.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* UV Index & Visibility */}
              <div className="bg-white/20 backdrop-blur-glass rounded-3xl p-6 border border-white/30 shadow-glass">
                <h3 className="text-white font-semibold mb-4">Details</h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between">
                    <span>UV Index</span>
                    <span className="font-medium">{weather.uvIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visibility</span>
                    <span className="font-medium">{weather.visibility} km</span>
                  </div>
                </div>
              </div>
              
              {/* 3-Day Forecast */}
              <div className="bg-white/20 backdrop-blur-glass rounded-3xl p-6 border border-white/30 shadow-glass">
                <h3 className="text-white font-semibold mb-4">3-Day Forecast</h3>
                <div className="space-y-3">
                  {forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between text-white/80">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <WeatherIcon condition={day.condition} size={20} />
                        <span>{convertTemp(day.high)}°/{convertTemp(day.low)}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};