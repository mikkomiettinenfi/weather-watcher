
export interface ILocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface IWeatherDaily {
  precipitation_sum: Array<number>;
  temperature_2m_max: Array<number>;
  temperature_2m_min: Array<number>;
  time: Array<string>;
}

export interface IWeatherDailyUnits {
  precipitation_sum: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
}

export interface IWeatherHourly {
  precipitation: Array<number>;
  temperature_2m: Array<number>;
  time: Array<string>;
}

export interface IWeatherHourlyUnits {
  precipitation: string;
  temperature_2m: string;
  time: string;
}

export interface IForecastDTO {
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  utc_offset_seconds: number;
  daily: IWeatherDaily;
  daily_units: IWeatherDailyUnits;
  hourly: IWeatherHourly;
  hourly_units: IWeatherHourlyUnits;
}

export interface IWeatherData extends IForecastDTO {
  name: string;
}

export interface IColor {
  name: string;
  color: string;
  red?: number;
  green?: number;
  blue?: number;
}
