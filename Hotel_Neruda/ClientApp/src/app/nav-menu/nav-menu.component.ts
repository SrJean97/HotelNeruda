import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../Hotel_Neruda/models/persona';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  cerrarSesion() {
    this.servicioAutenticacion.cerrarSesion();
    this.router.navigate(['/']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
