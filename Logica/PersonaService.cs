using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class PersonaService
    {
        private readonly NerudaContext _context;
        public PersonaService(NerudaContext context)
        {
            _context = context;
        }
        
        public Persona Validate(string nombreUsuario, string contrasena) 
        {
            return _context.Personas.FirstOrDefault(t => t.Id == nombreUsuario && t.Pass == contrasena);
        }
        public GuardarPersonaResponse Guardar(Persona Persona){
            try
            {
                var PersonaBuscar = _context.Personas.Find(Persona.Id);
                if(PersonaBuscar != null){
                    return new GuardarPersonaResponse($"Error el Persona {Persona.Id} ya se encuentra registrado");
                }
                _context.Personas.Add(Persona);
                _context.SaveChanges();
                return new GuardarPersonaResponse(Persona);
            }
            catch (Exception e)
            {
                
                return new GuardarPersonaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }
        public List<Persona> ConsultarTodos(){
            List<Persona> Personas=_context.Personas.ToList();
            return Personas;
        }
        
        public GuardarPersonaResponse Log(Persona Persona){
            try
            {
                var PersonaBuscar = _context.Personas.Find(Persona.Id);

                if(PersonaBuscar != null){
                    if(PersonaBuscar.Pass == Persona.Pass){ 
                        PersonaBuscar.Pass = "";
                        return new GuardarPersonaResponse(PersonaBuscar);
                    }            
                    return new GuardarPersonaResponse($"Error contraseña o usuario incorrecta");
                }

                return new GuardarPersonaResponse($"Error contraseña o usuario incorrecta");
            }
            catch (Exception e)
            {                
                return new GuardarPersonaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }
        public string Eliminar(string id){
            try
            {
                var Persona= _context.Personas.Find(id);
                if(Persona != null){
                    _context.Personas.Remove(Persona);
                    _context.SaveChanges();
                    return ($"El Persona {Persona.Id} se ha eliminado exitosamente");
                }else{
                    return ($"Error, el Persona con identificacion {Persona.Id} no existe");
                }
            }
            catch (Exception e)
            {
                
                return ($"Error de la Aplicacion: {e.Message}");
            }
        }
        public Persona BuscarxIdentificacion(string id){
            Persona Persona= _context.Personas.Find(id);
            return Persona;
        }
    }
    public class GuardarPersonaResponse
    {
        public GuardarPersonaResponse(Persona Persona)
        {
            Error = false;
            this.Persona = Persona;
        }

        public GuardarPersonaResponse(string mensaje)

        {

            Error = true;

            Mensaje = mensaje;

        }

        public bool Error { get; set; }

        public string Mensaje { get; set; }

        public Persona Persona { get; set; }

    }
}
