using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel_Neruda.Models
{
    public class FacturaInputModel
    {
        public int Id { get; set; }
        public int Reserva { get; set; }
        public DateTime Fecha { get; set; }

    }

    public class FacturaViewModel : FacturaInputModel
    {
        public ReservaViewModel _reserva { get; set; }

        public FacturaViewModel()
        {

        }
        public FacturaViewModel(Factura Factura, Reserva r, Persona c, Habitacion h)
        {
            Id = Factura.Id;
            Reserva = Factura.Reserva;
            Fecha = Factura.Fecha;
            _reserva = new ReservaViewModel(r,c,h);
        }
    }
}