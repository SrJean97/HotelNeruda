import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Factura } from '../models/Factura';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  now = new Date();
  fcts:Factura[]=[];
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion
    , public _fS:FacturaService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.fcts = this._fS.fcts;
  }

}
