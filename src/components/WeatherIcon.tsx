import React from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 24, className }) => {
  const getIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} className={cn("text-weather-sunny", className)} />;
      case 'rainy':
        return <CloudRain size={size} className={cn("text-weather-rainy", className)} />;
      case 'cloudy':
        return <Cloud size={size} className={cn("text-weather-cloudy", className)} />;
      case 'snowy':
        return <CloudSnow size={size} className={cn("text-weather-snowy", className)} />;
      case 'night':
        return <Moon size={size} className={cn("text-weather-night", className)} />;
      default:
        return <Sun size={size} className={cn("text-weather-sunny", className)} />;
    }
  };

  return getIcon();
};