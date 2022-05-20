import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';
import {ChartComponentService} from "../../framework-components/chart/chart.component.service";
import {WeatherDataService} from "../../service/weather-data.service";
import {ChangeDetectorRef} from "@angular/core";

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
