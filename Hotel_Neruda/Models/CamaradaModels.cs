using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel_Neruda.Models
{
    public class CamaradaInputModel
    {
        public int Id { get; set; }        
        public int Reserva { get; set; }
        public string Cedula { get; set; }
        public string Tipo { get; set; }
        public string Nombre { get; set; }
    }

    public class CamaradaViewModel : CamaradaInputModel
    {
        public CamaradaViewModel()
        {

        }
        public CamaradaViewModel(Camarada c)
        {
            Id = c.Id;
            Reserva = c.Reserva;
            Cedula = c.Cedula;
            Tipo = c.Tipo;
            Nombre = c.Nombre;
        }
    }
}