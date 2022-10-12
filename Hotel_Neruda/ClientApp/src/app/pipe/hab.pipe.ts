import { Pipe, PipeTransform } from '@angular/core';
import { Habitacion } from '../Hotel_Neruda/models/habitacion';

@Pipe({
  name: 'hab'
})
export class HabPipe implements PipeTransform {

  transform(habitacion: Habitacion[], searchText: string): any {
    if (searchText == null) return habitacion;
        return habitacion.filter(p =>
        p.numero.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 ||
        p.tipo.toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 ||
        p.precio.toString().toLowerCase()
        .indexOf(searchText.toLowerCase()) !== -1 );
    }
    
}
