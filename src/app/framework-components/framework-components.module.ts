import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { MatCardModule } from "@angular/material/card";
import { HighchartsChartModule } from 'highcharts-angular';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    HighchartsChartModule,
    MatSliderModule,
    FormsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ChartComponent
  ]
})
export class FrameworkComponentsModule { }
