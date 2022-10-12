import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioAutenticacion } from './servicio-autenticacion.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private servicioAutenticacion: ServicioAutenticacion) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.servicioAutenticacion.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + currentUser.token
                }
            });
        }
        return next.handle(request);
  }
}
