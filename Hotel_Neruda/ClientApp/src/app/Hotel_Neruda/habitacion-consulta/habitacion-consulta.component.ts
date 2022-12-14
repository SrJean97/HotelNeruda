import { Component, OnInit } from '@angular/core';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { Habitacion } from '../models/habitacion';

@Component({
  selector: 'app-habitacion-consulta',
  templateUrl: './habitacion-consulta.component.html',
  styleUrls: ['./habitacion-consulta.component.css']
})
export class HabitacionConsultaComponent implements OnInit {

  habitaciones: Habitacion[]; 
  searchText: string;
  hS:HabitacionService;

  constructor(private habitacionService:HabitacionService) { this.hS = habitacionService; }

  ngOnInit() {
    this.get();
  }
  get(){
    this.habitacionService.get().subscribe(result=>{
      this.habitaciones=result;
    });
  }
}
