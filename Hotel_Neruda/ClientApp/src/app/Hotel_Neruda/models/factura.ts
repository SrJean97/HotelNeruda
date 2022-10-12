import { Reserva } from "./reserva";

export class Factura {
    id = 0;
    fecha = new Date();
    reserva = 0;
    _reserva = new Reserva();
}
