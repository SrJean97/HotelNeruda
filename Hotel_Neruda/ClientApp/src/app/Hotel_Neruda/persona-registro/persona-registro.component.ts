import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {
  persona:Persona = new Persona();
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private PersonaService:PersonaService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.persona= new Persona();
  }
  add(){
    if (!this.currentUser) this.persona.tipo = 'C';
    console.log(this.persona);
    this.PersonaService.post(this.persona).subscribe(p => {
      if (p != null) {      
        alert('Persona Registrado!');      
      }
      else
        alert('Ya se ha registrado esta identificación');      
      });
  }
  
}