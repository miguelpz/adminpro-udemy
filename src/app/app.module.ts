
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { MedicoComponent } from './pages/medicos/medico.component';
import { PagesComponent } from './pages/pages.component';
import { SharedsModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    SharedsModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
