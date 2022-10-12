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
using Microsoft.AspNetCore.Authorization;
using Hotel_Neruda.Service;
using Microsoft.Extensions.Options;
using Hotel_Neruda.Config;

namespace Proyectoweb.Controllers
{
    [Authorize]
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly PersonaService _PersonaService;
        JwtService _jwtService;
        public LoginController(NerudaContext _context, IOptions<AppSetting> appSettings)
        {
            _PersonaService=new PersonaService(_context);
            _jwtService = new JwtService(appSettings);
        }
        
        

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(LoginInputModel model)
        {
            var usuario = _PersonaService.Validate(model.Id, model.Pass);
            if (usuario == null) return BadRequest("Nombre de usuario o contraseña incorrecto(a)");
            var response = _jwtService.GenerateToken(usuario);
            return Ok(response);
        }

    }
}