import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Habitacion } from '../models/habitacion';
import { Persona } from '../models/persona';
import { Reserva } from '../models/reserva';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  reserva:Reserva = new Reserva();
  prns:Persona[]; habs:Habitacion[];
  selected:Habitacion;
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private ReservaService:ReservaService, 
    private pS:PersonaService, 
    private hS:HabitacionService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.reserva= new Reserva();
    this.preload();
  }

  preload(){
    this.pS.get().subscribe(
      data => {
        this.prns = data;
      }
    );
    /*this.hS.get().subscribe(
      data => {
        this.habs = data;
        console.log(data);
      }
    );*/
  }

  add(){
    this.reserva.cliente = this.currentUser.tipo=="C" ? this.currentUser.id : this.reserva.cliente;
    if(this.reserva.cliente==""){
      alert('Seleccione un cliente');
      return;
    }
    if(this.reserva.habitacion==0){
      alert('Seleccione una habitación');
      return;
    }
    this.calculate();
    this.ReservaService.post(this.reserva).subscribe(p => {

      if (p != null) {
      
      alert('Reserva Registrado!');
      
      //this.reserva = p;
      
      }
      this.habs = [];
      this.reserva = new Reserva();
      });
  }

  select(o:Habitacion){
    this.selected = o;
    this.calculate();
  }

  calculate(){
    var now = new Date(this.reserva.inicio).getTime();
    var ant = new Date(this.reserva.final).getTime();
    var diff = ((ant-now)/(1000*60*60*24))+1;
    this.reserva.habitacion = this.selected.id;
    this.reserva.base = this.selected.precio * diff;
    this.reserva.total = this.reserva.base + (this.reserva.base * 19 / 100);  
  }

  buscar(){
    if(new Date(this.reserva.inicio).getTime() > new Date(this.reserva.final).getTime()){
      alert('La fecha inicial debe ser menor a la final');
      this.habs = [];
      return;
    }
    this.hS.getDisponible(this.reserva.inicio.toString().split('T')[0], this.reserva.final.toString().split('T')[0]).subscribe(
      data => {
        if(data!=null)
          this.habs = data;
        else
          alert('No existen habitaciones disponibles para ese rango de fechas')
      }
    );
  }

}

