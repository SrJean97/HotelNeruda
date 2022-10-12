import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../Hotel_Neruda/models/persona';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';

@Pipe({
  name: 'persona'
})
export class PersonaPipe implements PipeTransform {
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  transform(Persona: Persona[], searchText: string): any {

    if (searchText == null) {
      if(this.currentUser.rol=="A"){  
        return Persona;
      }
      
      if(this.currentUser.tipo=="E"){      
        return Persona.filter(
          p => p.tipo == 'C'      
        );
      }
    }
    
    if(this.currentUser.rol=="A"){  
      return Persona.filter
      ( 
        p => 
          (p.nombre1+p.nombre2+p.apellido1+p.apellido2).toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          p.id.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
      );
    }
    
    if(this.currentUser.tipo=="E"){      
      return Persona.filter(
        p => p.tipo == 'C' && (
          (p.nombre1+p.nombre2+p.apellido1+p.apellido2).toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          p.id.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 
        )       
      );
    }
  }

}
