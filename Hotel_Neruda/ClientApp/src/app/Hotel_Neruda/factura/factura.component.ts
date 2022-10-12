import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Factura } from '../models/Factura';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  now = new Date();
  fS:FacturaService;
  f:Factura;
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
  private _fS:FacturaService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.f = this.fS.fct;
  }

}
