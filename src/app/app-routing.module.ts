import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { IncidenciaComponent } from './pages/incidencia/incidencia.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { CreateDiagnosticoComponent } from './components/diagnostico/create-diagnostico/create-diagnostico.component';

const routes: Routes = [
  {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: 'paciente', component: PacienteComponent, canActivate: [AuthGuard]},
  {path: 'diagnostico', component: DiagnosticoComponent, canActivate: [AuthGuard]},
  {path: 'diagnostico-create', component: CreateDiagnosticoComponent, canActivate: [AuthGuard]},
  {path: 'incidencia', component: IncidenciaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'acerca_de', component: AcercaDeComponent, canActivate: [AuthGuard]},
  {path: 'politica_privacidad', component: PoliticaPrivacidadComponent, canActivate: [AuthGuard]},
  {path: 'terminos_condiciones', component: TerminosCondicionesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
