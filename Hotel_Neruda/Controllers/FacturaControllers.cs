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
    public class FacturaControllers : ControllerBase
    {
        private readonly FacturaService _FacturaService;
        private readonly ReservaService rS;
        private readonly PersonaService pS;
        private readonly HabitacionService hS;     
        public IConfiguration Configuration { get; }
        public FacturaControllers(NerudaContext context)
        {
            _FacturaService = new FacturaService(context);
            rS = new ReservaService(context);
            pS = new PersonaService(context);
            hS = new HabitacionService(context);
        }
        // GET: api/Factura
        [HttpGet]
        public IEnumerable<FacturaViewModel> Gets()
        {
            var Facturas = new List<FacturaViewModel>();
            foreach (var item in _FacturaService.ConsultarTodos())
            {
                var rsr = rS.BuscarxIdentificacion(item.Reserva);
                Facturas.Add(new FacturaViewModel(item, rsr, pS.BuscarxIdentificacion(rsr.Cliente), hS.BuscarxCodigo(rsr.Habitacion)));
            }
            //var Facturas = _FacturaService.ConsultarTodos().Select(p=> new FacturaViewModel(p, rS.BuscarxIdentificacion(p.Reserva)));
            return Facturas;
        }

        // GET: api/Factura/5       
        [HttpGet("{identificacion}")]
        public ActionResult<FacturaViewModel> Get(int identificacion)
        {
            var Factura = _FacturaService.BuscarxIdentificacion(identificacion);
            if (Factura == null) return NotFound();
            var rsr = rS.BuscarxIdentificacion(Factura.Reserva);
            var FacturaViewModel = new FacturaViewModel(Factura, rsr, pS.BuscarxIdentificacion(rsr.Cliente), hS.BuscarxCodigo(rsr.Habitacion));
            return FacturaViewModel;
        }

        // POST: api/Factura
        [HttpPost]
        public ActionResult<FacturaViewModel> Post(FacturaInputModel FacturaInput)
        {
            Factura Factura = MapearFactura(FacturaInput);
            var response = _FacturaService.Guardar(Factura);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Factura", response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Factura);
        }
        
        // DELETE: api/Factura/5
        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(int identificacion)
        {
            string mensaje = _FacturaService.Eliminar(identificacion);
            return Ok(mensaje);
        }

        private Factura MapearFactura(FacturaInputModel FacturaInput)
        {
            var Factura = new Factura
            {
                Id = FacturaInput.Id,
                Reserva = FacturaInput.Reserva,
                Fecha = FacturaInput.Fecha
            };
            return Factura;
        }
        
        // PUT: api/Factura/5
        [HttpPut("{identificacion}")]
        public ActionResult<FacturaViewModel> Put(string identificacion, FacturaInputModel FacturaInput)
        {
            Factura Factura = MapearFactura(FacturaInput);
            var id=_FacturaService.BuscarxIdentificacion(Factura.Id);
            if(id==null){
                return BadRequest("No encontrado");
            }else
            {
                var response = _FacturaService.Modificar(Factura);
                if (response.Error) 
                {
                    ModelState.AddModelError("Modificar Factura", response.Mensaje);
                    var problemDetails = new ValidationProblemDetails(ModelState)
                    {
                        Status = StatusCodes.Status400BadRequest,
                    };
                    return BadRequest(problemDetails);
                }
                return Ok(response.Factura);                
            }
        }
    }
}