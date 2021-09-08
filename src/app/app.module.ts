import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CreateUsuarioComponent } from './components/usuario/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './components/usuario/update-usuario/update-usuario.component';
import { DeleteUsuarioComponent } from './components/usuario/delete-usuario/delete-usuario.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { CreatePacienteComponent } from './components/paciente/create-paciente/create-paciente.component';
import { UpdatePacienteComponent } from './components/paciente/update-paciente/update-paciente.component';
import { DeletePacienteComponent } from './components/paciente/delete-paciente/delete-paciente.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { CreateDiagnosticoComponent } from './components/diagnostico/create-diagnostico/create-diagnostico.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DiagnosticoComponent,
    UsuarioComponent,
    CreateUsuarioComponent,
    UpdateUsuarioComponent,
    DeleteUsuarioComponent,
    PacienteComponent,
    CreatePacienteComponent,
    UpdatePacienteComponent,
    DeletePacienteComponent,
    CreateDiagnosticoComponent,
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
