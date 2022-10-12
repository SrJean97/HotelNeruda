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
    public class HabitacionController: ControllerBase
    {
        private readonly HabitacionService _habitacionService;
        public IConfiguration Configuration { get; }
        public HabitacionController(NerudaContext _context)
        {
            _habitacionService = new HabitacionService(_context);
        }

        // GET: api/habitacion
        [HttpGet]
        public IEnumerable<HabitacionViewModel> Gets()
        {
            var  habitaciones  =  _habitacionService.ConsultarTodos().Select(p => new  HabitacionViewModel(p));
            return  habitaciones;
        }

        // GET: api/habitacion
        [HttpGet("{r}/{reporte}/{habitacion}")]
        public IEnumerable<HabitacionViewModel> Reporte(string r, string reporte, string habitacion)
        {
            var  habitaciones  =  _habitacionService.Reporte().Select(p => new  HabitacionViewModel(p));
            return  habitaciones;
        }

        // GET: api/habitacion
        [HttpGet("{inicio}/{final}")]
        public IEnumerable<HabitacionViewModel> GetDisponible(string inicio, string final)
        {
            var  habitaciones  =  _habitacionService.Disponibles(DateTime.Parse(inicio), DateTime.Parse(final)).Select(p => new  HabitacionViewModel(p));
            return  habitaciones;
        }

        [HttpGet("{IdHabitacion}")]
        public ActionResult<HabitacionViewModel> Get(int IdHabitacion)
        {
            var habitacion  =  _habitacionService.BuscarxCodigo(IdHabitacion);
            if (habitacion  ==  null) return NotFound();
            var habitacionViewModel  =  new HabitacionViewModel(habitacion);
            return habitacionViewModel;
        }

        // POST: api/habitacion
        [HttpPost]
        public ActionResult<HabitacionViewModel> Post(HabitacionInputModel habitacionInput)
        {
            Habitacion habitacion  =  MapearHabitacion(habitacionInput);
            var response  =  _habitacionService.Guardar(habitacion);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar habitacion", response.Mensaje);
                var problemDetails =  new ValidationProblemDetails(ModelState){
                    Status =  StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Habitacion);
        }
        private Habitacion MapearHabitacion(HabitacionInputModel habitacionInput)
        {
            return new Habitacion
            {
                Id = habitacionInput.id,
                Tipo = habitacionInput.tipo,
                Numero = habitacionInput.numero,
                Precio = habitacionInput.precio,
                Caracteristica = habitacionInput.caracteristica,
                Piso = habitacionInput.piso              
            };
        }
        
    }
}