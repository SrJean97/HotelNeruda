using System.ComponentModel.DataAnnotations;
using Entidad;

namespace Hotel_Neruda.Models
{
    public class LoginInputModel
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Pass { get; set; }
        public LoginInputModel() { }
    }

    public class LoginViewModel: LoginInputModel
    {
        public string Token { get; set; }
        public string Nombre1 { get; set; }
        public string Apellido1 { get; set; }
        public string Tipo { get; set; }
        public string Rol { get; set; }
        public LoginViewModel() { }
    }
}