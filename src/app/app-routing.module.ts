import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from "./pages/front-page/front-page.component";
import { AboutComponent } from "./pages/about/about.component";

const routes: Routes = [
  {
    path: 'weather-watcher',
    loadChildren: () => import('./weather-watcher/weather-watcher.module')
      .then(m => m.WeatherWatcherModule)
  },
  { path: 'about', component: AboutComponent },
  { path: '', component: FrontPageComponent },
  { path: '*', component: FrontPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
