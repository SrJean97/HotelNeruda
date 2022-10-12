using Datos;
using Entidad;
//using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore; 
using System.Collections.Generic; 
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace Logica
{
    public class HabitacionService
    {
        private readonly NerudaContext _context;

        public HabitacionService(NerudaContext context)
        {
            _context = context;
        }

        public GuardarHabitacionResponse Guardar(Habitacion habitacion){
            try
            {
                var habitacionBuscar = _context.Habitaciones.Find(habitacion.Id);
                if(habitacionBuscar != null){
                    return new GuardarHabitacionResponse($"Error la habitacion {habitacion.Id} ya se encuentra registrado");
                }
                _context.Habitaciones.Add(habitacion);
                _context.SaveChanges();
                return new GuardarHabitacionResponse(habitacion);
            }
            catch (Exception e)
            {
                
                return new GuardarHabitacionResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Habitacion> ConsultarTodos(){
            List<Habitacion> habitaciones=_context.Habitaciones.ToList();
            return habitaciones;
        }
        
        public List<Habitacion> Disponibles(DateTime inicio, DateTime final){
            var Inicio = new SqlParameter("@inicio", inicio);
            var Final = new SqlParameter("@final", final);
            //List<Habitacion> habitaciones =_context.Habitaciones.FromSqlRaw("SELECT Hab.Id, MAX(Hab.Tipo) AS Tipo, MAX(Hab.Numero) AS Numero, MAX(Hab.Precio) AS Precio, MAX(Caracteristica) AS Caracteristica, MAX(Piso) AS Piso FROM neruda3.dbo.Habitaciones Hab JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion WHERE Inicio NOT BETWEEN @inicio AND @final AND Final NOT BETWEEN @inicio AND @final GROUP BY Hab.Id;",Inicio,Final).ToList();
            List<Habitacion> ocupadas = _context.Habitaciones.FromSqlRaw("SELECT Hab.Id, MAX(Hab.Tipo) AS Tipo, MAX(Hab.Numero) AS Numero, MAX(Hab.Precio) AS Precio, MAX(Caracteristica) AS Caracteristica, MAX(Piso) AS Piso FROM neruda3.dbo.Habitaciones Hab JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion WHERE CheckOut = 0 AND (Inicio BETWEEN @inicio AND @final OR Final BETWEEN @inicio AND @final) GROUP BY Hab.Id;",Inicio,Final).ToList();
            List<Habitacion> habitaciones = _context.Habitaciones.ToList();

            foreach (var item in ocupadas)
            {
                habitaciones.Remove(item);
            }

            //habitaciones.AddRange(_context.Habitaciones.FromSqlRaw("SELECT Hab.Id, Hab.Tipo, Hab.Numero, Hab.Precio, Caracteristica, Piso FROM neruda3.dbo.Habitaciones Hab LEFT JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion WHERE Res.Habitacion IS NULL;").ToList());
            return habitaciones;
        }

        //SELECT Hab.Id, MAX(Hab.Tipo) AS Tipo, MAX(Hab.Numero) AS Numero, MAX(Hab.Precio) AS Precio, MAX(Caracteristica) AS Caracteristica, COUNT(Hab.Id) AS Piso FROM neruda3.dbo.Habitaciones Hab JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion GROUP BY Hab.Id;
        public List<Habitacion> Reporte(){
            //List<Habitacion> habitaciones =_context.Habitaciones.FromSqlRaw("SELECT Hab.Id, MAX(Hab.Tipo) AS Tipo, MAX(Hab.Numero) AS Numero, MAX(Hab.Precio) AS Precio, MAX(Caracteristica) AS Caracteristica, MAX(Piso) AS Piso FROM neruda3.dbo.Habitaciones Hab JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion WHERE Inicio NOT BETWEEN @inicio AND @final AND Final NOT BETWEEN @inicio AND @final GROUP BY Hab.Id;",Inicio,Final).ToList();
            List<Habitacion> habitaciones = _context.Habitaciones.FromSqlRaw("SELECT Hab.Id, MAX(Hab.Tipo) AS Tipo, MAX(Hab.Numero) AS Numero, MAX(Hab.Precio) AS Precio, MAX(Caracteristica) AS Caracteristica, COUNT(Hab.Id) AS Piso FROM neruda3.dbo.Habitaciones Hab JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion GROUP BY Hab.Id ORDER BY COUNT(Hab.Id) DESC;").ToList();
            
            //habitaciones.AddRange(_context.Habitaciones.FromSqlRaw("SELECT Hab.Id, Hab.Tipo, Hab.Numero, Hab.Precio, Caracteristica, Piso FROM neruda3.dbo.Habitaciones Hab LEFT JOIN neruda3.dbo.Reservas Res ON Hab.Id = Res.Habitacion WHERE Res.Habitacion IS NULL;").ToList());
            return habitaciones;
        }

        public Habitacion BuscarxCodigo(int codigo){
            Habitacion habitacion= _context.Habitaciones.Find(codigo);
            return habitacion;
        }

        public string Eliminar(int id){
            try
            {
                var habitacion= _context.Habitaciones.Find(id);
                if(habitacion != null){
                    _context.Habitaciones.Remove(habitacion);
                    _context.SaveChanges();
                    return ($"La habitacion {habitacion.Id} se ha eliminado exitosamente");
                }else{
                    return ($"Error, la habitacion : {habitacion.Id} no existe");
                }
            }
            catch (Exception e)
            {
                
                return ($"Error de la Aplicacion: {e.Message}");
            }
        }

    }
    public class GuardarHabitacionResponse
    {
        public GuardarHabitacionResponse(Habitacion habitacion)
        {
            Error = false;
            this.Habitacion = habitacion;
        }

        public GuardarHabitacionResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }

        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Habitacion Habitacion { get; set; }

    }
}
