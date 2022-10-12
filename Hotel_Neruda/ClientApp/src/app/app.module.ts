import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { HabitacionConsultaComponent } from './Hotel_Neruda/habitacion-consulta/habitacion-consulta.component';
import { HabitacionRegistroComponent } from './Hotel_Neruda/habitacion-registro/habitacion-registro.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReservaConsultaComponent } from './Hotel_Neruda/reserva-consulta/reserva-consulta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { LoginComponent } from './login/login.component';
import { PersonaRegistroComponent } from './Hotel_Neruda/persona-registro/persona-registro.component';
import { PersonaConsultaComponent } from './Hotel_Neruda/persona-consulta/persona-consulta.component';
import { ReservarComponent } from './Hotel_Neruda/reservar/reservar.component';
import { PersonaPipe } from './pipe/persona.pipe';
import { HabPipe } from './pipe/hab.pipe';
import { ReserPipe } from './pipe/reser.pipe';
import { ReservaModComponent } from './Hotel_Neruda/reserva-mod/reserva-mod.component';
import { CamModalComponent } from './@base/cam-modal/cam-modal.component';
import { EditModalComponent } from './@base/edit-modal/edit-modal.component';
import { FacturaConsultaComponent } from './Hotel_Neruda/factura-consulta/factura-consulta.component';
import { FctPipe } from './pipe/fct.pipe';
import { FctiPipe } from './pipe/fcti.pipe';
import { FacturaComponent } from './Hotel_Neruda/factura/factura.component';
import { ReporteComponent } from './Hotel_Neruda/reporte/reporte.component';
import { HabComponent } from './Hotel_Neruda/hab/hab.component';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    HabitacionConsultaComponent,
    HabitacionRegistroComponent,
    HeaderComponent,
    FooterComponent,
    ReservaConsultaComponent,
    AlertModalComponent,
    LoginComponent,
    PersonaRegistroComponent,
    PersonaConsultaComponent,
    ReservarComponent,
    PersonaPipe,
    HabPipe,
    ReserPipe,
    ReservaModComponent,
    CamModalComponent,
    EditModalComponent,
    FacturaConsultaComponent,
    FctPipe,
    FctiPipe,
    FacturaComponent,
    ReporteComponent,
    HabComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  entryComponents:[AlertModalComponent, CamModalComponent, EditModalComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
