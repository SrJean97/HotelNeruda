import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from './Hotel_Neruda/models/persona';
import { ServicioAutenticacion } from './services/servicio-autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }
  
}
