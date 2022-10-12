import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Camarada } from 'src/app/Hotel_Neruda/models/camarada';
import { Factura } from 'src/app/Hotel_Neruda/models/Factura';
import { Habitacion } from 'src/app/Hotel_Neruda/models/habitacion';
import { Reserva } from 'src/app/Hotel_Neruda/models/reserva';
import { CamaradaService } from 'src/app/services/camarada.service';
import { FacturaService } from 'src/app/services/factura.service';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-cam-modal',
  templateUrl: './cam-modal.component.html',
  styleUrls: ['./cam-modal.component.css']
})
export class CamModalComponent implements OnInit {
  cam; ced = ""; tipo="A"; nombre = "";
  cams:Camarada[] = [];
  hab:Habitacion = new Habitacion();
  _add = false;
  constructor
  (
    private ReservaService:ReservaService, 
    public activeModal: NgbActiveModal, 
    private cS:CamaradaService, 
    private hS:HabitacionService,
    private router:Router,
    private fS:FacturaService
  ) { }
  
  @Input() title;
  @Input() obj:Reserva;

  ngOnInit(): void {
    this.hS.getId(this.obj.habitacion).subscribe(
      data => {
        this.hab = data;
        this.valid();
      }
    );
  }

  valid(){
    console.log(this.max());
    if(this.max()>1){
      this._add = false;
      return false;
    }
    this._add = true;
    return true;
  }

  add(){
    if(this.cams.length>=3 || this.cams.length >= (this.max()-1)){      
      alert('No es posible agregar más acompañantes');
      if(this.cams.length<3){
        this._add = true;
      }
      return;
    }
    if(this.ced=="" || this.nombre ==""){
      alert('Rellene correctamente los campos');
      return;
    }
    this.cam = new Camarada();
    this.cam.cedula = this.ced;
    this.cam.tipo = this.tipo;
    this.cam.nombre = this.nombre;
    this.cam.reserva = this.obj.id;
    
    if(this.cams.findIndex(x=>x.cedula==this.cam.cedula)==-1)
      this.cams.push(this.cam);
    else
      alert('Ya agregó este acompañante');

    this.valid();
  }

  upgrade(){
    this.ReservaService.mod = this.obj;
    this.activeModal.close('Close click');
    this.router.navigate(['reservaModificar']);
  }

  remove(o:Camarada){
    this.cams.splice(this.cams.findIndex(x=>x.cedula==o.cedula),1);
    this.valid();
    this._add = false;
  }

  save(){
    this.cams.forEach(x=>{
      this.cS.post(x).subscribe(
        data => {
          if(data != null)
            console.log('Guardado acompañante '+x.cedula);
          else
            console.log('Error al guardar acompañante '+x.cedula);
        }
      );
    });
    this.obj.checkIn = true;
    this.ReservaService.update(this.obj).subscribe(
      data => {
        /*if(data!=null)
        alert('Se actualizó la reserva')*/
      }
    );
    let f = new Factura();
    f.fecha = new Date();
    f.reserva = this.obj.id;
    this.fS.post(f).subscribe(
      data => {
        if(data!=null){
          alert('Se ha facturado la reserva');
        }
        else
          alert('Error al facturar la reserva');
      }
    );
    this.activeModal.close('Close click');
  }

  max():number{
    if(this.hab.tipo=="Simple")
      return 1;
    if(this.hab.tipo=="Doble")
      return 2;
    if(this.hab.tipo=="Triple")
      return 3;
    if(this.hab.tipo=="Familiar")
      return 4;
  }

}
