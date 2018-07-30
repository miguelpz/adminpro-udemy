import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedsModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.route';



@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent
    ],
    exports: [
         DashboardComponent,
         ProgressComponent,
         Graficas1Component,
         PagesComponent
    ],
    imports: [
        SharedsModule,
        PAGES_ROUTES
   ]

  })
  export class PagesModule {}
