import {Injectable, OnDestroy} from '@angular/core';
import { RestService } from "./rest.service";
import {BehaviorSubject, concatMap, delay, map, of, Subject, Subscription, tap} from "rxjs";
import {IColor, IForecastDTO, ILocation, IWeatherData} from "../types/weather.type";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  public weatherData = new BehaviorSubject<IWeatherData[]>([]);
  public lineColor = new Subject<IColor>();

  constructor(private rest: RestService) {
  }

  public addWeatherData(location: ILocation) {
    this.setWeatherData(location);
  }

  public getWeatherData(location: ILocation): IWeatherData[] {
    return this.weatherData.getValue();
  }

  public removeWeatherData(location: ILocation) {
    this.weatherData.next(this.weatherData.getValue().filter(i => i.name !== location.name));
  }

  public clearWeatherData() {
    this.weatherData.next([]);
  }

  private setWeatherData(location: ILocation) {
    this.rest.getForecast(location)
      .pipe(map(this.mapForecastToData),
        tap(d => d.name = location.name))
      .subscribe(data => this.updateOrPushData(data));
  }

  private updateOrPushData(data: IWeatherData) {
    if (this.isDataInList(data)) {
      this.weatherData.next(this.weatherData.value.map((weatherData: IWeatherData) =>
        weatherData.name === data.name ? data : weatherData
      ));
    } else {
      this.weatherData.next(this.weatherData.value.concat(data));
    }
  }

  private isDataInList(data: IWeatherData): boolean {
    const result = this.weatherData.getValue()
      .findIndex(item => item.name === data.name);
    return result >= 0;
  }

  private mapForecastToData(dto: IForecastDTO): IWeatherData {
    const data = {} as IWeatherData;
    Object.keys(dto).forEach((key: string) => {
      // @ts-ignore
      data[key] = dto[key];
    });
    return data;
  }
}
