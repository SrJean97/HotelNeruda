using System;
using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class Factura
    {
        [Key]
        public int Id { get; set; }
        public int Reserva { get; set; }
        public DateTime Fecha { get; set; }
        
    }
}