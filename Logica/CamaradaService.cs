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
    public class CamaradaService
    {
        private readonly NerudaContext _context;

        public CamaradaService(NerudaContext context)
        {
            _context = context;
        }

        public GuardarCamaradaResponse Guardar(Camarada Camarada){
            try
            {
                var CamaradaBuscar = _context.Camaradas.Find(Camarada.Id);
                if(CamaradaBuscar != null){
                    return new GuardarCamaradaResponse($"Error el acompañante {Camarada.Id} ya se encuentra registrado");
                }
                _context.Camaradas.Add(Camarada);
                _context.SaveChanges();
                return new GuardarCamaradaResponse(Camarada);
            }
            catch (Exception e)
            {                
                return new GuardarCamaradaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Camarada> ConsultarTodos(){
            List<Camarada> Camaradas=_context.Camaradas.ToList();
            return Camaradas;
        }
        
        public List<Camarada> BuscarxReserva(int id){
            var Param = new SqlParameter("@param", id);
            List<Camarada> Camaradas =_context.Camaradas.FromSqlRaw("SELECT * FROM neruda3.dbo.Camaradas WHERE Reserva = @param;",Param).ToList();
            return Camaradas;
        }

        public Camarada BuscarxCodigo(int codigo){
            Camarada Camarada= _context.Camaradas.Find(codigo);
            return Camarada;
        }

        public string Eliminar(string id){
            try
            {
                var Camarada= _context.Camaradas.Find(id);
                if(Camarada != null){
                    _context.Camaradas.Remove(Camarada);
                    _context.SaveChanges();
                    return ($"La Camarada {Camarada.Id} se ha eliminado exitosamente");
                }else{
                    return ($"Error, la Camarada : {Camarada.Id} no existe");
                }
            }
            catch (Exception e)
            {
                
                return ($"Error de la Aplicacion: {e.Message}");
            }
        }

    }
    public class GuardarCamaradaResponse
    {
        public GuardarCamaradaResponse(Camarada Camarada)
        {
            Error = false;
            this.Camarada = Camarada;
        }

        public GuardarCamaradaResponse(string mensaje)

        {

            Error = true;

            Mensaje = mensaje;

        }

        public bool Error { get; set; }

        public string Mensaje { get; set; }

        public Camarada Camarada { get; set; }

    }
}
