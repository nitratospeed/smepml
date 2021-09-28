import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { IncidenciaComponent } from './pages/incidencia/incidencia.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: 'paciente', component: PacienteComponent, canActivate: [AuthGuard]},
  {path: 'diagnostico', component: DiagnosticoComponent, canActivate: [AuthGuard]},
  {path: 'incidencia', component: IncidenciaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
