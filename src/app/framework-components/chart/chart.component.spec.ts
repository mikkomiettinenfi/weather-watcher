import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import {ChartComponentService} from "./chart.component.service";
import {WeatherDataService} from "../../service/weather-data.service";
import {ChangeDetectorRef} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RestService} from "../../service/rest.service";

/*
describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ChartComponent ],
      providers: [
        ChartComponentService,
        WeatherDataService,
        ChangeDetectorRef,
        RestService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
