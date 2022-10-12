import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '../Hotel_Neruda/models/Factura';
import { Persona } from '../Hotel_Neruda/models/persona';
import { FacturaService } from '../services/factura.service';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';

@Pipe({
  name: 'fcti'
})
export class FctiPipe implements PipeTransform {
  rta:Factura[]=[];
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private fS:FacturaService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  transform(Factura: Factura[], searchText: string): any {

    if (searchText == null) {
      if(this.currentUser.tipo=="C"){

        this.rta = Factura.filter(
          p => p._reserva.cliente == this.currentUser.id     
        );
        this.reset();
        this.rta.forEach(x => {
          this.fS.subtotal += x._reserva.base;
          this.fS.total += x._reserva.total;
        });
        return this.rta;
      }

      if(this.currentUser.tipo=="E"){      
        this.rta = Factura;        
        this.reset();
        this.rta.forEach(x => {
          this.fS.subtotal += x._reserva.base;
          this.fS.total += x._reserva.total;
        });
        return this.rta;
      }
    }
    
    if(this.currentUser.tipo=="C"){      
      this.rta = Factura.filter(
        p => p._reserva.cliente == this.currentUser.id &&
            p.id.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1       
      );      
      this.reset();
      this.rta.forEach(x => {
        this.fS.subtotal += x._reserva.base;
        this.fS.total += x._reserva.total;
      });
      return this.rta;
    }
    
    if(this.currentUser.tipo=="E"){      
      this.rta = Factura.filter(
        p => p._reserva.id.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1     
      );
      this.reset();
      this.rta.forEach(x => {
        this.fS.subtotal += x._reserva.base;
        this.fS.total += x._reserva.total;
      });
      return this.rta;
    }
  }

  private reset(){
    this.fS.subtotal = 0;
    this.fS.total = 0;
  }

}
