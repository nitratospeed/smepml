import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import { DiagnosticoHistorialComponent } from './components/diagnostico-historial/diagnostico-historial.component';

const routes: Routes = [
  {path: 'paciente', component: PacientesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'diagnostico', component: DiagnosticoComponent},
  {path: 'diagnostico-historial', component: DiagnosticoHistorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
