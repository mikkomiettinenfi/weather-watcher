import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IForecastDTO, ILocation } from "../types/weather.type";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getForecast(location: ILocation): Observable<IForecastDTO> {
    const httpParams: HttpParams = new HttpParams()
      .set('latitude', location.latitude)
      .set('longitude', location.longitude)
      .set('hourly', 'temperature_2m,precipitation')
      .set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum')
      .set('timezone', 'Europe/Kirov');

    const options = {
      params: httpParams,
    }

    return this.http.get<IForecastDTO>(this.baseUrl, options)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage: string;
    switch (error.status) {
      case 404:
        errorMessage = 'Forecast was not found';
        break;
      default:
        errorMessage = 'Unknown error occurred';
    }
    return throwError(() => new Error(errorMessage));

  }
}
