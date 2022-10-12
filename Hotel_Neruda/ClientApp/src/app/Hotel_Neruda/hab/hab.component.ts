import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Habitacion } from '../models/habitacion';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-hab',
  templateUrl: './hab.component.html',
  styleUrls: ['./hab.component.css']
})
export class HabComponent implements OnInit {
  habs:Habitacion[] = [];
  now = new Date();
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private _hS:HabitacionService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this._hS.reporte().subscribe(
      data => {
        this.habs = data;
      }
    );
  }

}
