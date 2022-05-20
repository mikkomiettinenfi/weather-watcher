import { TestBed } from '@angular/core/testing';

import { ChartComponentService } from './chart.component.service';
import {IWeatherData} from "../../types/weather.type";
import {Options, SeriesOptionsType} from "highcharts";

describe('ChartComponentService', () => {
  let service: ChartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartComponentService]
    });
    service = TestBed.inject(ChartComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('map WeatherData to Highcharts', () => {
    it('should map WeatherData to Highcharts', () => {
      const data = {
        daily: {
          temperature_2m_max: [0,1,2,3,4,5,6,7,8,9]
        }
      } as IWeatherData;
      const options: Options = service.mapWeatherDataToHighcharts(data);
      expect(options).toBeTruthy();
      expect(Object.keys(options).length).toBe(2);
      expect(options.series?.length).toBe(1);
      // @ts-ignore
      const series = options.series[0] as SeriesOptionsType;
      expect(series.type).toBe('line');
      expect((series as any).data.length).toBe(10);
      expect((series as any).data[0]).toBe(0);
      expect((series as any).data[9]).toBe(9);
      expect(options.chart?.height).toBe(300);

    });
  });
});
