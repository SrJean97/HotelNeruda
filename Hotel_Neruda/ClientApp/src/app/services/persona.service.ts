import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Persona } from '../Hotel_Neruda/models/Persona';

const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseUrl: string;
  
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl + 'api/PersonaControllers')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona[]>('Consulta Persona', null))
      );

  }

  /** GET Persona by identificacion. Will 404 if id not found */
  getId(id: string): Observable<Persona> {
    const url = `${this.baseUrl + 'api/PersonaControllers'}/${id}`;
    return this.http.get<Persona>(url, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<Persona>('Buscar Persona', null))
      );
  }

  post(Persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl + 'api/PersonaControllers', Persona)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona>('Registrar Persona', null))
      );

  }


}
