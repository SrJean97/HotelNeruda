import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Camarada } from 'src/app/Hotel_Neruda/models/camarada';
import { Reserva } from 'src/app/Hotel_Neruda/models/reserva';
import { CamaradaService } from 'src/app/services/camarada.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  cams:Camarada[] = [];

  constructor(public activeModal: NgbActiveModal, private cS:CamaradaService) { }
  @Input() title;
  @Input() obj:Reserva;

  ngOnInit(): void {
    this.cS.getByReserva(this.obj.id).subscribe(
      data => {
        if(data != null)
          this.cams = data;
        else
          alert('No existen acompañantes para esta reserva');
      }
    );
  }

}
