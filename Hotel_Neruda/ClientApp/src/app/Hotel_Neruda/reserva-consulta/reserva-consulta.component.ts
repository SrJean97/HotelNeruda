import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamModalComponent } from 'src/app/@base/cam-modal/cam-modal.component';
import { EditModalComponent } from 'src/app/@base/edit-modal/edit-modal.component';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServicioAutenticacion } from 'src/app/services/servicio-autenticacion.service';
import { Persona } from '../models/persona';
import { Reserva } from '../models/reserva';

@Component({
  selector: 'app-reserva-consulta',
  templateUrl: './reserva-consulta.component.html',
  styleUrls: ['./reserva-consulta.component.css']
})
export class ReservaConsultaComponent implements OnInit {
  Reservas: Reserva[];
  searchText: string;
  currentUser: Persona;

  constructor(private router: Router, private servicioAutenticacion: ServicioAutenticacion,
    private ReservaService:ReservaService, private mS:NgbModal) {
    this.servicioAutenticacion.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit() {
    this.get();
  }

  get(){
    this.ReservaService.get().subscribe(result=>{
      this.Reservas=result;
    });
  }

  checkIn(o:Reserva){
    const MB = this.mS.open(CamModalComponent);
    MB.componentInstance.title = "Agregar acompañantes";
    MB.componentInstance.obj = o;    
    o.checkIn = true;
  }

  checkOut(o:Reserva){
    if(!o.checkIn){
      alert('Se debe hacer CheckIn primero');
      return;
    }
    o.checkOut = true;
    this.ReservaService.update(o).subscribe(
      data => {
        if(data!=null)
        alert('Se actualizó la reserva')
      }
    );
  }

  more(o:Reserva){
    const _MB = this.mS.open(EditModalComponent);
    _MB.componentInstance.title = "Consulta de acompañantes";
    _MB.componentInstance.obj = o; 
  }

  delete(o:Reserva){
    this.ReservaService.delete(o).subscribe(
      data => {
        this.get();
        //console.log(data);
        alert('Eliminado correctamente');
      }
    );
    //this.Reservas.splice(this.Reservas.findIndex(x=>x.id==o.id),1);
  }

  validRemove(o:Reserva):boolean{
    if(o.checkIn||o.checkOut)
      return false;
    var now = new Date().getTime();
    var ant = new Date(o.inicio).getTime();
    var val = (ant-now)/(1000*60*60*24);
    //console.log(val);
    if(val>=3)
      return true;
    return false;
  }
}
