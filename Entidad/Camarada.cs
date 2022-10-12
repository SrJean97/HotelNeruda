using System;
using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class Camarada
    {
        [Key]
        public int Id { get; set; }
        public int Reserva { get; set; }
        public string Cedula { get; set; }
        public string Tipo { get; set; }
        public string Nombre { get; set; }
    }
}