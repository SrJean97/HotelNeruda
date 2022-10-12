import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionConsultaComponent } from './Hotel_Neruda/habitacion-consulta/habitacion-consulta.component';
import { HabitacionRegistroComponent } from './Hotel_Neruda/habitacion-registro/habitacion-registro.component';
import { ReservaConsultaComponent } from './Hotel_Neruda/reserva-consulta/reserva-consulta.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PersonaConsultaComponent } from './Hotel_Neruda/persona-consulta/persona-consulta.component';
import { PersonaRegistroComponent } from './Hotel_Neruda/persona-registro/persona-registro.component';
import { ReservarComponent } from './Hotel_Neruda/reservar/reservar.component';
import { ReservaModComponent } from './Hotel_Neruda/reserva-mod/reserva-mod.component';
import { FacturaConsultaComponent } from './Hotel_Neruda/factura-consulta/factura-consulta.component';
import { ReporteComponent } from './Hotel_Neruda/reporte/reporte.component';
import { FacturaComponent } from './Hotel_Neruda/factura/factura.component';
import { HabComponent } from './Hotel_Neruda/hab/hab.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'personaConsulta',
    component: PersonaConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'personaRegistro',
    component: PersonaRegistroComponent
  },
  {
    path: 'habitacionConsulta',
    component: HabitacionConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'hab',
    component: HabComponent, canActivate: [AuthGuard]
  },
  {
    path: 'habitacionRegistro',
    component: HabitacionRegistroComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reservar',
    component: ReservarComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reservaModificar',
    component: ReservaModComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reservaConsulta',
    component: ReservaConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'facturaConsulta',
    component: FacturaConsultaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reporte',
    component: ReporteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'factura',
    component: FacturaComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
