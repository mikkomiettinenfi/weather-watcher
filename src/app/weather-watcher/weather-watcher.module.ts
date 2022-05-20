import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherWatcherRoutingModule } from './weather-watcher-routing.module';
import { WeatherWatcherDashboardComponent } from './weather-watcher-dashboard/weather-watcher-dashboard.component';
import { FrameworkComponentsModule } from "../framework-components/framework-components.module";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [
    WeatherWatcherDashboardComponent
  ],
    imports: [
        CommonModule,
        WeatherWatcherRoutingModule,
        FrameworkComponentsModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class WeatherWatcherModule { }
