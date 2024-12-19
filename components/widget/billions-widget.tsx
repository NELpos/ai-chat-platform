import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeatherIcon } from "@/components/widget/weather-icon";
type BillionsProps = {
  name: string;
  netWorth: number;
  status: string;
};

export const BillionsWidget = ({ name, netWorth, status }: BillionsProps) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{name} 재산</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div>
              <p className="text-2xl font-bold">${netWorth.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {status}
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
