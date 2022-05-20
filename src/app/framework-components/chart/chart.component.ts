import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {IColor, IWeatherData} from "../../types/weather.type";
import {ChartComponentService} from "./chart.component.service";
import * as Highcharts from 'highcharts';
import {Options} from "highcharts";
import {WeatherDataService} from "../../service/weather-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ChartComponentService]
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  private _weatherData!: IWeatherData;
  private _dateFilter!: Date | null;
  private _weatherDataArray!: IWeatherData[];
  @Input()
  set dateFilter(date: Date | null) {
    if (date && date instanceof Date && !isNaN(date.getTime())) {
      // Is valid instance
      const time: number = date.getTime();
      const now: number = new Date().getTime();
      const max = now + 2500000000;
      const min = now - 2500000000;

      // Allow only reasonable dates (about 4 weeks here)
      if (time <= max && time >= min) {
        this._dateFilter = date;
        this.chartOptionsFiltered = this.chartService
          .filterWeatherData(this.weatherData, this.dateFilter as Date);
        console.log(this.chartOptionsFiltered);
      } else {
        this._dateFilter = null;
      }

    }
  }

  get dateFilter(): Date | null {
    return this._dateFilter;
  }

  @Input()
  set weatherDataArray(value: IWeatherData[]) {
    this.cdr.detectChanges();
    this._weatherDataArray = [];
    this._weatherDataArray.push(...value);
    this.chartOptions = {};
    const options = this.chartService
      .mapWeatherDataArrayToHighcharts(value);
    const optionsJson = JSON.stringify(options);
    this.chartOptions = JSON.parse(optionsJson);
    this.lineColorChangeForSingle();
    this.updateChart = true;
  }

  get weatherDataArray(): IWeatherData[] {
    return this._weatherDataArray;
  }

  @Input()
  set weatherData(value: IWeatherData) {
    this._weatherData = value;
    // Array overrides single data
    if (!this.weatherDataArray) {
      this.chartOptions = this.chartService
        .mapWeatherDataToHighcharts(value);
      this.lineColorChangeForSingle();
    }
  }

  get weatherData(): IWeatherData {
    return this._weatherData;
  }

  weatherDataSubscription!: Subscription;

  // Highchart
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {};
  chartOptionsFiltered: Options = {};
  updateChart!: boolean;

  // Line color
  lineRed = 160;
  lineGreen = 160;
  lineBlue = 160;

  // Chart type
  chartType!: string;

  constructor(private chartService: ChartComponentService,
              private weatherDataService: WeatherDataService,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    if (this.weatherDataArray) {
      this.weatherDataSubscription = this.weatherDataService.lineColor
        .subscribe(data => {
          this.lineColorChangeForArray(data);
        });
    }
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart = true;
  }

  private lineColorChangeForArray(color: IColor): void {
    if (this.chartOptions.series && this.chartOptions.series.length > 0) {
      this.chartOptions.series.forEach(s => {
        if (s.name === color.name) {
          s.color = color.color;
        }
      });
      this.chartOptions = {...this.chartOptions};
    }

    if (this.chartOptionsFiltered.series && this.chartOptionsFiltered.series.length > 0) {
      this.chartOptionsFiltered.series.forEach(s => {
        if (s.name === color.name) {
          s.color = color.color;
        }
      });
      this.chartOptionsFiltered = {...this.chartOptionsFiltered};
    }
  }

  public lineColorChangeForSingle(): void {
    const hexRed = this.lineRed.toString(16);
    const hexGreen = this.lineGreen.toString(16);
    const hexBlue = this.lineBlue.toString(16);
    const newColor = `#${hexRed}${hexGreen}${hexBlue}`;

    if (this.chartOptions.series && this.chartOptions.series.length > 0) {
      this.chartOptions.series.forEach(s => s.color = newColor);
      this.chartOptions = {...this.chartOptions};
    }

    if (this.chartOptionsFiltered.series && this.chartOptionsFiltered.series.length > 0) {
      this.chartOptionsFiltered.series.forEach(s => s.color = newColor);
      this.chartOptionsFiltered = {...this.chartOptionsFiltered};
    }
    this.weatherDataService.lineColor
      .next({ name: this.weatherData?.name, color: newColor });
  }

  ngModelChange(): void {
    this.changeChartType(this.chartOptions, this.chartOptionsFiltered);
  }

  private changeChartType(data: Options, dataFiltered: Options): void {
    if (data.series && data.series.length > 0) {
      data.series.forEach(s => s.type = this.chartType as any);
      this.chartOptions = {...data};
    }
    if (dataFiltered.series && dataFiltered.series.length > 0) {
      dataFiltered.series.forEach(s => s.type = this.chartType as any);
      this.chartOptionsFiltered = {...dataFiltered};
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy(): void {
    if (this.weatherDataSubscription) {
      this.weatherDataSubscription.unsubscribe();
    }
  }
}
