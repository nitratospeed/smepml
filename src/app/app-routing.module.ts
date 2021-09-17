import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { IncidenciaComponent } from './pages/incidencia/incidencia.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'usuario', component: UsuarioComponent},
  {path: 'paciente', component: PacienteComponent},
  {path: 'diagnostico', component: DiagnosticoComponent},
  {path: 'incidencia', component: IncidenciaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
