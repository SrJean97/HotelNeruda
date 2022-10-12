import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../Hotel_Neruda/models/persona';
import { Reserva } from '../Hotel_Neruda/models/reserva';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';

@Pipe({
  name: 'reser'
})
export class ReserPipe implements PipeTransform {
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  transform(Reserva: Reserva[], searchText: string): any {

    if (searchText == null) {
      if(this.currentUser.tipo=="C"){      
        return Reserva.filter(
          p => p.cliente == this.currentUser.id     
        );
      }

      if(this.currentUser.tipo=="E"){      
        return Reserva;
      }
    }
    
    if(this.currentUser.tipo=="C"){      
      return Reserva.filter(
        p => p.cliente == this.currentUser.id &&
            p.habitacion.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1       
      );
    }
    
    if(this.currentUser.tipo=="E"){      
      return Reserva.filter(
        p => p.cliente.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            (p._cliente.nombre1+p._cliente.nombre2+p._cliente.apellido1+p._cliente.apellido2).toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
            p.habitacion.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1       
      );
    }
  }

}
