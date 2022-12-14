import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-consulta',
  templateUrl: './persona-consulta.component.html',
  styleUrls: ['./persona-consulta.component.css']
})
export class PersonaConsultaComponent implements OnInit {
  Personas: Persona[]; 
  searchText: string;
  constructor(private PersonaService:PersonaService) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this.PersonaService.get().subscribe(result=>{
      this.Personas=result;
    });
  }
}

