import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiagnosticoHistorialComponent } from './components/diagnostico-historial/diagnostico-historial.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CreateUsuarioComponent } from './components/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './components/usuario/update-usuario/update-usuario.component';
import { DeleteUsuarioComponent } from './components/usuario/delete-usuario/delete-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    DashboardComponent,
    DiagnosticoComponent,
    DiagnosticoHistorialComponent,
    UsuarioComponent,
    CreateUsuarioComponent,
    UpdateUsuarioComponent,
    DeleteUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
