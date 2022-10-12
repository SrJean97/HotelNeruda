import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Camarada } from '../Hotel_Neruda/models/Camarada';

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
export class CamaradaService {

  baseUrl: string;

  constructor(

    private http: HttpClient,

    @Inject('BASE_URL') baseUrl: string,

    private handleErrorService: HandleHttpErrorService) {

    this.baseUrl = baseUrl;

  }

  get(): Observable<Camarada[]> {

    return this.http.get<Camarada[]>(this.baseUrl + 'api/CamaradaControllers')

      .pipe(

        tap(_ => this.handleErrorService.log('datos enviados')),

        catchError(this.handleErrorService.handleError<Camarada[]>('Consulta Camarada', null))

      );

  }

  getByReserva(reserva:number): Observable<Camarada[]> {
    return this.http.get<Camarada[]>(this.baseUrl + 'api/CamaradaControllers/r/'+reserva)
    .pipe(
        catchError(this.handleErrorService.handleError<Camarada[]>('Consulta Camarada', null))
    );
  }

  /** GET Camarada by identificacion. Will 404 if id not found */
  getId(id: string): Observable<Camarada> {
    const url = `${this.baseUrl + 'api/Camarada'}/${id}`;
      return this.http.get<Camarada>(url, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<Camarada>('Buscar Camarada', null))
      );
  }

  post(Camarada: Camarada): Observable<Camarada> {

    return this.http.post<Camarada>(this.baseUrl + 'api/CamaradaControllers', Camarada)

      .pipe(

        tap(_ => this.handleErrorService.log('datos enviados')),

        catchError(this.handleErrorService.handleError<Camarada>('Registrar Camarada', null))

      );

  }
}

