import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { DetailDiagnosticoComponent } from './components/diagnostico/detail-diagnostico/detail-diagnostico.component';
import { IncidenciaComponent } from './pages/incidencia/incidencia.component';
import { CreateIncidenciaComponent } from './components/incidencia/create-incidencia/create-incidencia.component';
import { UpdateIncidenciaComponent } from './components/incidencia/update-incidencia/update-incidencia.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';

@NgModule({
  declarations: [
    AppComponent,
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
    DetailDiagnosticoComponent,
    IncidenciaComponent,
    CreateIncidenciaComponent,
    UpdateIncidenciaComponent,
    LoginComponent,
    DashboardComponent,
    AcercaDeComponent,
    TerminosCondicionesComponent,
    PoliticaPrivacidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
