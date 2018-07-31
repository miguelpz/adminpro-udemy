import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedsModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.route';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent

    ],
    exports: [
         DashboardComponent,
         ProgressComponent,
         Graficas1Component,
         PagesComponent,
         GraficoDonaComponent
    ],
    imports: [
        SharedsModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule


   ]

  })
  export class PagesModule {}
