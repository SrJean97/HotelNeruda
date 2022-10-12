import { Habitacion } from "./habitacion";
import { Persona } from "./persona";

export class Reserva {
    id = 0;
    inicio = new Date();
    final = new Date();
    cliente = "";
    _cliente = new Persona();
    habitacion = 0;
    _habitacion = new Habitacion();
    checkIn = false;
    checkOut = false;
    base = 0;
    total = 0;
}
