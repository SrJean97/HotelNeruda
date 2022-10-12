using System;
using System.ComponentModel.DataAnnotations;

namespace Entidad
{
    public class Habitacion
    {
        [Key]
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Numero { get; set; }
        public double Precio { get; set; }
        public string Caracteristica { get; set; }
        public int Piso { get; set; }
    }
}