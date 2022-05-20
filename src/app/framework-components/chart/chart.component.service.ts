import { Injectable } from '@angular/core';
import {IWeatherData, IWeatherHourly} from "../../types/weather.type";
import {Options, SeriesOptionsType} from "highcharts";

@Injectable()
export class ChartComponentService {

  constructor() {}

  public mapWeatherDataToHighcharts(data: IWeatherData): Options {
    let options: Options = {
      chart: {
        height: 300
      },
      series: [{
        data: data.daily.temperature_2m_max,
        type: 'line'
      }]
    }
    return options;
  }

  public filterWeatherData(data: IWeatherData, dateFilter: Date): Options {
    const hourlyFiltered = this.filterSeriesDataByDate(data.hourly, dateFilter);
    const options: Options = {
      chart: {},
      series: [{
        data: hourlyFiltered.temperature_2m,
        type: 'line'
      }]
    };
    return options;
  }

  /**
   * Filters Open-Meteo hourly data to selected date
   * @param hourly object to filter
   * @param date containing target day for filtering
   * @returns hourly object with filtered data
   */
  private filterSeriesDataByDate(hourly: IWeatherHourly, date: Date): IWeatherHourly {
    const compareDate = new Date(date).setHours(0,0,0,0);
    const hourlyFiltered: IWeatherHourly = {
      time: [],
      precipitation: [],
      temperature_2m: []
    };
    for (let i = 0; i < hourly.time.length; i++) {
      const dt = new Date(hourly.time[i]).setHours(0,0,0,0);
      if (dt === compareDate) {
        hourlyFiltered.time.push(hourly.time[i]);
        hourlyFiltered.precipitation.push(hourly.precipitation[i]);
        hourlyFiltered.temperature_2m.push(hourly.temperature_2m[i]);
      }
    }
    return hourlyFiltered;
  }

  mapWeatherDataArrayToHighcharts(dataArray: IWeatherData[]): Options {
    let options: Options = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Combined temperatures',
        x: 20
      },
      subtitle: {
        text: 'Source: Open-Meteo.com',
        x: 20
      },
      xAxis: {
        categories: ['days']
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },

      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0,
        y: 100
      },

      series: []
    }
    dataArray.forEach(data => {
      const series = {
        name: data.name,
        data: data.daily.temperature_2m_max,
        visible: true
      };
      options.series?.push(series as SeriesOptionsType);
    });
    return options;
  }
}
