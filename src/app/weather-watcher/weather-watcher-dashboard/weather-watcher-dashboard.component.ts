import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck, IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {WeatherDataService} from "../../service/weather-data.service";
import {LocationService} from "../../service/location.service";
import {ILocation, IWeatherData} from "../../types/weather.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather-watcher-dashboard',
  templateUrl: './weather-watcher-dashboard.component.html',
  styleUrls: ['./weather-watcher-dashboard.component.scss']
})
export class WeatherWatcherDashboardComponent implements OnInit, DoCheck, OnDestroy {
  locations!: Array<ILocation>;
  selectedLocations!: Array<ILocation>;
  weatherData!: IWeatherData[];
  selectedDate!: Date;

  private weatherDataSubscription!: Subscription;
  private selectedLocationsDiffer!: IterableDiffer<ILocation>;

  constructor(private weatherDataService: WeatherDataService,
              private locationService: LocationService,
              private iterableDiffers: IterableDiffers) {

  }

  ngOnInit(): void {
    this.subscribe();
    this.initializeLocations();
    this.selectedLocationsDiffer = this.iterableDiffers
      .find(this.selectedLocations)
      .create();
    this.setInitialWeatherData();
  }

  ngDoCheck(): void {
    let locationChanges : IterableChanges<ILocation> | null = this.selectedLocationsDiffer
      .diff(this.selectedLocations);
    if (locationChanges) {
      locationChanges.forEachAddedItem((change: IterableChangeRecord<ILocation>) => {
        this.weatherDataService.addWeatherData(change.item);
      });
      locationChanges.forEachRemovedItem((change: IterableChangeRecord<ILocation>) => {
        this.weatherDataService.removeWeatherData(change.item);
      });
    }

  }

  private subscribe() {
    this.weatherDataSubscription = this.weatherDataService.weatherData
      .subscribe(data => this.weatherData = data);
  }

  initializeLocations() {
    this.selectedLocations = [];
    this.locations = this.locationService.getLocations();
  }

  setInitialWeatherData() {
    this.weatherDataService.clearWeatherData();
    this.setRandomLocations(6);
  }

  private setRandomLocations(amount: number) {
    while (this.selectedLocations.length < amount) {
      const randomNumber = Math.floor(Math.random() * (21 - 0 + 1) + 0);
      if (!this.isLocationInSelected(this.locations[randomNumber])) {
        this.selectedLocations.push(this.locations[randomNumber]);
      }
    }
  }

  private isLocationInSelected(location: ILocation): boolean {
    const result = this.selectedLocations
      .findIndex(selected => selected.name === location.name);
    return result >= 0;
  }

  ngOnDestroy(): void {
    this.weatherDataSubscription.unsubscribe();
  }
}
