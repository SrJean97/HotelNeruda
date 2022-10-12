using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class FacturaService
    {
        private readonly NerudaContext _context;
        public FacturaService(NerudaContext context)
        {
            _context=context;
        }
        public GuardarFacturaResponse Guardar(Factura Factura)
        {
            try
            {
                var FacturaBuscada = _context.Facturas.Find(Factura.Id);
                if (FacturaBuscada != null)
                {
                    return new GuardarFacturaResponse("Error esta Factura ya se encuentra registrado");
                }
                _context.Facturas.Add(Factura);
                _context.SaveChanges();
                return new GuardarFacturaResponse(Factura);
            }
            catch (Exception e)
            {
                return new GuardarFacturaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }

        public List<Factura> ConsultarTodos()
        {
            List<Factura> Facturas = _context.Facturas.ToList();
            return Facturas;
        }

        public string Eliminar(int identificacion)
        {
            try
            {
                var Factura = _context.Facturas.Find(identificacion);
                if (Factura != null)
                {
                    _context.Facturas.Remove(Factura);
                    _context.SaveChanges();
                    return ($"El registro {Factura.Id} se ha eliminado satisfactoriamente.");
                }
                else
                {
                    return ($"Lo sentimos, la Factura no. {identificacion} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return $"Error de la Aplicación: {e.Message}";
            }
        }

        public ModificarFacturaResponse Modificar(Factura FacturaNueva)
        {            
            try
            {
                var FacturaVieja = _context.Facturas.Find(FacturaNueva.Id);
                if (FacturaVieja != null)
                {
                    FacturaVieja.Id = FacturaNueva.Id;
                    FacturaVieja.Fecha = FacturaNueva.Fecha;
                    FacturaVieja.Reserva = FacturaNueva.Reserva;

                    _context.Facturas.Update(FacturaVieja);
                    _context.SaveChanges();
                    return new ModificarFacturaResponse(FacturaVieja);
                }
                else
                {
                    return new ModificarFacturaResponse($"Lo sentimos, {FacturaNueva.Id} no se encuentra registrada.");
                }
            }
            catch (Exception e)
            {
                return new ModificarFacturaResponse($"Error de la Aplicación: {e.Message}");
            }
        }

        public Factura BuscarxIdentificacion(int identificacion)
        {
            Factura Factura = _context.Facturas.Find(identificacion);
            return Factura;
        }

        public class GuardarFacturaResponse
        {
            public GuardarFacturaResponse(Factura Factura)
            {
                Error = false;
                this.Factura = Factura;
            }
            public GuardarFacturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Factura Factura { get; set; }
        }

        public class ModificarFacturaResponse
        {
            public ModificarFacturaResponse(Factura Factura)
            {
                Error = false;
                this.Factura = Factura;
            }
            public ModificarFacturaResponse(string mensaje)
            {
                Error = true;
                Mensaje = mensaje;
            }
            public bool Error { get; set; }
            public string Mensaje { get; set; }
            public Factura Factura { get; set; }
        }
    }
}