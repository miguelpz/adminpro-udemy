import { NgModule } from '@angular/core';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ]
  })
  export class PagesModule {}
