using System.Security.AccessControl;
using Entidad;
using System;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Neruda.Models
{
    public class PersonaInputModel
    {
        [Required(ErrorMessage = "Se requiere Id")]
        public string id { get; set; }

        [Required(ErrorMessage = "Se requiere el nombre")]
        public string nombre1 { get; set; }
        public string nombre2 { get; set; }
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public DateTime nacimiento { get; set; }
        public string genero { get; set; }
        public string telefono { get; set; }
        public string correo { get; set; }
        public string direccion { get; set; }
        public string ciudad { get; set; }
        public string tipo { get; set; }
        public string pass { get; set; }
        public string rol { get; set; }

    }
    public class PersonaViewModel : PersonaInputModel
    {

        public PersonaViewModel()
        {

        }

        public PersonaViewModel(Persona Persona)
        {
            id = Persona.Id;
            nombre1 = Persona.Nombre1;
            nombre2 = Persona.Nombre2;
            apellido1 = Persona.Apellido1;
            apellido2 = Persona.Apellido2;
            nacimiento = Persona.Nacimiento;
            genero = Persona.Genero;
            telefono = Persona.Telefono;
            correo = Persona.Correo;
            direccion = Persona.Direccion;
            ciudad = Persona.Ciudad;
            tipo = Persona.Tipo;
            pass = "";
            rol = Persona.Rol;
        }

    }
}