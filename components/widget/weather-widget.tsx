import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeatherIcon } from "@/components/widget/weather-icon";
type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const WeatherWidget = ({
  temperature,
  weather,
  location,
}: WeatherProps) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{location} 날씨</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <WeatherIcon condition={weather} className="w-12 h-12 mr-2" />
            <div>
              <p className="text-2xl font-bold">{temperature}°C</p>
              <p className="text-sm text-muted-foreground capitalize">
                {weather}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium">{day.day}</p>
                <WeatherIcon
                  condition={day.condition}
                  className="w-6 h-6 mx-auto my-1"
                />
                <p className="text-sm">{day.temperature}°C</p>
              </div>
            ))}
          </div> */}
      </CardContent>
    </Card>
  );
};
