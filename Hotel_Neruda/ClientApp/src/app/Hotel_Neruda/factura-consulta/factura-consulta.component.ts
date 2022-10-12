import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Factura } from '../models/Factura';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-factura-consulta',
  templateUrl: './factura-consulta.component.html',
  styleUrls: ['./factura-consulta.component.css']
})
export class FacturaConsultaComponent implements OnInit {
  facturas: Factura[]; 
  searchText: string;
  sText: string;
  currentUser: Persona;

  constructor(private _fS:FacturaService, private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.get();
  }

  get(){
    this._fS.get().subscribe(
      result => {
        console.log(result);
        this.facturas = result;
      }
    );
  }
  
}