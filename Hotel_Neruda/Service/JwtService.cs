using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entidad;
using Hotel_Neruda.Config;
using Hotel_Neruda.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Hotel_Neruda.Service
{
    public class JwtService
    {
        private readonly AppSetting _appSettings;
        public JwtService(IOptions<AppSetting> appSettings)=> _appSettings = appSettings.Value;
        public LoginViewModel GenerateToken(Persona personaLogIn)
        {
            // return null if user not found
            if (personaLogIn == null) return null;
            var personaResponse = new LoginViewModel() { 
                Nombre1 = personaLogIn.Nombre1,
                Apellido1 = personaLogIn.Apellido1,
                Id = personaLogIn.Id,
                Tipo = personaLogIn.Tipo,
                Rol = personaLogIn.Rol
            };
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(
                        ClaimTypes.Name, personaLogIn.Id.ToString(),
                        ClaimTypes.Role, personaLogIn.Rol.ToString()
                    )
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            personaResponse.Token = tokenHandler.WriteToken(token);
            return personaResponse;
        }
    }
}