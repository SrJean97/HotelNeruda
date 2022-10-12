import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '../Hotel_Neruda/models/Factura';
import { Persona } from '../Hotel_Neruda/models/persona';
import { FacturaService } from '../services/factura.service';
import { ServicioAutenticacion } from '../services/servicio-autenticacion.service';

@Pipe({
  name: 'fct'
})
export class FctPipe implements PipeTransform {
  rta:Factura[]=[];
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private fS:FacturaService) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);
  }

  transform(Factura: Factura[], sText: string): any {

    if (sText == null) {
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
            p._reserva.cliente.toLowerCase().indexOf(sText.toLowerCase()) !== -1       
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
        p => p._reserva.cliente.toLowerCase().indexOf(sText.toLowerCase()) !== -1     
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
