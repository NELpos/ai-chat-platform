import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";

type WeatherIconProps = {
  condition: string;
  className?: string;
};

export function WeatherIcon({ condition, className }: WeatherIconProps) {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className={className} />;
    case "cloudy":
      return <Cloud className={className} />;
    case "rainy":
      return <CloudRain className={className} />;
    case "drizzle":
      return <CloudDrizzle className={className} />;
    case "snowy":
      return <CloudSnow className={className} />;
    case "stormy":
      return <CloudLightning className={className} />;
    default:
      return <Sun className={className} />;
  }
}
