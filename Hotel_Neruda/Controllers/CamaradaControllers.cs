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

namespace Hotel_Neruda.Controllers{


    [Route("api/[controller]")]
    [ApiController]
    public class CamaradaController: ControllerBase
    {
        private readonly CamaradaService _CamaradaService;
        public IConfiguration Configuration { get; }
        public CamaradaController(NerudaContext _context)
        {
            _CamaradaService = new CamaradaService(_context);
        }

        // GET: api/Camarada
        [HttpGet]
        public IEnumerable<CamaradaViewModel> Gets()
        {
            var  Camarada  =  _CamaradaService.ConsultarTodos().Select(p => new  CamaradaViewModel(p));
            return  Camarada;
        }

        // GET: api/Camarada
        [HttpGet("r/{reserva}")]
        public IEnumerable<CamaradaViewModel> GetByReserva(int reserva)
        {
            var  Camarada  =  _CamaradaService.BuscarxReserva(reserva).Select(p => new  CamaradaViewModel(p));
            return  Camarada;
        }

        [HttpGet("{IdCamarada}")]
        public ActionResult<CamaradaViewModel> Get(int IdCamarada)
        {
            var Camarada  =  _CamaradaService.BuscarxCodigo(IdCamarada);
            if (Camarada  ==  null) return NotFound();
            var CamaradaViewModel  =  new CamaradaViewModel(Camarada);
            return CamaradaViewModel;
        }

        // POST: api/Camarada
        [HttpPost]
        public ActionResult<CamaradaViewModel> Post(CamaradaInputModel CamaradaInput)
        {
            Camarada Camarada  =  MapearCamarada(CamaradaInput);
            var response  =  _CamaradaService.Guardar(Camarada);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Camarada", response.Mensaje);
                var problemDetails =  new ValidationProblemDetails(ModelState){
                    Status =  StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Camarada);
        }

        private Camarada MapearCamarada(CamaradaInputModel CamaradaInput)
        {
            return new Camarada
            {
                Id = CamaradaInput.Id,
                Reserva = CamaradaInput.Reserva,
                Tipo = CamaradaInput.Tipo,
                Cedula = CamaradaInput.Cedula,
                Nombre = CamaradaInput.Nombre,           
            };
        }
        
    }
}