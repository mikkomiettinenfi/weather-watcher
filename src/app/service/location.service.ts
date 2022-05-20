import { Injectable } from '@angular/core';
import {ILocation} from "../types/weather.type";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _locations!: Array<ILocation>;

  constructor() {
    this.initializeLocations();
  }

  public getLocations(): Array<ILocation> {
    return this._locations;
  }

  public setLocation(location: ILocation): void {
    this._locations.push(location);
  }

  private initializeLocations(): void {
    this._locations = [
      { name: 'Athens', latitude: 37.9792, longitude: 23.7166 },
      { name: 'Berlin', latitude: 52.5235, longitude: 13.4115 },
      { name: 'London', latitude: 51.5002, longitude: -0.1262 },
      { name: 'Moscow', latitude: 55.7558, longitude: 37.6176 },
      { name: 'Paris', latitude: 48.8567, longitude: 2.3510 },
      { name: 'Rome', latitude: 41.8955, longitude: 12.4823 },
      { name: 'Washington', latitude: 38.8921, longitude: -77.0241 },
      { name: 'Ciudad de Mexico', latitude: 19.4271, longitude: -99.1276 },
      { name: 'Bogota', latitude: 4.6473, longitude: -74.0962 },
      { name: 'Brasilia', latitude: -15.7801, longitude: -47.9292 },
      { name: 'Buenos Aires', latitude: -34.6118, longitude: -58.4173 },
      { name: 'Ankara', latitude: 39.9439, longitude: 32.8560 },
      { name: 'Peking', latitude: 39.9056, longitude: 116.3958 },
      { name: 'Tokyo', latitude: 35.6785, longitude: 139.6823 },
      { name: 'New Delhi', latitude: 28.6353, longitude: 77.2250 },
      { name: 'Tehran', latitude: 35.7061, longitude: 51.4358 },
      { name: 'Kabul', latitude: 34.5155, longitude: 69.1952 },
      { name: 'Cairo', latitude: 30.0571, longitude: 31.2272 },
      { name: 'Nairobi', latitude: -1.2762, longitude: 36.7965 },
      { name: 'Luanda', latitude: -8.8159, longitude: 13.2306 },
      { name: 'Pretoria', latitude: -25.7463, longitude: 28.1876 },
      { name: 'Canberra', latitude: -35.2820, longitude: 149.1286 }
    ];
  }
}
