using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entidad;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Hotel_Neruda.Models;
using Datos;

namespace Hotel_Neruda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaControllers : ControllerBase
    {
        private readonly ReservaService _reservaService;
        private readonly PersonaService pS;
        private readonly HabitacionService hS;  
        public IConfiguration Configuration { get; }

        public ReservaControllers(NerudaContext context)
        {
            _reservaService = new ReservaService(context);
            pS = new PersonaService(context);
            hS = new HabitacionService(context);
        }

        // GET: api/Reserva
        [HttpGet]
        public IEnumerable<ReservaViewModel> Gets()
        {
            var reservas = _reservaService.ConsultarTodos().Select(p=> new ReservaViewModel(p, pS.BuscarxIdentificacion(p.Cliente), hS.BuscarxCodigo(p.Habitacion)));
            return reservas;
        }

        // GET: api/Reserva/5       
        [HttpGet("{identificacion}")]
        public ActionResult<ReservaViewModel> Get(int identificacion)
        {
            var reserva = _reservaService.BuscarxIdentificacion(identificacion);
            if (reserva == null) return NotFound();
            var reservaViewModel = new ReservaViewModel(reserva, pS.BuscarxIdentificacion(reserva.Cliente), hS.BuscarxCodigo(reserva.Habitacion));
            return reservaViewModel;
        }

        // POST: api/Reserva
        [HttpPost]
        public ActionResult<ReservaViewModel> Post(ReservaInputModel reservaInput)
        {
            Reserva reserva = MapearReserva(reservaInput);
            var response = _reservaService.Guardar(reserva);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar reserva", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Reserva);
        }
        
        // DELETE: api/Reserva/5
        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(int identificacion)
        {
            string mensaje = _reservaService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Reserva MapearReserva(ReservaInputModel reservaInput)
        {
            var reserva = new Reserva
            {
                Id = reservaInput.Id,
                Inicio = reservaInput.Inicio,
                Final = reservaInput.Final,
                Cliente = reservaInput.Cliente,
                Habitacion = reservaInput.Habitacion,
                CheckIn = reservaInput.CheckIn,
                CheckOut = reservaInput.CheckOut,
                Base = reservaInput.Base,
                Total = reservaInput.Total
            };
            return reserva;
        }
        
        // PUT: api/Reserva/5
        [HttpPut("{identificacion}")]
        public ActionResult<ReservaViewModel> Put(string identificacion, ReservaInputModel reservaInput)
        {
            Reserva reserva = MapearReserva(reservaInput);
            var id=_reservaService.BuscarxIdentificacion(reserva.Id);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _reservaService.Modificar(reserva);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar Reserva", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Reserva);                
            }
        }
    }
}