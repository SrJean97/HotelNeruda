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
    public class PersonaControllers: ControllerBase
    {
        private readonly PersonaService _PersonaService;
        public IConfiguration Configuration { get; }
        public PersonaControllers(NerudaContext _context)
        {
            _PersonaService=new PersonaService(_context);
        }
        // GET: api/Persona
        [HttpGet]
        public IEnumerable<PersonaViewModel> Gets()
        {
            var  Personas = _PersonaService.ConsultarTodos().Select(p=> new  PersonaViewModel(p));
            return  Personas;
        }

        // GET: api/Persona/5
        [HttpGet("{identificacion}")]
        public ActionResult<PersonaViewModel> Get(string identificacion)
        {
            var Persona = _PersonaService.BuscarxIdentificacion(identificacion);
            if (Persona == null) return NotFound();
            var PersonaViewModel = new PersonaViewModel(Persona);
            return PersonaViewModel;
        }

        // POST: api/Persona
        [HttpPost]
        public ActionResult<PersonaViewModel> Post(PersonaInputModel PersonaInput)
        {
            Persona Persona = MapearPersona(PersonaInput);
            var response = _PersonaService.Guardar(Persona);
            if (response.Error) 
            {
                ModelState.AddModelError("Guardar Persona", response.Mensaje);
                var problemDetails= new ValidationProblemDetails(ModelState){
                    Status= StatusCodes.Status400BadRequest,
                };
                return BadRequest(problemDetails);
            }
            return Ok(response.Persona);
        }
        private Persona MapearPersona(PersonaInputModel PersonaInput)
        { 
            return new Persona
            {
                Id = PersonaInput.id,
                Nombre1 =  PersonaInput.nombre1,
                Nombre2 = PersonaInput.nombre2,
                Apellido1 = PersonaInput.apellido1,
                Apellido2 = PersonaInput.apellido2,
                Nacimiento = PersonaInput.nacimiento,
                Genero = PersonaInput.genero,
                Correo = PersonaInput.correo,
                Telefono = PersonaInput.telefono,
                Direccion = PersonaInput.direccion,
                Ciudad = PersonaInput.ciudad,
                Pass = PersonaInput.pass,
                Tipo = PersonaInput.tipo,
                Rol = PersonaInput.rol
            };
        }
        
    }
}