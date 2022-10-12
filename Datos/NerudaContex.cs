using Microsoft.EntityFrameworkCore;
using Entidad;

namespace Datos
{
    public class NerudaContext : DbContext
    {
        public NerudaContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Habitacion> Habitaciones { get; set; }
        public DbSet<Persona> Personas { get; set;}
        public DbSet<Camarada> Camaradas { get; set;}
        public DbSet<Factura> Facturas { get; set;}

    }
}
