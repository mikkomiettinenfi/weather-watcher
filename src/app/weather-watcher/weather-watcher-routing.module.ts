import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherWatcherDashboardComponent } from "./weather-watcher-dashboard/weather-watcher-dashboard.component";

const routes: Routes = [
  { path: '', component: WeatherWatcherDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherWatcherRoutingModule { }
