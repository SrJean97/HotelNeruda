using System;
using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class Reserva
    {
        [Key]
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
}