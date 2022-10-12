using Entidad;

namespace Hotel_Neruda.Models
{
    public class HabitacionInputModel
    {
        public int id { get; set; }
        public string tipo { get; set; }
        public string numero { get; set; }
        public double precio { get; set; }

    
        public string caracteristica { get; set; }
        public int piso { get; set; }

    }
    public class HabitacionViewModel : HabitacionInputModel

    {

        public HabitacionViewModel()

        {

        }

        public HabitacionViewModel(Habitacion habitacion)
        {
            id = habitacion.Id;
            tipo = habitacion.Tipo;
            numero = habitacion.Numero;
            precio = habitacion.Precio;
            caracteristica = habitacion.Caracteristica;
            piso = habitacion.Piso;
        }

    }

    
}