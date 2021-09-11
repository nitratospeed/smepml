import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},

  {path: 'usuario', component: UsuarioComponent},
  {path: 'paciente', component: PacienteComponent},
  {path: 'diagnostico', component: DiagnosticoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
