import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Subscription } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  title = 'weather-watcher';
  opened!: boolean;
  isMobile!: boolean;
  breakpointSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.opened = false;
    this.checkBreakpoint();
  }

  ngAfterViewInit(): void {
    this.setSidenavProperties();
  }

  private checkBreakpoint(): void {
     this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((response) => {
        if (response.matches) {
          this.isMobile = true;
          if (this.sidenav) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          }
        } else {
          this.isMobile = false;
          if (this.sidenav) {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
  }

  private setSidenavProperties(): void {
    setTimeout(() => {
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  toggleNav() {
    this.sidenav.toggle();
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }
}
