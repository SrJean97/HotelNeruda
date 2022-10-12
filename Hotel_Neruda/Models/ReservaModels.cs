using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel_Neruda.Models
{
    public class ReservaInputModel
    {
        public int Id { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Final { get; set; }
        public string Cliente { get; set; }
        public int Habitacion { get; set; }
        public bool CheckIn { get; set; }
        public bool CheckOut { get; set; }
        public double Base { get; set; }
        public double Total { get; set; }
        public int Camarada { get; set; }
    }

    public class ReservaViewModel : ReservaInputModel
    {
        public Persona _cliente { get; set; }
        public Habitacion _habitacion { get; set; }

        public ReservaViewModel()
        {

        }
        public ReservaViewModel(Reserva reserva, Persona c, Habitacion h)
        {
            Id = reserva.Id;
            Inicio = reserva.Inicio;
            Final = reserva.Final;
            Cliente = reserva.Cliente;
            Habitacion = reserva.Habitacion;
            CheckIn = reserva.CheckIn;
            CheckOut = reserva.CheckOut;
            Base = reserva.Base;
            Total = reserva.Total;
            Camarada  = reserva.Camarada;
            _cliente = c;
            _habitacion = h;
        }
    }
}