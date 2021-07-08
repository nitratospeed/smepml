import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { SettingsComponent } from './components/shared/settings/settings.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosticoHistorialComponent } from './components/diagnostico-historial/diagnostico-historial.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SettingsComponent,
    PacientesComponent,
    DashboardComponent,
    DiagnosticoComponent,
    DiagnosticoHistorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
